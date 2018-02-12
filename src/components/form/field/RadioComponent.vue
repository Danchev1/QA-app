<template>
  <div class="radio-component" v-invalid="validation.is_valid">
    <div class="field">
      <label class="label"
             v-if="field.label"
             v-bind:for="field.id">
        <strong class="has-text-grey">{{ field.label }}</strong>
      </label>
      <div class="control">
        <ul v-if="field.layout.layout_type === 'vertical'"
            v-bind:style="{'list-style-type': listMarker}">
          <li v-for="option in field.properties.options">
            <label class="radio"
                   ref="label">
              <input type="radio"
                     v-model="formData.fields[field.id].value"
                     v-on:change="formData.inputOnChange(field); removeValidation()"
                     v-bind:id="option.id"
                     v-bind:name="field.id"
                     v-bind:value="option.option_value"
                     v-bind:disabled="field.properties.input_readonly">
              <span class="check"></span>
              <span class="control-label">{{ option.display_name ? option.display_name : option.option_value }}</span>
            </label>
          </li>
        </ul>

        <div v-if="field.layout.layout_type === 'horizontal'">
          <label class="radio"
                 v-for="option in field.properties.options">
            <input type="radio"
                   v-model="formData.fields[field.id].value"
                   v-on:change="formData.inputOnChange(field); removeValidation()"
                   v-bind:id="option.id"
                   v-bind:name="field.id"
                   v-bind:value="option.option_value"
                   v-bind:disabled="field.properties.input_readonly">
            <span class="check"></span>
            <span class="control-label">{{ option.display_name ? option.display_name : option.option_value }}</span>
          </label>
        </div>

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
    name: 'radio-component',
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
      }
    },
    mounted: function () {
      this.validation = this.formData.validations[this.field.id]
    }
  }
</script>

<style lang="sass" scoped>
  .label
    margin-bottom: 1em

  ul
    list-style-position: inside
    li
      margin-bottom: 1.53rem


</style>
