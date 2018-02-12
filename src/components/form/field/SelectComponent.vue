<template>
  <div class="select-component" v-invalid="validation.is_valid">
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
        <span class="select"
              v-bind:class="getInputClass(validation.is_valid)"
              v-if="!field.properties.input_readonly">
          <select v-model="formData.fields[field.id].value"
                  v-on:change="formData.inputOnChange(field); removeValidation()"
                  v-bind:id="field.id"
                  v-bind:multiple="field.properties.multiple_options"
                  v-bind:name="field.id">
            <option v-for="option in field.properties.options"
                    v-bind:value="option.option_value">
              {{ option.display_name ? option.display_name : option.option_value }}
            </option>
          </select>
        </span>

        <input class="input" type="text" v-else
               v-bind:id="field.id"
               v-bind:name="field.id"
               v-bind:readonly="true"
               v-bind:value="getInputReadonlyValue(formData.fields[field.id].value)">

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

  export default {
    name: 'select-component',
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
      removeValidation () {
        this.validation.is_valid = true
      },
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
      getInputReadonlyValue: function (value) {
        let option = this.field.properties.options.find(option => option.option_value === value)
        return option ? option.display_name : null
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

  span
    width: 100%

  select
    width: 100%

</style>
