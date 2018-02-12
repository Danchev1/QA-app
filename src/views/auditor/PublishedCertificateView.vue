<template>
  <div class="published-certificate-view">
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <title-component v-bind:size="1">
            Show certificate
            <p class="control is-pulled-right">
               <span class="tag is-success is-uppercase">
                Published
               </span>
            </p>
          </title-component>
          <br>
          <title-component
            v-bind:size="2"
            v-bind:lineSeparator="'under'">
            Customer
          </title-component>
          <grid-details-component v-if="certificate.id" v-bind:content="certificate_owner_specs" v-bind:detailObject="certificate.ownerProfile"></grid-details-component>
          <title-component
            v-bind:size="2"
            v-bind:lineSeparator="'under'">
            Certificate
          </title-component>
          <grid-details-component v-if="certificate.id" v-bind:content="certificate_specs" v-bind:detailObject="certificate"></grid-details-component>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns is-multilined">
        <div class="column is-12">
          <tabs animation="fade" :only-fade="true">
            <tab-pane label="Certificate">
            </tab-pane>
          </tabs>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import { customerProfileSpecs, certificateSpecs } from '@/display_context/display_context'
  import TitleComponent from '@/components/layout/TitleComponent'
  import GridDetailsComponent from '@/components/layout/grid/GridDetailsComponent'
  import Tabs from '@/components/layout/tabs/tabs_content/Tabs'
  import TabPane from '@/components/layout/tabs/tabs_content/TabPane'

  export default {
    components: {
      GridDetailsComponent,
      TitleComponent,
      Tabs,
      TabPane
    },
    name: 'published-certificate-view',
    data () {
      return {
        certificate_owner_specs: [],
        certificate_specs: []
      }
    },
    props: {
      certificateId: {
        required: true
      }
    },
    computed: {
      ...mapState({
        certificate: state => state.certificateModule.certificate
      })
    },
    methods: {
      ...mapActions([
        'refreshCertificate'
      ])
    },
    created () {
      this.certificate_owner_specs = customerProfileSpecs
      this.certificate_specs = certificateSpecs
      this.refreshCertificate(this.certificate)
    }
  }
</script>

