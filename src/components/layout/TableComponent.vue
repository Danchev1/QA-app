<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <title-component>
        <slot></slot>
      </title-component>
    </div>
    <hide-at :breakpoints="{small: 770}" breakpoint="small" class="table-holder">
      <table class="table is-fullwidth is-hoverless">
        <thead>
          <tr>
            <th v-for="heading in headings"
                v-translate="{ heading: heading }">
              {{ heading }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in content">
            <td v-for="item_key in item_keys">
              <status-component v-if="item_key === 'state'"
                                :display="item[item_key].display"
                                :level="item[item_key].level">
              </status-component>
              <progress-bar-component v-else-if="item_key === 'progress'"
                                      :progress="item[item_key]">
              </progress-bar-component>
              <template v-else-if="item_key === 'customer'">
                <router-link :to="{ name: 'CustomerDetailView', params: { customerId: item.id } }" class="has-text-weight-semibold">
                  {{ item[item_key].customerId }}
                </router-link>
              </template>
              <template v-else-if="item_key === 'service'">
                {{ item[item_key].code }}
              </template>
              <template v-else-if="item_key === 'caseNumber'">
                <router-link :to="{ name: 'CaseView', params: { caseId: item.id } }" class="has-text-weight-semibold">
                  {{ item[item_key] }}
                </router-link>
              </template>
              <template v-else-if="item_key === 'customerId'">
                <router-link :to="{ name: 'CustomerDetailView', params: { customerId: item.id } }" class="has-text-weight-semibold">
                  {{ item[item_key] }}
                </router-link>
              </template>
              <template v-else-if="item_key === 'responsible'">
                {{ item[item_key].profileTypeDisplay }}
              </template>
              <template v-else>
                {{ item[item_key] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </hide-at>
    <show-at :breakpoints="{small: 769}" breakpoint="small" class="table-holder">
      <table class="table is-fullwidth is-hoverless">
        <tbody>
          <tr v-for="item in content">
            <td>
              <table class="table is-fullwidth">
                <tbody>
                  <tr v-for="(item_key, key) in item_keys">
                    <td>
                      <strong>{{ headings[key] + ':' }}</strong>
                    </td>
                    <td class="has-text-right">
                      <status-component v-if="item_key === 'state'"
                                        :level="item[item_key].level"
                                        :display="item[item_key].display">
                      </status-component>
                      <progress-bar-component v-else-if="item_key === 'progress'"
                                              :progress="item[item_key]">
                      </progress-bar-component>
                      <template v-else-if="item_key === 'customer'">
                        <router-link :to="{ name: 'CustomerDetailView', params: { customerId: item.id } }" class="has-text-weight-semibold">
                          {{ item[item_key].customerId }}
                        </router-link>
                      </template>
                      <template v-else-if="item_key === 'caseNumber'">
                        <router-link :to="{ name: 'CaseView', params: { caseId: item.id } }" class="has-text-weight-semibold">
                          {{ item[item_key] }}
                        </router-link>
                      </template>
                      <template v-else-if="item_key === 'customerId'">
                        <router-link :to="{ name: 'CustomerDetailView', params: { customerId: item.id } }" class="has-text-weight-semibold">
                          {{ item[item_key] }}
                        </router-link>
                      </template>
                      <template v-else-if="item_key === 'service'">
                        {{ item[item_key].code }}
                      </template>
                      <template v-else-if="item_key === 'responsible'">
                        {{ item[item_key].profileTypeDisplay }}
                      </template>
                      <template v-else>
                        {{ item[item_key] }}
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </show-at>
  </div>
</template>
<script>
  import { showAt, hideAt } from 'vue-breakpoints'
  import TitleComponent from '@/components/layout/TitleComponent'
  import StatusComponent from '@/components/layout/utility/StatusComponent'
  import ProgressBarComponent from '@/components/layout/utility/ProgressBarComponent'

  export default {
    name: 'table-component',
    props: {
      headings: {
        type: Array,
        required: true
      },
      item_keys: {
        type: Array,
        required: true
      },
      content: {
        type: Array
      }
    },
    components: {
      TitleComponent,
      StatusComponent,
      ProgressBarComponent,
      hideAt,
      showAt
    }
  }
</script>
<style lang="sass" scoped>
</style>
