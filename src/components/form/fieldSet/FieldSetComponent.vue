<template>
  <div class="field-set-component column is-12"
       :class="{'form-dependent': fieldSet.dependencies && fieldSet.dependencies.length > 0}">
    <div v-if="fieldSet.dependencies && fieldSet.dependencies.length > 0"
         v-show="fieldSet.isDependenciesSatisfied"
         class="triangle">
      <div class="inner-triangle"></div>
    </div>
    <!-- Title -->
    <title-component v-if="fieldSet.title"
                     class="is-uppercase"
                     :size="fieldSet.layout.title_size"
                     :lineSeparator="fieldSet.layout.title_line_separator">
      {{ fieldSet.title }}
    </title-component>
    <!-- Description -->
    <div v-if="fieldSet.description" class="field-set-description">
      {{ fieldSet.description }}
    </div>
    <!-- Fields -->
    <template v-if="fieldSet.fields.length > 0">
      <template v-if="fieldSet.layout.layout_type === 'list'">
        <list-form-component :fieldSet="fieldSet" :formData="formData"></list-form-component>
      </template>

      <template v-if="fieldSet.layout.layout_type === 'grid'">
        <grid-form-component :fieldSet="fieldSet" :formData="formData"></grid-form-component>
      </template>
    </template>
  </div>
</template>

<script>
  import GridFormComponent from './GridFormComponent'
  import ListFormComponent from './ListFormComponent'
  import TitleComponent from '../../layout/TitleComponent'
  import FieldSet from '@/classes/form/FormFieldSet'
  import FormData from '@/classes/form/FormData'

  export default {
    components: {
      GridFormComponent,
      ListFormComponent,
      TitleComponent
    },
    name: 'field-set-component',
    props: {
      fieldSet: {
        type: FieldSet
      },
      formData: {
        type: FormData
      }
    },
    created: function () {
      this.fieldSet.sortFields()
    }
  }
</script>
<style lang="sass" scoped>
  .field-set-description
    margin-bottom: 1.85em

    hr
      margin-bottom: 0
      font-weight: 400


  .form-dependent
    position: relative
    margin-top: -1.2em
    padding-top: 1.2em
    padding-bottom: 1.2em
    background-color: #fbfcfb
    border: 1px solid #d0e6dc
    .triangle
      position: absolute
      left: 27px
      top: -13px
      z-index: 2
      width: 0
      height: 0
      border-top: 0 solid transparent
      border-bottom: 13px solid #d0e6dc
      border-left: 13px solid transparent
      border-right: 14px solid transparent

      .inner-triangle
        position: relative
        top: 2px
        left: -11px
        width: 0
        height: 0
        border-bottom: 11px solid #f6f9f6
        border-right: 12px solid transparent
        border-left: 11px solid transparent

    .title
      margin-top: 0.7em
      text-transform: uppercase
      color: #6d7470


</style>
