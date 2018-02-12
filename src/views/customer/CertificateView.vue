<template>
  <div class="customer-certificate-view">
    <!-- Forms -->
    <form-component
      v-if="currentFormDescriptors && formDatas"
      v-for="formDescriptor in currentFormDescriptors"
      v-bind:formDescriptor="formDescriptor"
      v-bind:formData="getFormDataForDescriptor(formDescriptor)"
      v-bind:key="formDescriptor.id">
    </form-component>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { FORM_CERTIFICATES, FORM_TYPES } from '@/api/config'
  import TitleComponent from '@/components/layout/TitleComponent'
  import FormComponent from '@/components/form/FormComponent'

  export default {
    components: {
      TitleComponent,
      FormComponent
    },
    name: 'customer-certificate-view',
    data: function () {
      return {
        currentFormDescriptors: []
      }
    },
    props: {
      serviceType: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapState({
        title: state => state.formModule.title,
        description: state => state.formModule.description,
        layout: state => state.formModule.layout,
        formDescriptors: state => state.formModule.formDescriptors,
        formDatas: state => state.formModule.formDatas
      })
    },
    methods: {
      ...mapActions([
        'setupApplicationForm'
      ]),
      getFormDataForDescriptor: function (formDescriptor) {
        return this.formDatas.find(formData => formDescriptor.id === formData.formDescriptorId)
      },
      filterFormDescriptors: function (serviceType) {
        // TODO: Create API skeleton for filtering forms in backend instead of frontend
        if (serviceType === FORM_CERTIFICATES.CUSTOMER) {
          this.currentFormDescriptors = this.formDescriptors.slice(0, 1)
        } else {
          this.currentFormDescriptors = this.formDescriptors.slice(1)
        }
      }
    },
    watch: {
      serviceType: function (val) {
        this.currentFormDescriptors = []
        let getParams = {
          serviceType: val.toUpperCase(),
          formType: FORM_TYPES.APPLICATION
        }
        this.setupApplicationForm(getParams).then((response) => {
          if (response) {
            this.filterFormDescriptors(getParams.serviceType)
          }
        })
      }
    },
    mounted: function () {
      let getParams = {
        serviceType: this.serviceType.toUpperCase(),
        formType: FORM_TYPES.APPLICATION
      }
      this.setupApplicationForm(getParams).then((response) => {
        if (response) {
          this.filterFormDescriptors(getParams.serviceType)
        }
      })
    }
  }
</script>

<style lang="sass" scoped>

</style>
