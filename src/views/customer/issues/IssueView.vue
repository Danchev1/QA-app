<template>
  <div class="flex-table-row">
    <div class="flex-table-row-item" data-heading="TODO">{{ issue.title}}</div>
    <div class="flex-table-row-item" data-heading="Description">
      <div class="flex-table-row-item">{{ issue.message }}</div>
      <div class="flex-table-row-item">
        <button class="button is-success is-outlined" @click="toggleModal()">Fix Now!</button>
      </div>
    </div>
    <card-modal-component v-bind:show="show_modal"
                          @deactivate="toggleModal()"
                          transition="fade"
                          ref="modal"
                          title="Resolve issue">
      <p slot="card-content">{{ issue.message }}</p>
      <form-component v-for="formDescriptor in issue.formDescriptors"
                      slot="card-content"
                      v-if="issue.formDatas"
                      v-bind:formDescriptor="formDescriptor"
                      v-bind:formData="getFormDataForDescriptor(issue, formDescriptor)"
                      v-bind:key="formDescriptor.id">
      </form-component>
      <transition
        name="fade"
        appear
        appear-active-class="animated fadeIn"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        :duration="{ enter: 200, leave: 200 }">
        <div v-if="error" class="notification is-danger">
          {{ error }}
        </div>
      </transition>
      <div class="field is-grouped" slot="card-footer">
        <div class="control">
          <submit-btn-component slot="card-footer" @submit="submitForm">Save</submit-btn-component>
        </div>
        <div class="control">
          <button class="button is-danger is-outlined" slot="card-footer" @click="toggleModal()">Cancel</button>
        </div>
      </div>
    </card-modal-component>
  </div>
</template>
<script>
  import { mapActions, mapMutations } from 'vuex'
  import CardModalComponent from '@/components/layout/modal/CardModalComponent'
  import FormComponent from '@/components/form/FormComponent'
  import SubmitBtnComponent from '@/components/layout/utility/SubmitBtnComponent'
  import { InvalidDataError, NoDataError } from '@/classes/errors'

  export default {
    name: 'issue-view',
    components: {
      SubmitBtnComponent,
      CardModalComponent,
      FormComponent
    },
    data () {
      return {
        error: '',
        show_modal: false
      }
    },
    props: {
      issue: {
        type: Object,
        required: true
      }
    },
    methods: {
      ...mapActions([
        'updateIssueForm',
        'getCases',
        'errorMessage',
        'successMessage'
      ]),
      ...mapMutations([
        'removeIssue'
      ]),
      toggleModal () {
        this.show_modal = !this.show_modal
      },
      getFormDataForDescriptor (issue, formDescriptor) {
        return issue.formDatas.find(formData => formDescriptor.id === formData.formDescriptorId)
      },
      submitForm (btn) {
        this.error = ''
        this.updateIssueForm(this.issue).then((response) => {
          this.show_modal = false
          this.$refs.modal.closeModal().then((response) => {
            this.removeIssue(this.issue)
          })
          this.getCases()
          this.successMessage('Issue is resolved')
        }).catch((err) => {
          btn.enable()
          if (err.name === InvalidDataError.NAME) {
            return
          }
          if (err.name === NoDataError.NAME) {
            this.error = 'No information added'
            return
          }
          if (err.status === 500) {
            this.errorMessage('Could not communicate with server. Code: ' + err.status)
            return
          }
          this.handleResponseInvalidSyntax(err.data)
        })
      },
      handleResponseInvalidSyntax: function (responseData) {
        if (Array.isArray(responseData)) {
          this.formDatas.forEach(formData => {
            formData.handleInvalidResponse(responseData)
          })
        }
        if (responseData.non_field_errors) {
          this.error = responseData.non_field_errors.join(', ')
        }
      }
    }
  }
</script>
<style lang="sass" scoped>

</style>
