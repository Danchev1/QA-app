<template>
  <div
    class="title is-spaced"
    v-bind:class="getTitleClass(size, lineSeparator)">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'title-component',
    props: {
      size: {
        type: Number,
        default: 3
      },
      lineSeparator: {
        type: String,
        default: ''
      }
    },
    methods: {
      getTitleClass: function (size, lineSeparator) {
        return 'line-' + lineSeparator + ' is-' + size
      }
    }
  }
</script>

<style lang="sass" scoped>

  table
    margin-top: -20px
    margin-bottom: -15px

    .title-td
      width: 1px
      padding: 0 10px 0 0
      white-space: nowrap
      vertical-align: middle

    .title-td span
      vertical-align: middle


</style>
