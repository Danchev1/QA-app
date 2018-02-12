<template>
  <div class="form-component">
    <!-- FieldSets -->
    <template v-if="formDescriptor.fieldSets.length > 0">
      <div class="form-field-set columns"
           v-for="fieldSet in formDescriptor.fieldSets"
           :key="fieldSet.id"
           v-show="fieldSet.isDependenciesSatisfied">
        <field-set-component :fieldSet="fieldSet" :formData="formData">
        </field-set-component>
      </div>
    </template>
  </div>
</template>

<script>
  import FieldSetComponent from './fieldSet/FieldSetComponent.vue'
  import FormDescriptor from '@/classes/form/FormDescriptor'
  import FormData from '@/classes/form/FormData'

  export default {
    components: {
      FieldSetComponent
    },
    name: 'form-component',
    props: {
      formDescriptor: {
        type: FormDescriptor
      },
      formData: {
        type: FormData
      }
    },
    created: function () {
      this.formDescriptor.sortFieldSets()
    }
  }
</script>

<style lang="sass" scoped>
  .form-field-set
    margin-bottom: 27px

</style>
