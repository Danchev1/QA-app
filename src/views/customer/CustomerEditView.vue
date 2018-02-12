<template>
  <div class="customer-edit" v-if="formDescriptors && formDatas">
    <div class="columns">
      <div class="column is-12">
        <title-component
          class="is-uppercase"
          v-bind:size="1">
          Customer edit
        </title-component>
        <!-- Description -->
      </div>
    </div>
    <form-component
      v-for="formDescriptor in formDescriptors"
      v-bind:formDescriptor="formDescriptor"
      v-bind:formData="getFormDataForDescriptor(formDescriptor)"
      v-bind:key="formDescriptor.id">
    </form-component>
    <transition
      name="fade"
      appear
      appear-active-class="animated fadeIn"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      :duration="{ enter: 200, leave: 200 }">
      <div v-if="error" class="notification is-danger">
        {{ error }}
      </div>
    </transition>
    <div class="field is-grouped">
      <p class="control">
        <submit-btn-component class="is-uppercase is-large" @submit="submitForm">Update profile</submit-btn-component>
      </p>
      <p class="control">
        <button class="button is-danger is-outlined is-large"
                v-on:click="redirectTo({ name: 'CustomerDetailView' })">
          Cancel
        </button>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import FormComponent from '@/components/form/FormComponent'
  import TitleComponent from '@/components/layout/TitleComponent'
  import router from '@/router/customer'
  import { InvalidDataError } from '@/classes/errors'
  import { onKeyEnterMixin } from '@/mixins/mixins'
  import SubmitBtnComponent from '@/components/layout/utility/SubmitBtnComponent'

  let VueScrollTo = require('vue-scrollto')
  export default {
    mixins: [onKeyEnterMixin],
    directives: {
      VueScrollTo
    },
    name: 'customer-edit-view',
    data () {
      return {
        error: ''
      }
    },
    components: {
      SubmitBtnComponent,
      FormComponent,
      TitleComponent
    },
    computed: {
      ...mapState({
        formDescriptors: state => state.customerEditModule.CustomerEditFormDescriptors,
        formDatas: state => state.customerEditModule.CustomerEditFormDatas,
        authUser: state => state.authModule.authUser
      })
    },
    methods: {
      ...mapActions([
        'setupCustomerEditForm',
        'updateCustomerInformation',
        'clearData',
        'getCustomerProfile',
        'errorMessage',
        'successMessage'
      ]),
      redirectTo (destination) {
        router.push(destination)
      },
      getFormDataForDescriptor (formDescriptor) {
        return this.formDatas.find(formData => formDescriptor.id === formData.formDescriptorId)
      },
      submitForm (btn) {
        let formDatasToPost = this.formDatas.filter(formData => !formData.id)
        if (formDatasToPost.length > 0) {
          this.saveCustomerInformation(formDatasToPost, btn)
        }
      },
      saveCustomerInformation (formDatas, btn) {
        let postData = {
          formDatas: formDatas,
          profileId: this.authUser.profile.id
        }
        this.updateCustomerInformation(postData).then((response) => {
          btn.enable()
          this.getCustomerProfile()
          this.successMessage('Profile updated')
          this.redirectTo({ name: 'CustomerProfileView' })
        }).catch((err) => {
          if (err.name === InvalidDataError.NAME) {
            this.scrollToFirstError()
            return
          }
          if (err.status === 500) {
            this.errorMessage('Could not communicate with server. Code: ' + err.status)
            return
          }
          this.handleResponseInvalidSyntax(err.data)
          this.scrollToFirstError()
          btn.enable()
        })
      },
      handleResponseInvalidSyntax (responseData) {
        if (Array.isArray(responseData)) {
          this.formDatas.forEach(formData => {
            formData.handleInvalidResponse(responseData)
          })
        }
        if (responseData.non_field_errors) {
          this.error = responseData.non_field_errors.join(', ')
        }
      },
      scrollToFirstError: function () {
        this.$nextTick(function () {
          let invalidElement = document.getElementsByClassName('invalid')[0]
          if (invalidElement) {
            VueScrollTo.scrollTo(invalidElement)
          }
        })
      }
    },
    created () {
      this.setupCustomerEditForm(this.authUser.profile.id)
    },
    beforeDestroy: function () {
      this.clearData()
    }
  }
</script>

<style lang="sass" scoped>
  .title
    margin-bottom: 0.4rem
</style>
