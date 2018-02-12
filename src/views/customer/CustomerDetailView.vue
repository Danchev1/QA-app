<template>
  <div class="customer-detail-view">
    <title-component
      v-bind:size="1"
      v-bind:lineSeparator="'under'">
      Customer detail view
      <action-dropdown-component :actions="actions"></action-dropdown-component>
    </title-component>
    <grid-details-component v-if="customer.customerId" v-bind:content="customer_profile_specs" v-bind:detailObject="customer"></grid-details-component>
    <tabs-router-component v-bind:tabs="routes">
    </tabs-router-component>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { customerProfileSpecs } from '@/display_context/display_context'
  import TitleComponent from '@/components/layout/TitleComponent'
  import GridDetailsComponent from '@/components/layout/grid/GridDetailsComponent'
  import TabsRouterComponent from '@/components/layout/tabs/TabsRouterComponent.vue'
  import ActionDropdownComponent from '@/components/layout/utility/ActionDropdownComponent'

  export default {
    name: 'customer-detail-view',
    components: {
      ActionDropdownComponent,
      TitleComponent,
      GridDetailsComponent,
      TabsRouterComponent
    },
    data () {
      return {
        actions: [],
        customer_profile_specs: [],
        routes: [
          {
            route: { name: 'InvoicingView' },
            text: 'Invoicing'
          },
          {
            route: { name: 'DocumentsView' },
            text: 'Documents'
          },
          {
            route: { name: 'MessagingView' },
            text: 'Messaging'
          }
        ]
      }
    },
    computed: {
      ...mapState({
        customer: state => state.profileModule.customerProfile,
        authUser: state => state.authModule.authUser
      })
    },
    methods: {
      ...mapActions([
        'getCustomerProfile'
      ])
    },
    created () {
      this.customer_profile_specs = customerProfileSpecs
      this.getCustomerProfile()
      this.actions.push(
        {
          type: 'ROUTE',
          route: { name: 'CustomerEditView' },
          text: 'Edit information...'
        }
      )
    }
  }
</script>

