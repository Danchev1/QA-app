<template>
  <div class="case-view">
    <!-- Title -->
    <title-component
      v-bind:size="1" v-if="currentCase.id">
      Case {{ currentCase.caseNumber }}
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
      v-if="currentCase.customer"
      v-bind:size="2"
      v-bind:lineSeparator="'under'">
      Customer information
    </title-component>
    <grid-details-component v-if="currentCase.customer" v-bind:content="customer_profile_specs" v-bind:detailObject="currentCase.customer"></grid-details-component>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { caseSpecs, customerProfileSpecs } from '@/display_context/display_context'
  import TitleComponent from '@/components/layout/TitleComponent'
  import GridDetailsComponent from '@/components/layout/grid/GridDetailsComponent'
  import ApplicationDetailsComponent from '@/components/layout/ApplicationDetailsComponent'

  export default {
    name: 'case-view',
    data () {
      return {
        headings: ['Documents', 'Filename', 'Uploaded At'],
        item_keys: ['documentInfo', 'filename', 'updatedAt'],
        case_specs: [],
        customer_profile_specs: []
      }
    },
    props: {
      caseId: {
        required: true
      }
    },
    components: {
      ApplicationDetailsComponent,
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
      this.getFiles(this.caseId)
      this.setOrRefreshCase(this.caseId).then(() => {
        // Check for redirect
        if (this.currentCase.isInReview()) {
          this.$router.push({ name: 'CaseReview', params: { caseId: this.currentCase.id } })
        }
      })
    }
  }
</script>

