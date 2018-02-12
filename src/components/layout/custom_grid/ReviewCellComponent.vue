<template>
  <div class="grid-box">
    <span>{{ label }}
      <slot></slot>
    </span>
    <span><strong>{{ value }}</strong></span>
  </div>
</template>
<script>
  export default {
    name: 'review-cell-component',
    props: {
      label: {
        type: String,
        required: true
      },
      value: ''
    }

  }
</script>
<style lang="sass">

</style>
