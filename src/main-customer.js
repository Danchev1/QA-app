require('./assets/sass/style.sass')
require('./assets/sass/animate_override/animate_override.scss')
import Vue from 'vue'
import GetTextPlugin from 'vue-gettext'
import translations from './translations/translations.js'
import router from './router/customer'
import store from './store/customer'
import { mapState, mapMutations } from 'vuex'
import pluginSnackbar from '@/plugins/pluginSnackbar'
import NavbarComponent from './components/layout/navbar/NavbarComponent.vue'
import HamburgerNavigation from './components/layout/navbar/HamburgerNavigation.vue'
import { API_ROOT } from '@/api/config'

Vue.config.productionTip = false
process['API_ENDPOINT'] = `${API_ROOT}/customer`
Vue.use(pluginSnackbar)
Vue.use(GetTextPlugin, {
  availableLanguages: {
    en_GB: 'British English',
    sv: 'Svenska'
  },
  defaultLanguage: 'sv',
  translations: translations,
  silent: true
})

Vue.filter('translate', (value) => {
  return !value ? '' : Vue.prototype.$gettext(value.toString())
})

/* eslint-disable no-new */
new Vue({
  template: ` 
  <div id="main-customer">
    <navbar-component :isPublic="isPublic" :isOpen="isOpen" @toggle="isOpen = $event" />
    <div class="contained">
      <hamburger-navigation :items="navbarItems" :isOpen="isOpen" @toggle="isOpen = $event"/>
        <div class="main-container" :class="{ isOpen: isOpen }" @click="closeCondition()">
        <section class="section">
          <router-view class="container main-view"></router-view>  
        </section>
      </div>
    </div>
  </div>`,
  router,
  store,
  components: {
    NavbarComponent,
    HamburgerNavigation
  },
  data: function () {
    return {
      navbarItems: [
        {
          destination: '/',
          text: 'Dashboard',
          exact: true
        },
        {
          destination: '/profile',
          text: 'Customer information',
          exact: false
        },
        {
          destination: '/certificates',
          text: 'Certificates list',
          exact: true
        }
      ],
      isPublic: false,
      isOpen: false
    }
  },
  computed: {
    ...mapState({
      messages: state => state.messageModule.messages
    })
  },
  methods: {
    ...mapMutations([
      'removeStateMessages'
    ]),
    closeCondition () {
      if (document.documentElement.clientWidth <= 1125) {
        this.isOpen = false
      }
    }
  },
  created () {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'setStateMessages' || mutation.type === 'setDefaultStateMessage') {
        let removed = []
        for (let message of this.messages) {
          this.$snackbar.open(message)
          removed.push(message)
        }
        this.removeStateMessages(removed)
      }
    })
  }
}).$mount('#app')
