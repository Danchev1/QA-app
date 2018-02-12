<template>
  <div class="case-view">
    <!-- Title -->
    <title-component
      v-bind:size="1" v-if="currentCase.id">
      Case {{ currentCase.caseNumber }}
      <action-dropdown-component :actions="actions"></action-dropdown-component>
    </title-component>
    <grid-details-component v-if="currentCase.id" v-bind:content="case_specs" v-bind:detailObject="currentCase"></grid-details-component>
    <title-component
      v-if="caseFiles.length > 0"
      v-bind:size="2"
      v-bind:lineSeparator="'under'">
      Documents
    </title-component>
    <application-details-component
      v-if="caseFiles.length > 0"
      :headings="headings"
      :documents="caseFiles"
      :item_keys="item_keys"></application-details-component>
    <title-component
      class="title"
      v-bind:size="2"
      v-bind:lineSeparator="'under'">
      Customer profile
    </title-component>
    <grid-details-component v-if="currentCase.customer" v-bind:content="customer_profile_specs" v-bind:detailObject="currentCase.customer"></grid-details-component>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { caseSpecs, customerProfileSpecs } from '@/display_context/display_context'
  import TitleComponent from '@/components/layout/TitleComponent'
  import GridDetailsComponent from '@/components/layout/grid/GridDetailsComponent'
  import ActionDropdownComponent from '@/components/layout/utility/ActionDropdownComponent.vue'
  import ApplicationDetailsComponent from '@/components/layout/ApplicationDetailsComponent.vue'

  export default {
    name: 'case-view',
    data () {
      return {
        headings: ['Documents', 'Filename', 'Updated At'],
        item_keys: ['documentInfo', 'filename', 'updatedAt'],
        case_specs: [],
        customer_profile_specs: [],
        actions: [
          {
            type: 'ROUTE',
            route: { name: 'AssignAuditorView', params: { caseId: this.caseId } },
            text: 'Assign an auditor...'
          }
        ]
      }
    },
    props: {
      caseId: {
        required: true
      }
    },
    components: {
      ApplicationDetailsComponent,
      ActionDropdownComponent,
      TitleComponent,
      GridDetailsComponent
    },
    computed: {
      ...mapState({
        currentCase: state => state.caseModule.currentCase,
        caseFiles: state => state.filesModule.files,
        cases: state => state.caseModule.cases
      })
    },
    methods: {
      ...mapActions([
        'setOrRefreshCase',
        'getFiles'
      ]),
      ...mapMutations([
        'setStateCurrentCase'
      ])
    },
    created () {
      this.case_specs = caseSpecs
      this.customer_profile_specs = customerProfileSpecs
      this.setOrRefreshCase(this.caseId)
      this.getFiles(this.caseId)
    }
  }
</script>

<style lang="sass" scoped>
</style>
