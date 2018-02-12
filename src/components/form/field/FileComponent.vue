<template>
  <div class="file-component" v-invalid="validation.is_valid">
    <div class="field" :class="getFieldClass(field.layout.layout_type)">
      <div class="is-bottom-paddingless" :class="getLabelClass(field.layout.layout_type)">
        <label class="label"
               v-if="field.label"
               :for="field.id">
          <span style="display:list-item; list-style-position: inside"
                :style="{'list-style-type': listMarker}">{{ field.label }}</span>
        </label>
      </div>
      <div class="control is-bottom-paddingless"
           :class="getControlClass(field.layout.layout_type)">
        <div class="file has-name" :class="{ 'has-name': this.fileName }">
          <label class="file-label">
            <input class="file-input"
                   :class="getInputClass(validation.is_valid)"
                   type="file"
                   @change="formData.inputOnChange(field); setFile($event)"
                   :accept="field.properties.accept_file_type"
                   :id="field.id"
                   :name="field.id"
                   :disabled="field.properties.input_readonly">
            <span class="button file-cta is-primary is-outlined">
              <span class="file-icon">
                <i class="mdi mdi-upload"></i>
              </span>
              <span class="file-label">
                Upload
              </span>
          </span>
            <span class="file-name">
              {{ fileName ? fileName : 'choose a file...' }}
            </span>
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
    name: 'file-component',
    data: function () {
      return {
        /* Needed for Live updating invalidation of Input */
        validation: {
          is_valid: true
        },
        fileName: ''
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
      setFile (event) {
        let files = event.target.files
        if (files.length > 0) {
          this.removeValidation()
          this.formData.fields[this.field.id].value = files[0]
          this.fileName = files[0].name
        }
      },
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
          'column is-12-mobile is-3-desktop': layoutType === 'horizontal'
        }
      },
      getControlClass: function (layoutType) {
        return {
          'column is-12-mobile is-9-desktop': layoutType === 'horizontal'
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
  .file-component
    margin-bottom: 1.53rem
</style>
