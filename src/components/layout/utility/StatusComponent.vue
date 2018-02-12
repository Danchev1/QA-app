<template>
  <span class="tag" :class="stateClass">{{ display }}</span>
</template>
<script>
  import State from '@/classes/case/State'

  export default {
    name: 'status-component',
    props: {
      display: {
        type: String,
        required: true
      },
      level: {
        type: Number,
        required: true
      }
    },
    computed: {
      stateClass: function () {
        return State.getStateClass(this.level)
      }
    }
  }
</script>
<style lang="sass" scoped>

</style>
