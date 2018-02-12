<template>
  <div class="case-view">
    <!-- Title -->
    <title-component
      v-bind:size="1" v-if="currentCase.id">
      Case {{ currentCase.caseNumber }}
      <action-dropdown-component :actions="actions"></action-dropdown-component>
    </title-component>
    <grid-details-component
      v-if="currentCase.id"
      v-bind:content="case_specs"
      v-bind:detailObject="currentCase"></grid-details-component>
    <title-component
      v-if="caseFiles.length > 0"
      v-bind:size="2"
      v-bind:lineSeparator="'under'">
      Documents
    </title-component>
    <application-details-component
      v-if="caseFiles.length > 0"
      :headings="headings"
      :item_keys="item_keys"
      :documents="caseFiles">
    </application-details-component>
    <title-component
      v-if="currentCase.customer"
      v-bind:size="2"
      v-bind:lineSeparator="'under'">
      Customer
    </title-component>
    <grid-details-component
      v-if="currentCase.customer"
      v-bind:content="customer_profile_specs"
      v-bind:detailObject="currentCase.customer"></grid-details-component>
    <br>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { caseSpecs, customerProfileSpecs } from '@/display_context/display_context'
  import TitleComponent from '@/components/layout/TitleComponent'
  import GridDetailsComponent from '@/components/layout/grid/GridDetailsComponent'
  import ActionDropdownComponent from '@/components/layout/utility/ActionDropdownComponent.vue'
  import ApplicationDetailsComponent from '@/components/layout/ApplicationDetailsComponent.vue'
  import { AuditorRequest } from '@/classes/case/Auditor'
  import { Case, CaseState } from '@/classes/case/Case'

  export default {
    name: 'case-view',
    data () {
      return {
        headings: ['Documents', 'Filename', 'Uploaded at'],
        item_keys: ['documentInfo', 'filename', 'updatedAt'],
        case_specs: [],
        customer_profile_specs: [],
        actions: []
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
        cases: state => state.caseModule.cases,
        auditorRequests: state => state.auditorModule.auditorRequests,
        authUser: state => state.authModule.authUser
      })
    },
    methods: {
      ...mapActions([
        'setOrRefreshCase',
        'getFiles',
        'getAuditorRequestsForCases',
        'updateAuditorRequest',
        'updateCase'
      ]),
      ...mapMutations([
        'setStateCurrentCase'
      ]),
      handleAction (actionType) {
        if ([Case.ACCEPT_CASE, Case.REJECT_CASE].includes(actionType)) {
          let data = {
            currentCase: this.currentCase,
            postData: {
              requestId: this.auditorRequests[0].id,
              state: actionType === Case.ACCEPT_CASE ? AuditorRequest.ACCEPTED : AuditorRequest.DECLINED
            }
          }
          this.updateAuditorRequest(data).then(() => {
            this.actions = []
            let handleAction = this.handleAction
            this.currentCase.getCaseActions().forEach(action => {
              this.actions.push(
                {
                  type: 'ACTION',
                  func () {
                    handleAction(action.action_type)
                  },
                  text: action.name
                }
              )
            })
          })
        }

        if (actionType === Case.BEGIN_REVIEW) {
          let data = {
            caseId: this.caseId,
            payload: {
              state: CaseState.STATES[CaseState.IN_REVIEW]
            }
          }
          this.updateCase(data).then(() => {
            this.$router.push({ name: 'CaseReviewView', params: { caseId: this.caseId } })
          })
        }
      }
    },
    created () {
      this.case_specs = caseSpecs
      this.customer_profile_specs = customerProfileSpecs
      this.getFiles(this.caseId)
      this.setOrRefreshCase(this.caseId).then(() => {
        // Check for redirect
        if (this.currentCase.isInReview()) {
          this.$router.push({ name: 'CaseReviewView', params: { caseId: this.currentCase.id } })
        }
        let handleAction = this.handleAction
        this.currentCase.getCaseActions().forEach(action => {
          this.actions.push(
            {
              type: 'ACTION',
              func () {
                handleAction(action.action_type)
              },
              text: action.name
            }
          )
        })
        let postData = {
          caseId: this.caseId,
          auditorId: this.authUser.profile.id
        }
        this.getAuditorRequestsForCases(postData)
      })
    }
  }
</script>

