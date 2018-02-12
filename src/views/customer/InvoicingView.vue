<template>
  <div class="invoicing-view">
    <grid-details-component v-if="invoicing" v-bind:content="invoicing_specs" v-bind:detailObject="invoicing"></grid-details-component>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import GridDetailsComponent from '@/components/layout/grid/GridDetailsComponent.vue'

  export default {
    components: { GridDetailsComponent },
    name: 'invoicing-view',
    data () {
      return {
        invoicing_specs: [
          {
            label: 'Invoice reference',
            item_key: 'reference',
            value: ''
          },
          {
            label: 'Invoice distribution',
            item_key: 'distribution',
            value: ''
          },
          {
            label: 'Company name',
            item_key: 'distribution',
            value: ''
          },
          {
            label: 'Registration No.',
            item_key: 'registrationNumber',
            value: ''
          },
          {
            label: 'Invoice e-mail',
            item_key: 'email',
            value: ''
          },
          {
            label: 'VAT no.',
            item_key: 'vat',
            value: ''
          },
          {
            label: 'Invoice address',
            item_key: 'address',
            value: ''
          },
          {
            label: 'Invoice postal code',
            item_key: 'postalCode',
            value: ''
          },
          {
            label: 'Invoice city',
            item_key: 'city',
            value: ''
          },
          {
            label: 'Invoice country',
            item_key: 'country',
            value: ''
          }]
      }
    },
    computed: {
      ...mapState({
        invoicing: state => state.profileModule.customerProfile.invoicing
      })
    }
  }
</script>
<style lang="sass" scoped>

</style>
