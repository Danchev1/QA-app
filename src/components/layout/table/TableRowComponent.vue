<template>
  <tr>
    <hide-at :breakpoints="{small: 770}" breakpoint="small" class="column is-12">
      <td v-for="item_key in item_keys">
        <status-component v-if="item_key === 'state'"
                          :display="content[item_key].display"
                          :level="content[item_key].level">
        </status-component>
        <progress-bar-component v-else-if="item_key === 'progress'"
                                :progress="content[item_key]">
        </progress-bar-component>
        <template v-else-if="item_key === 'service'">
          {{ content[item_key].code }}
        </template>
        <template v-else-if="item_key === 'caseNumber'">
          <router-link :to="{ name: 'CaseView', params: { caseId: content.id } }" class="has-text-weight-semibold">
            {{ content[item_key] }}
          </router-link>
        </template>
        <template v-else-if="item_key === 'responsible'">
          {{ content[item_key].profileTypeDisplay }}
        </template>
        <template v-else>
          {{ content[item_key] }}
        </template>
      </td>
      <slot name="td-actions">
      </slot>
    </hide-at>
    <show-at :breakpoints="{small: 769}" breakpoint="small" class="column is-12">
      <td>
        <table class="table is-fullwidth">
          <tbody>
            <tr v-for="(item_key, key) in item_keys">
              <td>
                <strong>{{ headings[key] + ':' }}</strong>
              </td>
              <td class="has-text-right">
                <status-component v-if="item_key === 'state'"
                                  :level="content[item_key].level"
                                  :display="content[item_key].display">
                </status-component>
                <progress-bar-component v-else-if="item_key === 'progress'"
                                        :progress="content[item_key]">
                </progress-bar-component>
                <template v-else-if="item_key === 'caseNumber'">
                  <router-link :to="{ name: 'CaseView', params: { caseId: content.id } }" class="has-text-weight-semibold">
                    {{ content[item_key] }}
                  </router-link>
                </template>
                <template v-else-if="item_key === 'service'">
                  {{ content[item_key].code }}
                </template>
                <template v-else-if="item_key === 'responsible'">
                  {{ content[item_key].profileTypeDisplay }}
                </template>
                <template v-else>
                  {{ content[item_key] }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </show-at>
  </tr>
</template>

<script>
  import { showAt, hideAt } from 'vue-breakpoints'
  import StatusComponent from '@/components/layout/utility/StatusComponent'
  import ProgressBarComponent from '@/components/layout/utility/ProgressBarComponent'

  export default {
    name: 'table-row-component',
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
        type: Object,
        required: true
      }
    },
    components: {
      StatusComponent,
      ProgressBarComponent,
      hideAt,
      showAt
    }
  }
</script>

<style lang="sass" scoped>

</style>
