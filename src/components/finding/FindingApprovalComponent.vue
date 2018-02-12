<template>
  <div class="finding">
    <div class="field">
      <label class="label">Description:</label>
      <p>
        {{result.finding.description}}
      </p>
    </div>
    <hr/>
    <div class="comments-section">
      <title-component
        v-if="result.finding.hasComments() || result.finding.hasPendingComment()"
        v-bind:size="4"
        v-bind:lineSeparator="'under'">
        Comments
      </title-component>
      <comment-component
        v-if="result.finding.hasComments()"
        v-for="comment in result.finding.comments"
        :key="comment.id"
        :class="{ 'auditor-comment': comment.createdBy.isAuditor(), 'customer-comment': comment.createdBy.isCustomer()}"
        :comment="comment">
      </comment-component>
    </div>
    <div class="field" v-if="result.finding.hasPendingComment()">
      <label class="label">Comment:</label>
      <div class="control">
        <textarea class="textarea" :class="{ 'is-danger': !is_valid }"
                  v-on:keyup="removeValidation()"
                  v-model="result.finding.pendingComment.text"
                  cols="30" rows="5" placeholder="Reject comment">
        </textarea>
        <p class="help is-danger"
           v-if="!is_valid">
          Rejection comment is required!
        </p>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success is-outlined" @click="setReviewResultStateOK(result)">Approve</button>
      </div>
      <div class="control is-right">
        <button class="button is-danger is-outlined" @click="commitRejection(result)">Reject</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex'
  import ProfileType from '@/classes/case/ProfileType'
  import TitleComponent from '@/components/layout/TitleComponent'
  import CommentComponent from '@/components/layout/utility/CommentComponent'
  import { ReviewResultState } from '@/classes/case/ReviewResult'

  export default {
    name: 'finding-approval-component',
    data () {
      return {
        is_valid: true
      }
    },
    props: {
      result: {
        required: true
      }

    },
    components: {
      TitleComponent,
      CommentComponent
    },
    methods: {
      ...mapActions([
        'saveRejectComment',
        'updateReviewResultState'
      ]),
      ...mapMutations([
        'setResponsibleOnResult',
        'setStateReviewResultState'
      ]),
      setReviewResultStateOK (reviewResult) {
        let data = { reviewResult: reviewResult, state: ReviewResultState.OK }
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
      commitRejection (reviewResult) {
        if (reviewResult.finding.pendingComment.text) {
          let responsible = {
            profile_type_id: ProfileType.CUSTOMER,
            profile_type_display: ProfileType.getProfileTypeDisplay(ProfileType.CUSTOMER)
          }
          this.setResponsibleOnResult({ reviewResult: reviewResult, responsible: responsible })
          let comment = reviewResult.finding.pendingComment
          let postData = {
            finding: reviewResult.finding,
            comment: comment.text,
            responsible: responsible
          }
          this.saveRejectComment(postData).then((response) => {
            console.log(response)
          }, (err) => {
            console.log(err)
          })
        } else {
          this.is_valid = false
        }
      },
      removeValidation () {
        this.is_valid = true
      }
    }
  }
</script>
