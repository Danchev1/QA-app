<template>
  <div class="grid-box">
    <span>{{ label }}</span>
    <status-component :level="state_object.level" :display="state_object.display"></status-component>
  </div>
</template>
<script>
  import StatusComponent from '../utility/StatusComponent.vue'
  export default {
    name: 'status-cell-component',
    components: {
      StatusComponent
    },
    props: {
      label: {
        type: String,
        required: true
      },
      state_object: {
        type: Object,
        required: true
      }
    }
  }

</script>
<style lang="sass" scoped>

</style>
