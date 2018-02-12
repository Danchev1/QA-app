<template>
  <div class="confirmation-form" v-if="formDescriptors.length > 0">
    <div class="columns is-multiline">
      <div class="column is-12">
        <title-component
          v-bind:size="3"
          v-bind:lineSeparator="'under'">
          Please choose password
        </title-component>
        <form-component
          v-if="formDescriptors && formDatas"
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
        <!-- Buttons -->
        <div class="field">
          <p class="control">
            <submit-btn-component @submit="submitForm">Submit</submit-btn-component>
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import FormComponent from '../form/FormComponent'
  import { API_APPS } from '@/api/config'
  import TitleComponent from '../layout/TitleComponent.vue'
  import SubmitBtnComponent from '@/components/layout/utility/SubmitBtnComponent.vue'
  import { onKeyEnterMixin } from '@/mixins/mixins'

  export default {
    mixins: [onKeyEnterMixin],
    name: 'confirmation-form-component',
    data: function () {
      return {
        error: ''
      }
    },
    props: {
      code: {
        type: String,
        required: true
      }
    },
    components: {
      TitleComponent,
      FormComponent,
      SubmitBtnComponent
    },
    computed: {
      ...mapState({
        formDescriptors: state => state.formModule.formDescriptors,
        formDatas: state => state.formModule.formDatas
      })
    },
    methods: {
      ...mapMutations([
        'setAuthUser'
      ]),
      ...mapActions([
        'setupConfirmationForm',
        'saveConfirmationForm',
        'errorMessage'
      ]),
      getFormDataForDescriptor: function (formDescriptor) {
        return this.formDatas.find(formData => formDescriptor.id === formData.formDescriptorId)
      },
      submitForm (btn) {
        let formDatasToPost = this.formDatas.filter(formData => !formData.id)
        this.postCurrentFormDatas(formDatasToPost, btn)
      },
      postCurrentFormDatas (formDatas, btn) {
        let postData = {
          formDatas: formDatas,
          code: this.code
        }
        this.saveConfirmationForm(postData).then((response) => {
          btn.enable()
          if (!response) {
            this.scrollToFirstError()
          } else if (response.status === 500) {
            this.errorMessage('Could not communicate with server. Code: ' + response.status)
          } else {
            this.setAuthUser(response.data)
            window.location.replace(API_APPS.CUSTOMER + '/')
          }
        }, (err) => {
          this.handleResponseInvalidSyntax(err.response.data)
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
      }
    },
    created () {
      this.setupConfirmationForm(this.code)
    },
    beforeDestroy () {
      this.clearData()
    }
  }
</script>
<style lang="sass" scoped>
</style>
