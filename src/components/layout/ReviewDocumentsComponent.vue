<template>
  <table class="table is-fullwidth is-borderless is-hoverless">
    <thead>
      <tr>
        <th v-for="heading in headings" :class="{ 'firstHeading': heading === 'Documents' }">
          {{ heading }}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in reviewDocuments">
        <td>
          {{ result.getLabel() }}
        </td>
        <td>
          <a v-if="result.getValue" :href="result.getDownloadURL()" target="_blank" download>
            {{ result.getValue() }}
          </a>
        </td>
        <td>
          {{ result.getUploadedDate() }}
        </td>
        <td>
          <div class="is-pulled-right review-actions">
            <button class="button check-pending is-outlined radius-circle is-success"
                    @click="$emit('stateOK', result)"
                    v-if="result.isPending()|result.isNotOK()">
                   <span class="icon is-medium">
                    <i class="mdi mdi-check"></i>
                   </span>
            </button>
            <button class="button check-ok radius-circle is-success"
                    @click="$emit('statePENDING', result)"
                    v-if="result.isOK()">
                   <span class="icon is-medium">
                    <i class="mdi mdi-check"></i>
                   </span>
            </button>
            <button class="button check is-outlined radius-circle is-danger"
                    v-if="result.isPending()|result.isOK()"
                    @click="$emit('stateNotOK', result)">
             <span class="icon is-medium">
              <i class="mdi mdi-close"></i>
             </span>
            </button>
            <button class="button check not-ok radius-circle is-danger"
                    v-if="result.isNotOK()"
                    @click="$emit('statePENDING', result)">
             <span class="icon is-medium">
              <i class="mdi mdi-close"></i>
             </span>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'review-documents-component',
    props: {
      headings: {
        type: Array,
        required: true
      },
      reviewDocuments: {
        type: Array,
        required: true
      }
    }
  }
</script>
<style lang="sass" scoped>
  .firstHeading
    width: 24%

  td
   a
    @media screen and (max-width: 1150px)
        white-space: nowrap
        overflow: hidden
        display: inline-block
        text-overflow: ellipsis
        width: 76px
</style>
