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
          <a v-if="result.getDownloadURL()" :href="result.getDownloadURL()" target="_blank" download>
            {{ result.getValue() }}
          </a>
        </td>
        <td v-if="result.getUploadedDate()">
          {{ result.getUploadedDate() }}
        </td>
        <td>
          <div class="is-pulled-right review-actions customer" v-if="result.isNotOK()">
            <button class="button check is-outlined radius-circle" :class="[ result.finding.hasAnsweredFinding() ? 'is-info' : 'is-danger' ]"
                    @click="$emit('showFinding', result)">
             <span class="icon is-medium">
              <i class="mdi mdi-exclamation"></i>
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
    name: 'review-customer-documents-component',
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
