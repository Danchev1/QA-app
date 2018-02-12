<template>
  <div class="dashboard-view">
    <title-component
      v-bind:size="1">
      Customer Dashboard
    </title-component>
    <issues-view></issues-view>
    <table-component v-if="cases.length > 0"
                     :content="cases"
                     :headings="headings"
                     :item_keys="item_keys"
                     class="veridens-dashboard">
      Your ongoing applications
    </table-component>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import TableComponent from '@/components/layout/TableComponent'
  import TitleComponent from '@/components/layout/TitleComponent'
  import IssuesView from '../issues/IssuesView.vue'

  export default {
    name: 'dashbaord-view',
    data: function () {
      return {
        headings: ['Case number', 'Certification', 'Level', 'Application date', 'State', 'Responsible', 'Progress', 'Updated'],
        item_keys: ['caseNumber', 'service', 'level', 'applicationDate', 'state', 'responsible', 'progress', 'modified']
      }
    },
    components: {
      IssuesView,
      TitleComponent,
      TableComponent
    },
    computed: {
      ...mapState({
        cases: state => state.caseModule.cases
      })
    },
    methods: {
      ...mapActions([
        'getCases'
      ])
    },
    created () {
      this.getCases().then((response) => {
        if (!response) {
          alert('Could not get data from server')
        }
      })
    }
  }
</script>
<style lang="sass" scoped>
  .veridens-dashboard
    @media screen and (min-width: 765px) and (max-width: 895px)
      font-size: 1.3vw
</style>
