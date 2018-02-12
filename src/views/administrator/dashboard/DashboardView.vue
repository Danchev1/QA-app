<template>
  <div class="dashboard-view">
    <title-component
      v-bind:size="1">
      Staff Dashboard
    </title-component>
    <table-component v-if="staffCases.length > 0"
                     :content="staffCases"
                     :headings="headings"
                     :item_keys="item_keys"
                     class="veridens-dashboard">
      Cases waiting on action
    </table-component>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import TableComponent from '@/components/layout/TableComponent'
  import TitleComponent from '@/components/layout/TitleComponent'

  export default {
    name: 'dashboard-view',
    data () {
      return {
        headings: ['Case number', 'Certification', 'Level', 'Application date', 'State', 'Responsible', 'Progress', 'Updated'],
        item_keys: ['caseNumber', 'service', 'level', 'applicationDate', 'state', 'responsible', 'progress', 'modified']
      }
    },
    components: {
      TitleComponent,
      TableComponent
    },
    computed: {
      ...mapState({
        staffCases: state => state.staffModule.staffCases,
        authUser: state => state.authModule.authUser
      })
    },
    methods: {
      ...mapActions([
        'getStaffCases',
        'errorMessage'
      ])
    },
    created () {
      this.getStaffCases().then((response) => {
        if (!response) {
          this.errorMessage('Could not get data from server')
        }
      })
    }
  }
</script>

<style lang="sass" scoped>

</style>
