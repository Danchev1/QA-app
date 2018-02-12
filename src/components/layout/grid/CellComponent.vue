<template>
  <div class="column is-6-mobile is-4-tablet is-3-desktop">
    <status-cell-component v-if="item.component === 'STATUS'" :label="item.label" :state_object="getValue(item.item_key)"></status-cell-component>
    <text-cell-component v-else :label="item.label" :value="getValue(item.item_key)"></text-cell-component>
  </div>
</template>
<script>
  import TextCellComponent from './TextCellComponent.vue'
  import StatusCellComponent from './StatusCellComponent.vue'

  export default {
    components: {
      StatusCellComponent,
      TextCellComponent
    },
    name: 'cell-component',
    props: {
      item: {
        type: Object,
        required: true,
        validator: (item) => {
          return item.hasOwnProperty('item_key')
        }
      },
      detailObject: {
        type: Object,
        required: true
      }
    },
    methods: {
      getValue (key) {
        let keys = key.split('.')
        let value = this.detailObject
        for (let key of keys) {
          if (!value || !value.hasOwnProperty(key)) {
            return this.item.value
          }
          value = value[key]
        }
        return value
      }
    }
  }
</script>
<style lang="sass" scoped>
  .is-bold
    font-weight: 700
</style>
