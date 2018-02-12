<template>
  <div class="columns is-multiline is-variable is-mobile is-5">
    <cell-component
      v-for="item in content"
      :key="item.item_key"
      :item="item"
      :detailObject="detailObject">
    </cell-component>
  </div>
</template>
<script>
  import CellComponent from './CellComponent'

  export default {
    components: { CellComponent },
    name: 'grid-details-component',
    props: {
      content: {
        type: Array,
        required: true
      },
      detailObject: {
        type: Object,
        required: true
      }
    }
  }
</script>
<style lang="sass" scoped>

</style>
