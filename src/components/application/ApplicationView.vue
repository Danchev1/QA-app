<template>
  <div class="application-component"
       v-if="formDescriptors.length > 0">
    <!-- Title -->
    <div class="columns">
      <div class="column is-12">
        <title-component class="is-uppercase"
                         v-bind:size="layout.title_size"
                         v-bind:lineSeparator="layout.title_line_separator">
          {{ title }}
        </title-component>
        <!-- Description -->
        <div class="subtitle is-6">{{ description }}</div>
      </div>
    </div>

    <!-- Forms -->
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
    <div class="field is-grouped">
      <p class="control">
        <submit-btn-component class="is-large is-uppercase" @submit="submitForm">Send in application</submit-btn-component>
      </p>
      <p class="control">
        <button class="button is-danger is-outlined is-large"
                v-on:click="redirectTo({ name: 'StartView' })">
          Cancel
        </button>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import TitleComponent from '../layout/TitleComponent'
  import FormComponent from '../form/FormComponent'
  import router from '@/router/public'
  import { InvalidDataError } from '@/classes/errors'
  import { onKeyEnterMixin } from '@/mixins/mixins'
  import SubmitBtnComponent from '@/components/layout/utility/SubmitBtnComponent.vue'

  let VueScrollTo = require('vue-scrollto')

  export default {
    mixins: [onKeyEnterMixin],
    directives: {
      VueScrollTo
    },
    data () {
      return {
        error: ''
      }
    },
    props: {
      code: {
        required: true
      }
    },
    components: {
      FormComponent,
      TitleComponent,
      SubmitBtnComponent
    },
    name: 'application-component',
    computed: {
      ...mapState({
        title: state => state.formModule.title,
        description: state => state.formModule.description,
        layout: state => state.formModule.layout,
        formDescriptors: state => state.formModule.formDescriptors,
        formDatas: state => state.formModule.formDatas,
        service: state => state.formModule.service
      })
    },
    methods: {
      ...mapActions([
        'setupApplicationForm',
        'saveApplicationForm',
        'updateApplicationForm',
        'clearData',
        'errorMessage',
        'successMessage'
      ]),
      redirectTo (destination) {
        router.push(destination)
      },
      getFormDataForDescriptor: function (formDescriptor) {
        return this.formDatas.find(formData => formDescriptor.id === formData.formDescriptorId)
      },
      submitForm (btn) {
        let formDatasToPost = this.formDatas.filter(formData => !formData.id)
        if (formDatasToPost.length > 0) {
          this.postCurrentFormDatas(formDatasToPost, btn)
        }
      },
      postCurrentFormDatas (formDatas, btn) {
        let postData = {
          formDatas: formDatas,
          service: this.service
        }
        this.saveApplicationForm(postData).then((response) => {
          btn.enable()
          this.successMessage('Application sent')
          router.push({ name: 'ThankYouView' })
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
      scrollToFirstError () {
        this.$nextTick(function () {
          let invalidElement = document.getElementsByClassName('invalid')[0]
          if (invalidElement) {
            VueScrollTo.scrollTo(invalidElement)
          }
        })
      }
    },
    mounted () {
      this.setupApplicationForm(this.code)
    },
    beforeDestroy () {
      this.clearData()
    }
  }
</script>

<style lang="sass" scoped>
  .title
    margin-bottom: 0.4rem
</style>
