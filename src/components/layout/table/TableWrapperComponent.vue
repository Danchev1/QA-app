<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <title-component>
        <slot></slot>
      </title-component>
    </div>
    <hide-at :breakpoints="{small: 770}" breakpoint="small" class="column is-12">
      <table class="table is-fullwidth is-hoverless">
        <thead>
          <tr>
            <th v-for="heading in headings">
              {{ heading }}
            </th>
            <th v-if="hasActionSlot"></th>
          </tr>
        </thead>
        <tbody>
          <slot name="row"></slot>
        </tbody>
      </table>
    </hide-at>
    <show-at :breakpoints="{small: 769}" breakpoint="small" class="column is-12">
      <table class="table is-fullwidth is-hoverless">
        <tbody>
        <slot name="row" v-bind="headings"></slot>
        </tbody>
      </table>
    </show-at>
  </div>
</template>

<script>
  import TitleComponent from '@/components/layout/TitleComponent'
  import { showAt, hideAt } from 'vue-breakpoints'

  export default {
    name: 'table-wrapper-component',
    components: {
      TitleComponent,
      showAt,
      hideAt
    },
    props: {
      headings: {
        type: Array,
        required: true
      }
    },
    computed: {
      hasActionSlot () {
        console.log(this.$children)
        return !!this.$slots['td-action']
      }
    }
  }
</script>
