<template>
  <div class="certificates-list-view">
    <title-component
      v-bind:size="1">
      Certificates list
    </title-component>
    <table-component v-if="certificates.length > 0"
                     :content="certificates"
                     :headings="headings"
                     :item_keys="item_keys"
                     class="veridens-dashboard">
    </table-component>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import TitleComponent from '@/components/layout/TitleComponent'
  import TableComponent from '@/components/layout/TableComponent'

  export default {
    name: 'certificate-list-view',
    data () {
      return {
        headings: ['Certificate No.', 'State', 'Customer', 'Issued date', 'Expiry date ', 'Validity period'],
        item_keys: ['certificateNumber', 'state', 'customer', 'issueDate', 'expiryDate', 'validityPeriod']
      }
    },
    components: {
      TableComponent,
      TitleComponent
    },
    computed: {
      ...mapState({
        certificates: state => state.certificateModule.certificates
      })
    },
    methods: {
      ...mapActions([
        'getCertificates',
        'errorMessage'
      ])
    },
    created () {
      this.getCertificates().then((response) => {
        if (!response) {
          this.errorMessage('Could not get data from server')
        }
      })
    }

  }
</script>
<style lang="sass" scoped="">

</style>
