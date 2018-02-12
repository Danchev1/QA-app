<template>
  <div class="public-start-view">
    <p>Thank you for your application!</p>
    <hr />
    <router-link :to="{ name: 'StartView'}">Go to start page</router-link>
  </div>
</template>
<script>
  export default {
    name: 'thank-you-view'
  }
</script>
<style lang="sass" scoped>
</style>
