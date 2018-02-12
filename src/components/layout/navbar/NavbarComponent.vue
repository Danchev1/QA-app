<template>
  <header>
    <div class="columns is-mobile is-tablet is-desktop is-multiline">
      <div class="column is-3-mobile is-2-tablet is-1-desktop order-2">
        <button class="button navbar-burger" :class="{ 'is-active': isOpen }" @click="toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="column is-12-mobile is-4-tablet is-5-desktop order-1 border-responsive">
        <div class="logo">
          <img src="../../../assets/images/KIWA-logo.png" alt="KIWA">
        </div>
      </div>
        <div class="column is-9-mobile is-6-tablet is-6-desktop order-3">
          <div class="auth-section">
            <action-dropdown-component :actions="actions" class="main-action-bar">
              <hr class="dropdown-divider">
              <div class="dropdown-item language-select">
                <language-select-component></language-select-component>
              </div>
            </action-dropdown-component>
            <span class="sign-as-item">
              <span class="is-hidden-mobile" v-if="authUser.fullName">Signed in as {{ authUser.fullName }}</span>
              <span class="tag is-info label-switched" v-if="isSwitchedProfile">switched</span>
            </span>
          </div>
        </div>
    </div>
  </header>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import ActionDropdownComponent from '@/components/layout/utility/ActionDropdownComponent'
  import LanguageSelectComponent from '@/components/layout/utility/LanguageSelectComponent'

  export default {
    components: {
      LanguageSelectComponent,
      ActionDropdownComponent
    },
    name: 'navbar-component',
    data () {
      return {
        actions: []
      }
    },
    props: {
      isPublic: {
        type: Boolean,
        default: true
      },
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState({
        authUser: state => state.authModule.authUser
      }),
      isSwitchedProfile () {
        if (Object.keys(this.authUser).length > 0) {
          return this.authUser.isSwitchedProfile()
        }
        return false
      }
    },
    methods: {
      ...mapActions([
        'logoutUser',
        'resetProfile'
      ]),
      toggle () {
        this.$emit('toggle', !this.isOpen)
      },
      switchBackTo () {
        this.resetProfile()
      }
    },
    created () {
      if (this.isSwitchedProfile) {
        let switchBackTo = this.switchBackTo
        this.actions.push({
          type: 'ACTION',
          func () {
            switchBackTo()
          },
          text: 'Reset profile'
        })
      }
      if (this.isPublic) {
        this.actions.push({
          type: 'ROUTE',
          route: { name: 'LoginComponent' },
          text: 'Login'
        })
      } else {
        let logoutUser = this.logoutUser
        this.actions.push({
          type: 'ACTION',
          func () {
            logoutUser()
          },
          text: 'Logout'
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  .no-public
    margin-top: 1.1rem
    margin-right: 1em
    vertical-align: middle
    text-align: right
    span
      display: inline-block
      vertical-align: middle

  header
    // for sandwich anime
    position: relative
    min-height: 4.616rem
    background-color: white
    border-bottom: 1px solid #c3cdc8
    box-shadow: 0 2px 5px rgba(10, 10, 10, 0.1)
    -webkit-box-shadow: 0 2px 5px rgba(10, 10, 10, 0.1)

    .navbar-burger
      display: inline-block
      width: 4.616rem
      height: 4.616rem
      border: none
      border-radius: 0
      background: #242829
      span
        width: 16px
        margin-left: -8px
        background-color: #fff
      @media screen and (min-width: 1008px)
        display: inline-block

    .logo
      max-width: 116px
      margin: 0.538em auto 0.4em
      float: none
      @media screen and (min-width: 769px)
        float: right
        margin: 0.738em 0 0.4em

    .border-responsive
      border-bottom: none
      @media screen and (max-width: 769px)
        border-bottom: 1px solid #e0e0e0


    .auth-section
      height: 100%
      vertical-align: middle
      .sign-as-item
        float: right
        height: 100%
        padding-top: 1.43rem
        padding-right: 0.7rem
        border-right: 1px solid #e0e0e0
        vertical-align: middle
      .action-bar
        width: 4.616rem
        height: 4.616rem
        padding-top: 1.2rem
        float: right

  .language-select:hover
    background-color: #fff

</style>
