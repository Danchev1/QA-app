export let onKeyEnterMixin = {
  methods: {
    onEnter (e) {
      if (e.keyCode === 13) {
        this.submitForm()
      }
    }
  },
  created () {
    window.addEventListener('keydown', this.onEnter)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.onEnter)
  }
}

