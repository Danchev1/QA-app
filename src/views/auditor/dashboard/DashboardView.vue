<template>
  <div class="dashboard-view">
    <title-component
      v-bind:size="1">
      Auditor Dashboard
    </title-component>
    <table-component v-if="casesWithPendingRequests.length > 0"
                     :content="casesWithPendingRequests"
                     :headings="headings"
                     :item_keys="item_keys"
                     class="veridens-dashboard">
      Requested cases
    </table-component>
    <table-component v-if="auditorCases.length > 0"
                     :content="auditorCases"
                     :headings="headings"
                     :item_keys="item_keys"
                     class="veridens-dashboard">
      Assigned cases
    </table-component>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import TableComponent from '@/components/layout/TableComponent'
  import TitleComponent from '@/components/layout/TitleComponent'

  export default {
    name: 'dashbaord-view',
    data: function () {
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
        auditorCases: state => state.auditorModule.auditorCases,
        auditorRequests: state => state.auditorModule.auditorRequests,
        authUser: state => state.authModule.authUser
      }),
      casesWithPendingRequests () {
        let requests = []
        this.auditorRequests.forEach(auditorRequest => {
          auditorRequest.case.request = auditorRequest
          requests.push(auditorRequest.case)
        })
        return requests
      }
    },
    methods: {
      ...mapActions([
        'getAuditorCases',
        'getPendingAuditorRequests',
        'errorMessage'
      ])
    },
    created () {
      this.getAuditorCases(this.authUser.profile.id).then((response) => {
        if (!response) {
          this.errorMessage('Could not get data from server')
        }
      })
      this.getPendingAuditorRequests(this.authUser.profile.id).then((response) => {
        if (!response) {
          this.errorMessage('Could not get data from server')
        }
      })
    }
  }
</script>
<style lang="sass" scoped>
</style>
