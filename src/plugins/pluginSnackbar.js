import Snackbar from '@/components/snackbar'

const pluginSnackbar = {
  install (Vue) {
    Vue.prototype.$snackbar = Snackbar
  }
}

export default pluginSnackbar
