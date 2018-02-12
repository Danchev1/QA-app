<template>
  <div class="range-component" v-invalid="validation.is_valid">
    <div class="field" v-bind:class="getFieldClass(field.layout.layout_type)">
      <label class="label"
             v-if="field.label"
             v-bind:class="getLabelClass(field.layout.layout_type)"
             v-bind:for="field.id">
        <span v-bind:style="{'list-style-type': listMarker}">
          {{ field.label }}
        </span>
      </label>
      <div class="control"
           v-bind:class="getControlClass(field.layout.layout_type)">
        <range-slider-component :piecewise="true"
                                :piecewiseLabel="true"
                                :min="1" :max="5"
                                :interval="1" :height="3"
                                :data="['1','2','3','4','5']"
                                v-model="formData.fields[field.id].value"
                                v-on:input="formData.inputOnChange(field)"
                                v-bind:id="field.id"
                                v-bind:name="field.id"
                                v-bind:readonly="field.properties.input_readonly">
        </range-slider-component>
        <p class="help is-danger"
           v-if="!validation.is_valid">
          {{ validation.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import FormField from '@/classes/form/FormField'
  import FormData from '@/classes/form/FormData'
  import RangeSliderComponent from '@/components/layout/range_slider/RangeSliderComponent'

  export default {
    components: { RangeSliderComponent },
    name: 'range-component',
    data: function () {
      return {
        /* Needed for Live updating invalidation of Input */
        validation: {
          is_valid: true
        }
      }
    },
    props: {
      field: {
        type: FormField
      },
      listMarker: {
        type: String,
        default: 'none'
      },
      formData: {
        type: FormData
      }
    },
    methods: {
      getFieldClass: function (layoutType) {
        return {
          'columns is-multiline is-mobile': layoutType === 'horizontal'
        }
      },
      getLabelClass: function (layoutType) {
        return {
          'column is-4': layoutType === 'horizontal'
        }
      },
      getControlClass: function (layoutType) {
        return {
          'column is-8': layoutType === 'horizontal'
        }
      }
    },
    mounted () {
      this.validation = this.formData.validations[this.field.id]
    }
  }
</script>

<style lang="sass" scoped>

  label > li
    list-style-position: inside


</style>
