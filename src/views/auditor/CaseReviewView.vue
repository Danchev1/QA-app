<template>
  <div class="case-review-view">
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <title-component
            v-if="currentCase.id"
            v-bind:size="1">
            Review case {{ currentCase.caseNumber }}
          </title-component>
          <br>
          <grid-details-component v-if="currentCase.id" v-bind:content="case_specs" v-bind:detailObject="currentCase"></grid-details-component>
          <title-component
            v-if="customerReviewResults.length > 0"
            v-bind:size="2"
            v-bind:lineSeparator="'under'">
            Customer
          </title-component>
          <review-auditor-grid-component
            v-if="customerReviewResults.length > 0"
            v-bind:reviewResults="customerReviewResults"
            v-bind:columnClasses="'is-12-mobile is-6-tablet is-6-desktop'"
            v-on:stateOK="setReviewResultStateOK($event)"
            v-on:stateNotOK="setReviewResultStateNotOK($event)"
            v-on:statePENDING="setReviewResultStatePENDING($event)">
          </review-auditor-grid-component>
          <hr>
          <div class="columns is-multiline approve-all-section is-variable is-2">
            <div class="column is-6"><p class="has-text-weight-semibold is-uppercase">Approve all customer information</p></div>
            <div class="column is-6">
              <submit-btn-component class="is-outlined" @submit="approveAll(customerReviewResults, $event)">
                <span>Approve all</span>
                <span class="icon is-large">
                  <i class="mdi mdi-check-all"></i>
                </span>
              </submit-btn-component>
            </div>
          </div>
          <br>
          <br>
          <title-component
            v-bind:size="2"
            v-bind:lineSeparator="'under'">
            Certification
          </title-component>
          <review-documents-component
            v-if="serviceReviewResults.length > 0"
            :headings="headings"
            :reviewDocuments="serviceReviewResults"
            v-on:stateOK="setReviewResultStateOK($event)"
            v-on:stateNotOK="setReviewResultStateNotOK($event)"
            v-on:statePENDING="setReviewResultStatePENDING($event)">
          </review-documents-component>
          <hr>
          <div class="columns is-multiline approve-all-section is-variable is-2">
            <div class="column is-6"><p class="has-text-weight-semibold is-uppercase">Approve all documents</p></div>
            <div class="column is-6">
              <submit-btn-component class="is-outlined" @submit="approveAll(serviceReviewResults, $event)">
                <span>Approve all</span>
                <span class="icon is-large">
                  <i class="mdi mdi-check-all"></i>
                </span>
              </submit-btn-component>
            </div>
          </div>
          <br>
          <br>
          <title-component
            v-bind:size="2"
            v-bind:lineSeparator="'under'">
            Decision
          </title-component>
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-primary is-uppercase is-large" @click="createCertificate()">
                <span>Create certificate...</span>
                <span class="icon is-large">
                  <i class="mdi mdi-check-all"></i>
                </span>
              </button>
            </p>
            <p class="control">
              <button class="button is-danger is-outlined is-uppercase is-large">
                <span>Close case</span>
                <span class="icon is-large">
                  <i class="mdi mdi-window-close"></i>
                </span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns is-multilined">
        <div class="column is-12">
          <tabs animation="fade" :only-fade="true">
            <tab-pane label="Findings">
              <template v-if="findingsForResponsibleAuditor.length > 0">
                <div class="is-divider" data-content="Waiting on auditor"></div>
                <collapse-component accordion is-fullwidth>
                  <collapse-item v-for="result in findingsForResponsibleAuditor"
                                 :key="result.id"
                                 :title="result.getLabel()">
                    <!-- New finding. Load description form -->
                    <div v-if="result.hasPendingFinding()">
                      <div class="field">
                        <label class="label">Describe the non-conformity</label>
                        <div class="control">
                          <textarea class="textarea" v-model="result.pendingFinding.description" cols="30" rows="5"></textarea>
                        </div>
                      </div>
                      <div class="field">
                        <button class="button is-primary" @click="saveFindingDescription(result)">Save finding</button>
                      </div>
                    </div>
                    <!-- Finding resolved by customer and waiting for auditor to accept or reject -->
                    <finding-approval-component v-if="result.waitingOnReview()" v-bind:result="result"></finding-approval-component>
                  </collapse-item>
                </collapse-component>
              </template>
              <div v-if="findingsForResponsibleCustomer.length > 0" class="is-divider divider-is-blue" data-content="Waiting on customer"></div>
              <collapse-component accordion is-fullwidth v-if="findingsForResponsibleCustomer.length > 0">
                <collapse-item v-for="result in findingsForResponsibleCustomer"
                               :title="result.getLabel()"
                               :key="result.id">
                  <!-- Finding is waiting for customer to respond -->
                  <div v-if="result.waitingOnCustomer()">
                    <div class="field">
                      <label class="label">Description:</label>
                      <p>
                        {{result.finding.description}}
                      </p>
                    </div>
                    <div class="comments-section">
                      <title-component
                        v-if="result.finding.hasComments()"
                        v-bind:size="4"
                        v-bind:lineSeparator="'under'">
                        Comments
                      </title-component>
                      <comment-component
                        v-for="comment in result.finding.comments"
                        v-if="comment.text"
                        :key="comment.id"
                        :class="{ 'auditor-comment': comment.createdBy.isAuditor(), 'customer-comment': comment.createdBy.isCustomer()}"
                        :comment="comment">
                      </comment-component>
                    </div>
                  </div>
                </collapse-item>
              </collapse-component>
            </tab-pane>
          </tabs>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import { caseSpecs, reviewResultSpecs } from '@/display_context/display_context'
  import Tabs from '@/components/layout/tabs/tabs_content/Tabs'
  import TabPane from '@/components/layout/tabs/tabs_content/TabPane'
  import TitleComponent from '@/components/layout/TitleComponent'
  import GridDetailsComponent from '@/components/layout/grid/GridDetailsComponent'
  import ReviewAuditorGridComponent from '@/components/layout/custom_grid/ReviewAuditorGridComponent'
  import { ReviewResultState } from '@/classes/case/ReviewResult'
  import ProfileType from '@/classes/case/ProfileType'
  import CollapseComponent from '@/components/layout/collapse/Collapse'
  import CollapseItem from '@/components/layout/collapse/Item'
  import ReviewDocumentsComponent from '@/components/layout/ReviewDocumentsComponent'
  import CommentComponent from '@/components/layout/utility/CommentComponent'
  import StatusComponent from '@/components/layout/utility/StatusComponent'
  import IconComponent from '@/components/layout/utility/IconComponent'
  import router from '@/router/auditor'
  import FindingApprovalComponent from '@/components/finding/FindingApprovalComponent'
  import SubmitBtnComponent from '@/components/layout/utility/SubmitBtnComponent'

  export default {
    name: 'case-review-view',
    data () {
      return {
        headings: ['Documents', 'Filename', 'Uploaded at'],
        activeTab: 1,
        case_specs: [],
        review_results_specs: [],
        latestFinding: null
      }
    },
    props: {
      caseId: {
        required: true
      }
    },
    components: {
      SubmitBtnComponent,
      CommentComponent,
      Tabs,
      TabPane,
      CollapseComponent,
      CollapseItem,
      TitleComponent,
      GridDetailsComponent,
      ReviewAuditorGridComponent,
      ReviewDocumentsComponent,
      StatusComponent,
      IconComponent,
      FindingApprovalComponent
    },
    computed: {
      ...mapState({
        currentCase: state => state.caseModule.currentCase,
        cases: state => state.caseModule.cases,
        reviewResults: state => state.caseReviewModule.reviewResults,
        authUser: state => state.authModule.authUser
      }),
      ...mapGetters([
        'getReviewResultFindings',
        'groupedReviewResults',
        'getFindingsForResponsible'
      ]),
      findingsForResponsibleCustomer () {
        return this.getFindingsForResponsible(ProfileType.CUSTOMER)
      },
      findingsForResponsibleAuditor () {
        return this.getFindingsForResponsible(ProfileType.AUDITOR)
      },
      customerReviewResults () {
        let customerGroups = ['customer_invoice', 'customer_profile']
        return this.groupedReviewResults(customerGroups)
      },
      serviceReviewResults () {
        return this.groupedReviewResults('service_information')
      },
      commentAuthor (profileType) {
        return ProfileType.getProfileTypeDisplay(profileType)
      }
    },
    methods: {
      ...mapActions([
        'setOrRefreshCase',
        'updateAllReviewResultsState',
        'getReviewResults',
        'updateReviewResultState',
        'saveFinding',
        'updateFinding',
        'errorMessage'
      ]),
      ...mapMutations([
        'setStateCurrentCase',
        'setStateReviewResultState',
        'setResponsibleOnResult',
        'addPendingComment',
        'commmitPendingComment',
        'commmitPendingFinding',
        'addOrSetPendingFinding'
      ]),
      setReviewResultStateOK (reviewResult) {
        let data = { reviewResult: reviewResult, state: ReviewResultState.OK }
        let savedState = reviewResult.state.value
        this.setStateReviewResultState(data)
        this.updateReviewResultState(data).then((response) => {
          // Discard saved state
          savedState = null
        }, (err) => {
          this.errorMessage('Could not communicate with server. Code: ' + err.status)
          data.state = savedState
          this.setStateReviewResultState(data)
        })
      },
      setReviewResultStateNotOK (reviewResult) {
        let responsible = {
          profile_type_id: this.authUser.profile.profileType,
          profile_type_display: this.authUser.profile.profileTypeDisplay
        }
        let data = {
          reviewResult: reviewResult,
          state: ReviewResultState.NOT_OK
        }
        this.addOrSetPendingFinding({ reviewResult: reviewResult, created_by: this.authUser.profile })
        this.setStateReviewResultState(data)
        this.setResponsibleOnResult({ reviewResult: reviewResult, responsible: responsible })
        this.latestFinding = reviewResult
      },
      setReviewResultStatePENDING (reviewResult) {
        let data = { reviewResult: reviewResult, state: ReviewResultState.PENDING }
        let savedState = reviewResult.state.value
        this.setStateReviewResultState(data)
        this.updateReviewResultState(reviewResult).then((response) => {
          // Discard saved state
          savedState = null
        }, () => {
          data.state = savedState
          this.setStateReviewResultState(data)
        })
      },
      saveFindingDescription (reviewResult) {
        this.commmitPendingFinding(reviewResult)
        if (reviewResult.finding.id === null) {
          this.saveFinding(reviewResult)
          return
        }
        this.updateFinding(reviewResult)
      },
      rejectComment (reviewResult) {
        this.addPendingComment({ finding: reviewResult.finding, createdBy: this.authUser.profile })
      },
      approveAll (reviewResults, btn) {
        let resultsStateOK = []
        reviewResults.forEach(result => {
          resultsStateOK.push({
            state: ReviewResultState.getStateByValue(ReviewResultState.OK),
            id: result.id
          })
        })
        let patchData = {
          current: reviewResults,
          reviewResults: resultsStateOK,
          caseId: this.caseId
        }
        this.updateAllReviewResultsState(patchData).then((response) => {
          btn.enable()
        }, (err) => {
          this.errorMessage('Could not communicate with server. Code: ' + err.status)
          btn.enable()
        })
      },
      createCertificate () {
        router.push({ name: 'CreateCertificateView', params: { caseId: this.caseId } })
      }
    },
    created () {
      this.case_specs = caseSpecs
      this.review_results_specs = reviewResultSpecs
      this.setOrRefreshCase(this.caseId)
      this.getReviewResults(this.caseId).then(() => {
        for (let result of this.getReviewResultFindings) {
          if (result.waitingOnReview()) {
            this.addPendingComment({ finding: result.finding, createdBy: this.authUser.profile })
          }
        }
      })
    }
  }
</script>

<style lang="sass" scoped>
  .approve-all-section
    align-items: center
</style>
