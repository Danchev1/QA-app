<template>
  <button class="button is-primary" :class="{ 'is-loading': disabled_state}" @click="submit()" :disabled="disabled_state"><slot></slot></button>
</template>
<script>
  export default {
    name: 'submit-btn-component',
    data () {
      return {
        disabled_state: false
      }
    },
    methods: {
      submit () {
        this.disabled_state = true
        this.$emit('submit', this)
      },
      enable () {
        this.disabled_state = false
      }
    }

  }
</script>
