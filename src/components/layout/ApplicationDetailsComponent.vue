<template>
  <table class="table is-fullwidth is-borderless is-hoverless" v-if="documents">
    <thead>
      <tr>
        <th v-for="heading in headings">
          {{ heading }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="document in documents">
        <td v-for="item_key in item_keys">
          <template v-if="item_key === 'filename'">
            <a :href="document.url" download> {{ document[item_key] }}</a>
          </template>
          <template v-else>
            {{ document[item_key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'application-details-component',
    props: {
      headings: {
        type: Array,
        required: true
      },
      documents: {
        type: Array,
        required: true
      },
      item_keys: {
        type: Array,
        required: true
      }
    }
  }
</script>
<style lang="sass" scoped>
  .table tr td:last-child
    @media screen and (max-width: 768px)
      display: none

</style>
