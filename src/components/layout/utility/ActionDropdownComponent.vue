<template>
  <div class="dropdown action-bar"
       v-on-clickaway="away"
       :class="{ 'is-active': isActive }"
       @click="isActive = !isActive">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span class="icon">
          <i class="mdi mdi-dots-horizontal" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <template v-for="action in actions">
          <router-link v-if="action.type === 'ROUTE'" :to="action.route" class="dropdown-item">{{ action.text }}</router-link>
          <div
            class="dropdown-item"
            v-if="action.type === 'ACTION'"
            @click="action.func()">{{ action.text }}
          </div>
        </template>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  import { mixin as clickaway } from 'vue-clickaway'

  export default {
    name: 'action-dropdown-component',
    mixins: [clickaway],
    data () {
      return {
        isActive: false
      }
    },
    props: {
      actions: {
        required: true
      }
    },
    methods: {
      away () {
        this.isActive = false
      }
    }
  }
</script>
<style lang="sass" scoped="">
  .selectable
    cursor: not-allowed
    background-color: #f1f1f1
    opacity: 0.3
</style>
