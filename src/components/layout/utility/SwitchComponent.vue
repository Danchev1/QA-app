<template>
  <label class="switch"
         :class="[size, { 'is-disabled': disabled }]"
         :disabled="disabled"
         :tabindex="disabled ? false : 0"
         @keydown.prevent.enter.space="$refs.label.click()"
         @mousedown="isMouseDown = true"
         @mouseup="isMouseDown = false"
         @mouseout="isMouseDown = false"
         @blur="isMouseDown = false"
         @click.prevent="emitMe">
    <input v-model="newValue"
           type="checkbox"
           :name="name"
           :disabled="disabled"
           :true-value="trueValue"
           :false-value="falseValue">
    <span class="check" :class="[{ 'is-elastic': isMouseDown }, type]"></span>
    <span class="control-label"><slot></slot></span>
  </label>
</template>

<script>
  export default {
    name: 'switch-component',
    props: {
      value: {},
      nativeValue: {},
      disabled: Boolean,
      type: String,
      name: Number,
      size: String,
      trueValue: {
        type: [String, Number, Boolean, Function, Object, Array, Symbol],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean, Function, Object, Array, Symbol],
        default: false
      }
    },
    data () {
      return {
        newValue: this.value,
        isMouseDown: false
      }
    },
    watch: {
      /**
       * When v-model change, set internal value.
       */
      value (value) {
        this.newValue = value
      }
      /**
       * Emit input event to update the user v-model.
       */
    },
    methods: {
      emitMe () {
        this.$emit('clicked', this)
      },
      changeValue () {
        this.newValue = !this.newValue
      }
    }
  }
</script>
<style lang="sass" scoped>

</style>
