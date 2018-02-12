<template>
  <div class="columns is-multiline issues-view"  v-if="hasIssues">
    <div class="column is-12">
      <title-component>
        TODO
      </title-component>
    </div>
    <div class="column is-12">
      <div class="flex-table">
        <div class="flex-table-row flex-table-header">
          <div class="flex-table-row-item">Title</div>
          <div class="flex-table-row-item">Description</div>
        </div>
        <issueView v-for="issue in issues" :key="issue.id" v-bind:issue="issue">
        </issueView>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import FormComponent from '@/components/form/FormComponent'
  import CardModalComponent from '@/components/layout/modal/CardModalComponent'
  import IssueView from '@/views/customer/issues/IssueView'
  import TitleComponent from '@/components/layout/TitleComponent.vue'

  export default {
    name: 'issues-view',
    components: {
      TitleComponent,
      FormComponent,
      CardModalComponent,
      IssueView
    },
    computed: {
      ...mapState({
        issues: state => state.issueModule.issues
      }),
      hasIssues () {
        return this.issues.length > 0
      }
    },
    methods: {
      ...mapActions([
        'getIssues'
      ])
    },
    mounted () {
      this.getIssues()
    }

  }

</script>
<style lang="sass" scoped>

</style>
