<template>
  <div class="assign-auditor-view">
    <title-component
      class="title"
      v-bind:size="1">
      Assign auditor to Case {{ currentCase.caseNumber }}
    </title-component>
    <div class="content">
      <p>Choose which auditor you would like to assign. A request will<br>
        be sent to the assigned auditor on which they can choose to accept or reject</p>
      <p>Table below lists available auditors.</p>
    </div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Auditor</th>
          <th>Assign</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="auditor in auditors" :key="auditor.id">
          <td>{{ auditor.name}}</td>
          <td>
            <switch-component ref="switch" :name="auditor.id" v-on:clicked="checkSwitches"></switch-component>
          </td>
        </tr>
      </tbody>
    </table>
    <transition
      name="fade"
      appear
      appear-active-class="animated fadeIn"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      :duration="{ enter: 200, leave: 200 }">
      <div class="columns">
        <div class="column is-6">
          <div v-if="error" class="notification is-danger">{{ error }}</div>
        </div>
      </div>
    </transition>
    <transition
      name="fade"
      appear
      appear-active-class="animated fadeIn"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      :duration="{ enter: 200, leave: 200 }">
      <submit-btn-component class="is-uppercase" v-if="requested_auditor" @submit="sendRequest">Send request to auditor</submit-btn-component>
    </transition>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import router from '@/router/administrator'
  import TitleComponent from '@/components/layout/TitleComponent.vue'
  import SwitchComponent from '@/components/layout/utility/SwitchComponent.vue'
  import SubmitBtnComponent from '@/components/layout/utility/SubmitBtnComponent.vue'

  export default {
    name: 'assign-auditor-view',
    data () {
      return {
        requested_auditor: '',
        error: ''
      }
    },
    components: {
      SubmitBtnComponent,
      SwitchComponent,
      TitleComponent
    },
    props: {
      caseId: {
        required: true
      }
    },
    computed: {
      ...mapState({
        auditors: state => state.auditorModule.auditors,
        currentCase: state => state.caseModule.currentCase
      })
    },
    methods: {
      ...mapActions([
        'getAuditors',
        'setOrRefreshCase',
        'saveAuditorRequest'
      ]),
      checkSwitches (switchComponent) {
        let newValue = !switchComponent.newValue
        this.$refs.switch.forEach(item => {
          item.newValue = false
        })
        switchComponent.newValue = newValue
        if (switchComponent.newValue === false) {
          this.requested_auditor = ''
        } else {
          this.requested_auditor = switchComponent.name
        }
      },
      sendRequest (btn) {
        let postData = {
          caseId: this.caseId,
          auditorId: this.requested_auditor
        }
        this.saveAuditorRequest(postData).then((response) => {
          btn.enable()
          router.push({ name: 'CaseView', params: { caseId: this.caseId } })
        }, (err) => {
          this.error = err.message
          btn.enable()
        })
      }
    },
    created () {
      this.getAuditors()
      this.setOrRefreshCase(this.caseId)
    }
  }
</script>
<style lang="sass" scoped="">

</style>
