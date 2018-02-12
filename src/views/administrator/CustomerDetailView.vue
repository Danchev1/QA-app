<template>
  <div class="customer-detail-view">
    <title-component
      v-bind:size="1"
      v-bind:lineSeparator="'under'">
      Customer detail view
      <action-dropdown-component :actions="actions"></action-dropdown-component>
    </title-component>
    <grid-details-component v-if="currentCustomer.id" v-bind:content="customer_profile_specs" v-bind:detailObject="currentCustomer">
    </grid-details-component>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { customerProfileSpecs } from '@/display_context/display_context'
  import TitleComponent from '@/components/layout/TitleComponent'
  import GridDetailsComponent from '@/components/layout/grid/GridDetailsComponent'
  import ActionDropdownComponent from '@/components/layout/utility/ActionDropdownComponent'

  export default {
    name: 'customer-detail-view',
    components: {
      ActionDropdownComponent,
      GridDetailsComponent,
      TitleComponent
    },
    data () {
      return {
        actions: [],
        customer_profile_specs: {}
      }
    },
    props: {
      customerId: {
        required: true
      }
    },
    computed: {
      ...mapState({
        currentCustomer: state => state.customerModule.currentCustomer,
        customers: state => state.customerModule.customers
      })
    },
    methods: {
      ...mapActions([
        'setOrRefreshCustomer',
        'errorMessage',
        'switchProfile'
      ]),
      switchToCustomer (profileId) {
        this.switchProfile(profileId)
      }
    },
    created () {
      this.customer_profile_specs = customerProfileSpecs
      this.setOrRefreshCustomer(this.customerId).then(() => {
        let profileId = this.currentCustomer.userId
        let switchToCustomer = this.switchToCustomer
        this.actions.push({
          type: 'ACTION',
          func () {
            switchToCustomer(profileId)
          },
          text: `Switch profile`
        })
      })
    }
  }
</script>

