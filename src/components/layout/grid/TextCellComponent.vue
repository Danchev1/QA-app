<template>
  <div class="grid-box">
    <span>{{ label }}</span>
    <span><strong>{{ value }}</strong></span>
  </div>
</template>
<script>

  export default {
    name: 'text-cell-component',
    props: {
      label: {
        type: String,
        required: true
      },
      value: {
      }
    }
  }

</script>
<style lans="sass" scoped>

</style>
