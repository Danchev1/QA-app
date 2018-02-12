<template>
  <div class="date-component" v-invalid="validation.is_valid">
    <div class="field" v-bind:class="getFieldClass(field.layout.layout_type)">
      <label class="label"
             v-if="field.label"
             v-bind:class="getLabelClass(field.layout.layout_type)"
             v-bind:for="field.id">
        <span v-bind:style="{'list-style-type': listMarker}">{{ field.label }}</span>
      </label>
      <div class="control has-icons-right"
           v-bind:class="getControlClass(field.layout.layout_type)">
        <datepicker-component
          v-model="formData.fields[field.id].value"
          v-on:change="formData.inputOnChange(field)"
          v-bind:id="field.id"
          v-bind:name="field.id"
          v-bind:readonly="field.properties.input_readonly"
          v-bind:max="field.properties.max_value"
          v-bind:min="field.properties.min_value"
          placeholder=""
          :config="{ dateFormat: 'd-m-Y', static: false }">
        </datepicker-component>
        <span class="icon is-medium-icon is-right">
         <i class="mdi mdi-calendar"></i>
         </span>
        <p class="help is-danger"
           v-if="!validation.is_valid">
          {{ validation.message }}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  import DatepickerComponent from '../../layout/datepicker/index'
  import FormField from '@/classes/form/FormField'
  import FormData from '@/classes/form/FormData'

  export default {
    name: 'date-component',
    components: {
      DatepickerComponent
    },
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
      },
      getInputClass: function (isValid) {
        return {
          'is-danger': !isValid
        }
      }
    },
    mounted: function () {
      this.validation = this.formData.validations[this.field.id]
    }
  }
</script>

<style lang="sass" scoped>
  label > li
    list-style-position: inside

</style>
