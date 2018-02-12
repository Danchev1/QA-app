<template>
  <div class="list-component">
    <div class="columns is-multiline is-mobile"
         v-bind:id="fieldSet.id">
      <ul class="column is-12">
        <li class="form-field"
            v-for="field in fieldSet.fields"
            v-bind:key="field.id">
          <text-component v-if="isTextField(field.type)"
                          v-bind:field="field"
                          v-bind:listMarker="fieldSet.layout.marker"
                          v-bind:formData="formData">
          </text-component>
          <password-component v-if="isPasswordField(field.type)"
                              v-bind:field="field"
                              v-bind:listMarker="fieldSet.layout.marker"
                              v-bind:formData="formData">
          </password-component>
          <number-component v-if="isNumberField(field.type)"
                            v-bind:field="field"
                            v-bind:listMarker="fieldSet.layout.marker"
                            v-bind:formData="formData">
          </number-component>
          <date-component v-if="isDateField(field.type)"
                          v-bind:field="field"
                          v-bind:listMarker="fieldSet.layout.marker"
                          v-bind:formData="formData">
          </date-component>
          <file-component v-if="isFileField(field.type)"
                          v-bind:field="field"
                          v-bind:listMarker="fieldSet.layout.marker"
                          v-bind:formData="formData">
          </file-component>
          <checkbox-component v-if="isCheckboxField(field.type)"
                              v-bind:field="field"
                              v-bind:listMarker="fieldSet.layout.marker"
                              v-bind:formData="formData">
          </checkbox-component>
          <radio-component v-if="isRadioField(field.type)"
                           v-bind:field="field"
                           v-bind:listMarker="fieldSet.layout.marker"
                           v-bind:formData="formData">
          </radio-component>
          <select-component v-if="isSelectField(field.type)"
                            v-bind:field="field"
                            v-bind:listMarker="fieldSet.layout.marker"
                            v-bind:formData="formData">
          </select-component>
          <range-component v-if="isRangeField(field.type)"
                           v-bind:field="field"
                           v-bind:formData="formData">
          </range-component>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import TextComponent from '@/components/form/field/TextComponent'
  import PasswordComponent from '@/components/form/field/PasswordComponent'
  import NumberComponent from '@/components/form/field/NumberComponent'
  import DateComponent from '@/components/form/field/DateComponent'
  import FileComponent from '@/components/form/field/FileComponent'
  import CheckboxComponent from '@/components/form/field/CheckboxComponent'
  import RadioComponent from '@/components/form/field/RadioComponent'
  import SelectComponent from '@/components/form/field/SelectComponent'
  import RangeComponent from '@/components/form/field/RangeComponent'
  import FieldSet from '@/classes/form/FormFieldSet'
  import Field from '@/classes/form/FormField'
  import FormData from '@/classes/form/FormData'

  export default {
    components: {
      RangeComponent,
      TextComponent,
      PasswordComponent,
      NumberComponent,
      DateComponent,
      FileComponent,
      CheckboxComponent,
      RadioComponent,
      SelectComponent
    },
    name: 'list-form-component',
    props: {
      fieldSet: {
        type: FieldSet
      },
      formData: {
        type: FormData
      }
    },
    methods: {
      isTextField: Field.isTextField,
      isPasswordField: Field.isPasswordField,
      isNumberField: Field.isNumberField,
      isDateField: Field.isDateField,
      isFileField: Field.isFileField,
      isCheckboxField: Field.isCheckboxField,
      isRadioField: Field.isRadioField,
      isSelectField: Field.isSelectField,
      isRangeField: Field.isRangeField
    }
  }
</script>

<style lang="sass" scoped>
  .form-field
    margin-bottom: 15px
</style>
