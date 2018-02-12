<template>
  <div class="columns is-multiline is-variable is-mobile is-5">
    <div class="column" :class="columnClasses" v-for="result in reviewResults" :key="result.id">
      <review-cell-component :label="result.getLabel()"
                             :value="result.getValue()">
        <div class="is-pulled-right review-actions customer" v-if="result.isNotOK()">
          <button class="button check is-outlined radius-circle" :class="[ result.finding.hasAnsweredFinding() ? 'is-info' : 'is-danger' ]"
                  @click="$emit('showFinding', result)">
             <span class="icon is-medium">
              <i class="mdi mdi-exclamation"></i>
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
    name: 'review-customer-grid-component',
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
<style lang="sass" scoped></style>
