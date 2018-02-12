<template>
  <div class="columns is-multiline is-variable is-mobile is-5">
    <div class="column" :class="columnClasses" v-for="result in reviewResults" :key="result.id">
      <review-cell-component :label="result.getLabel()"
                             :value="result.getValue()">
        <div class="is-pulled-right review-actions">
          <button class="button check-pending is-outlined radius-circle is-success"
                  @click="$emit('stateOK', result)"
                  v-if="result.isPending()|result.isNotOK()">
                   <span class="icon is-medium">
                    <i class="mdi mdi-check check-icon"></i>
                   </span>
          </button>
          <button class="button check-ok radius-circle is-success"
                  @click="$emit('statePENDING', result)"
                  v-if="result.isOK()">
                   <span class="icon is-medium">
                    <i class="mdi mdi-check check-icon"></i>
                   </span>
          </button>
          <button class="button check is-outlined radius-circle is-danger"
                  v-if="result.isPending()|result.isOK()"
                  @click="$emit('stateNotOK', result)">
             <span class="icon is-medium">
              <i class="mdi mdi-close check-icon"></i>
             </span>
          </button>
          <button class="button check not-ok radius-circle is-danger"
                  v-if="result.isNotOK()"
                  @click="$emit('statePENDING', result)">
             <span class="icon is-medium">
              <i class="mdi mdi-close check-icon"></i>
             </span>
          </button>
        </div>
      </review-cell-component>
    </div>
  </div>
</template>
<script>
  import ReviewCellComponent from './ReviewCellComponent.vue'

  export default {
    components: { ReviewCellComponent },
    name: 'review-auditor-grid-component',
    props: {
      reviewResults: {
        type: Array,
        required: true
      },
      columnClasses: {
        type: String,
        default: 'is-6-mobile is-4-tablet is-3-desktop'
      }
    }
  }
</script>
<style lang="sass" scoped>
  .check-icon
    font-size: 1.3em
</style>
