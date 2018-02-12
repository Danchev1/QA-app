<template>
  <div class="documents-view">
    <application-details-component v-if="documents" :item_keys="item_keys" :headings="headings" :documents="documents"></application-details-component>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import ApplicationDetailsComponent from '@/components/layout/ApplicationDetailsComponent'

  export default {
    components: { ApplicationDetailsComponent },
    name: 'documents-view',
    data () {
      return {
        headings: ['Documents', 'Filename', 'Uploaded at'],
        item_keys: ['documentInfo', 'filename', 'uploadDate']
      }
    },
    computed: {
      ...mapState({
        documents: state => state.profileModule.customerProfile.documents
      })
    }
  }
</script>
<style lang="sass" scoped>

</style>
