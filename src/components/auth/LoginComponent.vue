<template>
  <div class="login-component">
    <div class="center-inner">
      <div class="login-box">
        <div class="login-form">
          <title-component
            class="has-text-centered login-title"
            v-bind:size="2"
            v-bind:lineSeparator="'under'"
            v-translate>
            Login
          </title-component>
          <div class="field">
            <p class="control">
              <input class="input" v-translate type="text" :placeholder="'Username' | translate" v-model="user">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" v-translate type="password" :placeholder="'Password' | translate" v-model="password">
            </p>
          </div>
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
          <div class="field">
            <p class="control">
              <submit-btn-component class="login-button is-large is-uppercase" @submit="submitForm" v-translate>Login</submit-btn-component>
            </p>
          </div>
        </div>
      </div>

      <div id="info-box" v-if="logLevel <= logLevels.DEBUG">
        <p>Current process Environemt: <strong>{{ processEnvironment }}</strong></p>
        <p>Use mock data: <strong>{{ useMockData }}</strong></p>
        <hr/>
        <div v-if="useMockData">
          <p>All API calls are currently mocked.</p>
          <p>Log in possible by using these usernames:</p>
          <div class="login-list">
            <ul>
              <li><strong>1</strong> (as Manager)</li>
              <li><strong>2</strong> (as Auditor)</li>
              <li><strong>3</strong> (as Administrator)</li>
              <li><strong>4</strong> (as Customer)</li>
            </ul>
          </div>
        </div>
        <div v-else-if="!useMockData">
          <p>All API calls are currently active.</p>
          <p>Log in possible by using IDUN Django accounts.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { PROCESS_ENVIRONMENT, USE_MOCK_DATA, LOG_LEVELS, LOG_LEVEL } from '@/api/config'
  import TitleComponent from '../layout/TitleComponent.vue'
  import { onKeyEnterMixin } from '@/mixins/mixins'
  import SubmitBtnComponent from '@/components/layout/utility/SubmitBtnComponent.vue'

  export default {
    mixins: [onKeyEnterMixin],
    components: {
      TitleComponent,
      SubmitBtnComponent
    },
    name: 'login-component',
    data: function () {
      return {
        user: null,
        password: null,
        error: '',
        processEnvironment: PROCESS_ENVIRONMENT,
        useMockData: USE_MOCK_DATA,
        logLevels: LOG_LEVELS,
        logLevel: LOG_LEVEL
      }
    },
    methods: {
      ...mapActions([
        'loginUser'
      ]),
      submitForm (btn) {
        let loginRequest = {
          username: this.user,
          password: this.password
        }
        this.loginUser(loginRequest).then((err) => {
          btn.enable()
          this.handleResponseInvalidSyntax(err.response.data)
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

  .login-component
    width: 100%
    max-width: 430px
    min-height: 100%
    padding: 2rem 1rem 1rem
    margin: 0 0 0 auto
    border-top: 1px solid #e6e6e6
    border-right: none
    border-bottom: none
    border-left: none
    background: white
    box-shadow: none
    @media screen and (max-width: 450px)
      max-width: 100%

    .login-box
      width: 100%
      margin-bottom: 20px

    .login-form
      margin: 15px

    .login-title
      margin-bottom: 3rem

    .login-button
      margin-bottom: 10px

    #info-box
      width: 100%
      text-align: center

    .info-box .login-list
      padding-left: 150px

    .info-box > ul, li
      text-align: left

  .center-inner
    width: 100%
    max-width: 360px
    margin: 0 auto

</style>
