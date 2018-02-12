<template>
  <div class="public-start-view">
    <title-component
      v-bind:size="1"
      v-bind:lineSeparator="'under'">
      Welcome to KIWA Sweden
    </title-component>
    <p><router-link class="button is-uppercase is-success is-outlined" :to="{ name: 'ApplicationView', params: { code: 'KA' } }">Go to Application Form</router-link></p>
    <br>
    <p><router-link class="button is-uppercase is-success is-outlined" :to="{ name: 'LoginComponent'}">Go to Login</router-link></p>
    <br>
    <p><router-link class="button is-uppercase is-success is-outlined" :to="{ name: 'ConfirmationForm', params: { code: 'ajsklj13124'} }">Go to Confirmation Form</router-link></p>
    <br>
    <div class="service-type-component container">
      <div class="columns is-multiline">
        <div class="column is-7">
          <ul>
            <li v-for="service in services">
              <strong class="title is-5">{{ service.name }} </strong>
              <router-link :to="{ name: 'ApplicationView', params: { code: service.code }}">Apply</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import TitleComponent from '../../components/layout/TitleComponent'

  export default {
    components: { TitleComponent },
    name: 'public-start-view',
    computed: {
      ...mapState({
        services: state => state.servicesModule.setStateService
      })
    },
    methods: {
      ...mapActions([
        'getServices'
      ])
    },
    mounted: function () {
      this.getServices()
    }
  }
</script>

<style lang="sass" scoped>

</style>
