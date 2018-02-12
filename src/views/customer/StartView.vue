<template>
  <div class="customer-start-view">
    <p>Welcome to the Customer section of Idun</p>
    <p>You can do the following as a Customer:</p>
    <hr />
    <p><router-link :to="{name: 'DashboardView'}">Go to My Dashboard</router-link></p>
    <p>
      <router-link :to="{
        name: 'CertificateView',
        params: { serviceType: formCertificates.CUSTOMER.toLowerCase()}
        }">Go to My Customer Information
      </router-link>
    </p>
    <p><router-link :to="{ name: 'CustomerProfileView'}">Customer Profile</router-link></p>
    <p><router-link :to="{ name: 'CaseListView'}">Customer Cases List</router-link></p>
  </div>
</template>

<script>

  import { FORM_CERTIFICATES } from '@/api/config'

  export default {
    name: 'customer-start-view',
    data: function () {
      return {
        formCertificates: FORM_CERTIFICATES
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
