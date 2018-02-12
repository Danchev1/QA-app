<template>
  <div class="customer-list-view">
    <title-component
      v-bind:size="1">
      Customers list
    </title-component>
    <table-component
      v-if="customers.length > 0"
      :content="customers"
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
    name: 'customers-list-view',
    data () {
      return {
        headings: ['Customer ID', 'First name', 'Last name', 'Personal ID', 'Email', 'City', 'Updated'],
        item_keys: ['customerId', 'firstName', 'lastName', 'personNumber', 'email', 'city', 'modified']
      }
    },
    components: {
      TableComponent,
      TitleComponent
    },
    computed: {
      ...mapState({
        customers: state => state.customerModule.customers,
        authUser: state => state.authModule.authUser
      })
    },
    methods: {
      ...mapActions([
        'getCustomers',
        'errorMessage'
      ])
    },
    created () {
      this.getCustomers().then((response) => {
        if (!response) {
          this.errorMessage('Could not get data from server')
        }
      })
    }
  }
</script>

