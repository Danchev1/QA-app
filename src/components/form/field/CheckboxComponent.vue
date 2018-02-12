<template>
  <div class="checkbox-component" v-invalid="validation.is_valid">
    <div class="field">
      <div class="control">
        <li v-bind:style="{'list-style-type': listMarker}">
          <label class="checkbox"
                 v-bind:for="field.id">
            <input type="checkbox"
                   v-model="formData.fields[field.id].value"
                   v-on:change="formData.inputOnChange(field); removeValidation()"
                   v-bind:disabled="field.properties.input_readonly"
                   v-bind:id="field.id"
                   v-bind:name="field.id">

            <span class="check"></span>
            <span class="control-label">{{ field.label }}</span>
          </label>
        </li>
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
    name: 'checkbox-component',
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
  li
    list-style-position: inside

</style>
