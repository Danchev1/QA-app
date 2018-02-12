<template>
  <div class="columns is-multiline is-mobile">
    <div class="column is-12">
      <div class="tabs">
        <ul>
          <template v-for="tab in tabs">
            <router-link :to="tab.route" tag="li" active-class="is-active" exact><a>{{ tab.text }}</a></router-link>
          </template>
        </ul>
      </div>
      <div class="tabs-item">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'tabs-router-component',
    props: {
      tabs: {
        type: Array,
        required: true
      }
    }
  }
</script>
<style lang="sass" scoped>

</style>
