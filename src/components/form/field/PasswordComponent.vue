<template>
    <div class="password-component" v-invalid="validation.is_valid">
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

        <input class="input"
               v-bind:class="getInputClass(validation.is_valid)"
               type="password"
               v-model="formData.fields[field.id].value"
               v-on:change="formData.inputOnChange(field)"
               v-on:keyup="removeValidation()"
               v-bind:id="field.id"
               v-bind:name="field.id"
               v-bind:placeholder="field.properties.placeholder_hint"
               v-bind:readonly="field.properties.input_readonly">

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
    name: 'password-component',
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
<style lans="sass" scoped="">

</style>
