<template>
  <div class="dashboard-view">
    <title-component
      v-bind:size="1">
      Cases list
    </title-component>
    <table-component v-if="cases.length > 0"
                     :content="cases"
                     :headings="headings"
                     :item_keys="item_keys"
                     class="veridens-dashboard">
    </table-component>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import TableComponent from '@/components/layout/TableComponent'
  import TitleComponent from '@/components/layout/TitleComponent'

  export default {
    name: 'cases-list-view',
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
        cases: state => state.caseModule.cases,
        authUser: state => state.authModule.authUser
      })
    },
    methods: {
      ...mapActions([
        'getCases',
        'errorMessage'
      ])
    },
    created () {
      this.getCases().then((response) => {
        if (!response) {
          this.errorMessage('Could not get data from server')
        }
      })
    }
  }
</script>
<style lang="sass" scoped>
</style>
