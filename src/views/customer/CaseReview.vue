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
            v-if="currentCase.customer"
            v-bind:size="2"
            v-bind:lineSeparator="'under'">
            Customer
          </title-component>
          <review-customer-grid-component
            v-if="customerReviewResults.length > 0"
            v-bind:reviewResults="customerReviewResults"
            v-bind:columnClasses="'is-12-mobile is-6-tablet is-6-desktop'"
            v-on:showFinding="showLatestFinding($event)">
          </review-customer-grid-component>
          <title-component
            v-if="serviceReviewResults.length > 0"
            v-bind:size="2"
            v-bind:lineSeparator="'under'">
            Certification
          </title-component>
          <review-customer-documents-component
            v-if="serviceReviewResults.length > 0"
            :headings="headings"
            :reviewDocuments="serviceReviewResults"
            v-on:showFinding="showLatestFinding($event)">
          </review-customer-documents-component>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns is-multilined">
        <div class="column is-12">
          <tabs animation="fade" :only-fade="true">
            <tab-pane label="Findings">
              <template v-if="findingsForResponsibleCustomer.length > 0">
                <div class="is-divider" data-content="Waiting on customer"></div>
                <collapse-component accordion is-fullwidth>
                  <collapse-item
                    v-for="result in findingsForResponsibleCustomer"
                    ref="collapseItem"
                    v-bind="{ itemId: result.id }"
                    :key="result.id"
                    :title="result.getLabel()">
                    <!-- Finding is waiting for customer to respond -->
                    <div class="field">
                      <label class="label">Description:</label>
                      <div class="control">
                        {{result.finding.description}}
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <em>Author: {{result.finding.createdBy.name}}</em>
                        <span class="is-pulled-right">{{result.finding.modified}}</span>
                      </div>
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

                    <div class="field">
                      <label class="label">Resolve non-conformity:</label>
                      <div class="control">
                        <form-component v-bind:formDescriptor="result.formDescriptor"
                                        v-bind:formData="result.formData">
                        </form-component>
                        <label class="label">Comment (optional):</label>
                        <textarea class="textarea" v-if="result.finding.hasPendingComment()" v-model="result.finding.pendingComment.text" cols="30" rows="5"></textarea>
                      </div>
                    </div>

                    <div class="field is-grouped">
                      <div class="control">
                        <button class="button is-success" @click="saveReviewResult(result)">Save</button>
                      </div>
                    </div>
                  </collapse-item>
                </collapse-component>
              </template>
              <template v-if="findingsForResponsibleAuditor.length > 0">
                <div v-if="findingsForResponsibleAuditor.length > 0" class="is-divider divider-is-blue" data-content="Waiting on auditor"></div>
                <collapse-component accordion is-fullwidth>
                  <collapse-item
                    v-for="result in findingsForResponsibleAuditor"
                    ref="collapseItem"
                    v-bind="{ itemId: result.id }"
                    :key="result.id"
                    :title="result.getLabel()">
                    <!-- Finding resolved by customer and waiting for auditor to accept or reject -->
                    <div v-if="result.waitingOnAuditor()">
                      <div class="field">
                        <label class="label">Description:</label>
                        <div class="control">
                          {{result.finding.description}}
                        </div>
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
              </template>
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
  import ReviewCustomerGridComponent from '@/components/layout/custom_grid/ReviewCustomerGridComponent'
  import CollapseComponent from '@/components/layout/collapse/Collapse'
  import CollapseItem from '@/components/layout/collapse/Item'
  import ReviewCustomerDocumentsComponent from '@/components/layout/ReviewCustomerDocumentsComponent'
  import FormComponent from '@/components/form/FormComponent'
  import StatusComponent from '@/components/layout/utility/StatusComponent'
  import IconComponent from '@/components/layout/utility/IconComponent'
  import CommentComponent from '@/components/layout/utility/CommentComponent'
  import ProfileType from '@/classes/case/ProfileType'

  export default {
    name: 'case-review',
    data () {
      return {
        headings: ['Documents', 'Filename', 'Uploaded at'],
        activeTab: 1,
        case_specs: [],
        review_results_specs: []
      }
    },
    props: {
      caseId: {
        required: true
      }
    },
    components: {
      StatusComponent,
      FormComponent,
      Tabs,
      CommentComponent,
      TabPane,
      CollapseComponent,
      CollapseItem,
      TitleComponent,
      GridDetailsComponent,
      ReviewCustomerGridComponent,
      ReviewCustomerDocumentsComponent,
      IconComponent
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
      }
    },
    methods: {
      ...mapActions([
        'setOrRefreshCase',
        'getReviewResults',
        'updateReviewResultFormData',
        'saveComment'
      ]),
      ...mapMutations([
        'setStateCurrentCase',
        'addOrSetPendingFinding',
        'setStateReviewResultState',
        'setResponsibleOnFinding',
        'setResponsibleOnResult',
        'addPendingComment',
        'commmitPendingComment'
      ]),
      showLatestFinding (reviewResult) {
        this.$refs.collapseItem.forEach(collapseItem => {
          if (collapseItem.$attrs.itemId === reviewResult.id) {
            collapseItem.toggle()
          }
        })
      },
      saveReviewResult (reviewResult) {
        let comment = reviewResult.finding.pendingComment
        if (comment.text) {
          let postData = { finding: reviewResult.finding, comment: comment.text }
          this.saveComment(postData).then((response) => {
            this.updateReviewResultFormData(reviewResult).then((response) => {
              // Discard saved state
            })
          }, (err) => {
            console.log(err)
          })
        } else {
          this.updateReviewResultFormData(reviewResult).then((response) => {
            // Discard saved state
          })
        }
      }
    },
    created () {
      this.case_specs = caseSpecs
      this.review_results_specs = reviewResultSpecs
      this.setOrRefreshCase(this.caseId)
      this.getReviewResults(this.caseId).then(() => {
        for (let result of this.getReviewResultFindings) {
          this.addPendingComment({ finding: result.finding, owner: this.authUser.profile })
        }
      })
    }
  }
</script>

<style lang="sass" scoped>
</style>
