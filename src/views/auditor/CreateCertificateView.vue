<template>
  <div class="create-certificate-view">
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <title-component
            v-bind:size="1">
            Create Certificate
            <p class="control is-pulled-right">
              <span class="tag is-info is-uppercase">
                Draft
              </span>
            </p>
          </title-component>
          <br>
          <title-component
            v-bind:size="2"
            v-bind:lineSeparator="'under'">
            Customer
          </title-component>
          <grid-details-component v-if="currentCase.id" v-bind:content="customer_profile_specs" v-bind:detailObject="currentCase.customer"></grid-details-component>
          <title-component
            v-bind:size="2"
            v-bind:lineSeparator="'under'">
            Certificate
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
          <br>
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-info is-uppercase is-large">
                Save as draft
              </button>
            </p>
            <p class="control">
             <submit-btn-component class="is-uppercase is-large" @submit="publishCertificate">
               <span>Publish certificate</span>
                <icon-component
                  pack="mdi"
                  icon="verified">
                </icon-component>
             </submit-btn-component>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns is-multilined">
        <div class="column is-12">
          <tabs animation="fade" :only-fade="true">
            <tab-pane label="Certificate">
            </tab-pane>
          </tabs>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import { customerProfileSpecs } from '@/display_context/display_context'
  import TitleComponent from '@/components/layout/TitleComponent'
  import GridDetailsComponent from '@/components/layout/grid/GridDetailsComponent'
  import FormComponent from '@/components/form/FormComponent'
  import Tabs from '@/components/layout/tabs/tabs_content/Tabs'
  import TabPane from '@/components/layout/tabs/tabs_content/TabPane'
  import IconComponent from '@/components/layout/icon/IconComponent'
  import { InvalidDataError } from '@/classes/errors'
  import router from '@/router/auditor'
  import SubmitBtnComponent from '../../components/layout/utility/SubmitBtnComponent'

  let VueScrollTo = require('vue-scrollto')

  export default {
    name: 'create-certificate-view',
    components: {
      SubmitBtnComponent,
      TabPane,
      Tabs,
      FormComponent,
      GridDetailsComponent,
      TitleComponent,
      IconComponent
    },
    data () {
      return {
        error: '',
        activeTab: 1,
        customer_profile_specs: []
      }
    },
    props: {
      caseId: {
        required: true
      }
    },
    computed: {
      ...mapState({
        certificate: state => state.certificateModule.certificate,
        currentCase: state => state.caseModule.currentCase,
        cases: state => state.caseModule.cases,
        formDescriptors: state => state.certificateModule.certificateFormDescriptor,
        formDatas: state => state.certificateModule.certificateFormData
      })
    },
    methods: {
      ...mapActions([
        'setOrRefreshCase',
        'setupCertificateForm',
        'clearCertificateData',
        'saveCertificateForm',
        'errorMessage',
        'successMessage'
      ]),
      getFormDataForDescriptor (formDescriptor) {
        return this.formDatas.find(formData => formDescriptor.id === formData.formDescriptorId)
      },
      publishCertificate (btn) {
        let formDatasToPost = this.formDatas.filter(formData => !formData.id)
        if (formDatasToPost.length > 0) {
          this.postCertificateFormDatas(formDatasToPost, btn)
        }
      },
      postCertificateFormDatas (formDatas, btn) {
        let postData = {
          caseId: this.caseId,
          formDatas: formDatas
        }
        this.saveCertificateForm(postData).then((response) => {
          btn.enable()
          this.successMessage('Certificate published')
          router.push({ name: 'PublishedCertificateView', params: { certificateId: this.certificate.id } })
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
        this.$nextTick(() => {
          let invalidElement = document.getElementsByClassName('invalid')[0]
          if (invalidElement) {
            VueScrollTo.scrollTo(invalidElement)
          }
        })
      }
    },
    created () {
      this.customer_profile_specs = customerProfileSpecs
      this.setOrRefreshCase(this.caseId)
      this.setupCertificateForm(this.caseId)
    },
    beforeDestroy () {
      this.clearCertificateData()
    }
  }
</script>
<style lang="sass" scoped>
  .form-component
    margin-top: 2rem

</style>
