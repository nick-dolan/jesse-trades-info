<template>
  <section class="table-wrapper mb-40">
    <h2>Roundtrips</h2>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Opened at (UTC)</th>
          <th>Closed at (UTC)</th>
          <th>Holding period</th>
          <th>Size</th>
          <th>Qty</th>
          <th>Fee</th>
          <th>Entry price</th>
          <th>Exit price</th>
          <th>P&L</th>
          <th style="width: 75px;">P&L (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in trades"
          :key="i"
          class="is-pointer">
          <td>
            <span v-tooltip="{ content: `Strategy: ${item.strategy_name}; Exchange: ${item.exchange}` }">
              {{ item.symbol }}
            </span>
          </td>
          <td>
            <small>{{ item.opened_at | parseDate }}</small>
          </td>
          <td>
            <small>{{ item.closed_at | parseDate }}</small>
          </td>
          <td>
            <small>{{ item.holding_period | durationDate }}</small>
          </td>
          <td>
            <small>{{ item.size | trailingZeros }}</small>
          </td>
          <td>
            <small>{{ item.qty | trailingZeros }}</small>
          </td>
          <td>
            <small>{{ item.fee | trailingZeros }}</small>
          </td>
          <td>
            <small v-tooltip="{ content: `Take profit at: ${$options.filters.trailingZeros(item.take_profit_at)}` }">
              {{ item.entry_price | trailingZeros }}
            </small>
          </td>
          <td>
            <small v-tooltip="{ content: `Stop loss at: ${$options.filters.trailingZeros(item.stop_loss_at)}` }">
              {{ item.exit_price | trailingZeros }}
            </small>
          </td>
          <td class="text-right">
            <small :class="[item.PNL > 0 ? 'text-success' : 'text-error']">
              {{ item.PNL | trailingZeros }}
            </small>
          </td>
          <td class="text-right">
            <small :class="[item.PNL_percentage > 0 ? 'text-success' : 'text-error']">
              {{ item.PNL_percentage | trailingZeros(1) }}
            </small>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss">
  .remove-item {
    display: flex;
    align-items: center;
    svg {
      color: var(--color-grey);
      &:hover {
        color: var(--color-error);
      }
    }
  }
  .has-tooltip {
    border-bottom: 1px dotted var(--color-grey);
  }
</style>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc)

export default {
  name: 'TradesList',
  components: {},
  filters: {
    durationDate (value) {
      return dayjs.duration(value, 'seconds').humanize()
    },
    parseDate (value) {
      if (!value) {
        return ''
      }

      return dayjs(value).utc().format('MM.DD.YYYY HH:mm:ss')
    },
    trailingZeros (value, fractionDigits) {
      if (!value) {
        return ''
      }

      return Number(value.toFixed(fractionDigits || 6))
    }
  },
  props: {
    trades: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      backtestsFileNames: state => state.files.backtestsFileNames
    })
  },
  mounted () {
  },
  methods: {
    deleteBacktest (fileName) {
      this.$store.dispatch('files/removeFile', fileName)
    }
  }
}
</script>
