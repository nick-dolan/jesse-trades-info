<template>
  <section
    ref="tableWrapper"
    :class="{ 'table-wrapper': isTableOverflown }"
    class="mb-40">
    <h2 class="text-primary">Roundtrips</h2>

    <table class="table table-roundtrips table-hover">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Type</th>
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
        <template v-for="(item, i) in trades">
          <tr
            :id="item.id"
            :key="i"
            class="is-pointer"
            :class="{ 'is-active': rowVisibility.index === i && rowVisibility.visible }"
            @click="showOrders(i); selectOrder(null)">
            <td>
              <span
                v-tooltip="{ content: `Strategy: ${item.strategy_name}; Exchange: ${item.exchange}` }"
                class="is-pointer">
                {{ item.symbol }}
              </span>
            </td>
            <td>
              <span class="text-uppercase">{{ item.type }}</span>
            </td>
            <td>
              <small>{{ item.opened_at | parseDate }}</small>
            </td>
            <td>
              <small>{{ item.closed_at | parseDate }}</small>
            </td>
            <td>
              {{ item.holding_period | durationDate }}
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
              <small
                v-tooltip="{ content: `Take profit at: ${$options.filters.trailingZeros(item.take_profit_at)}` }"
                class="is-pointer">
                {{ item.entry_price | trailingZeros }}
              </small>
            </td>
            <td>
              <small
                v-tooltip="{ content: `Stop loss at: ${$options.filters.trailingZeros(item.stop_loss_at)}` }"
                class="is-pointer">
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

          <tr
            v-show="rowVisibility.index === i && rowVisibility.visible"
            :key="'orders_' + i"
            class="no-hover">
            <td colspan="12" style="padding: 5px 2%">
              <h4 class="orders-heading mb-0 mt-10">Orders</h4>

              <table
                class="table table-orders table-hover mb-10">
                <thead :class="{ 'table-orders-sticky-row': !isTableOverflown && isSticky && ohlc.length > 0 }">
                  <tr>
                    <th>Symbol</th>
                    <th>Exchange</th>
                    <th>Side</th>
                    <th>Role</th>
                    <th>Type</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Created at</th>
                    <th>Executed at</th>
                    <th>Canceled at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(order, index) in item.orders"
                    :key="order.__data__.id"
                    :class="{'selected-order': selectedOrder === index}"
                    class="is-pointer"
                    @click="getOrderTime(order.__data__.executed_at); selectOrder(index)">
                    <td>{{ order.__data__.symbol }}</td>
                    <td>{{ order.__data__.exchange }}</td>
                    <td>
                      <div class="is-vertical-align">
                        <i
                          :class="[order.__data__.side === 'sell' ? 'is-red' : 'is-green']"
                          class="circle">&#9679;</i>
                        <span class="text-capitalize ml-5">{{ order.__data__.side }}</span>
                      </div>
                    </td>
                    <td>{{ order.__data__.role }}</td>
                    <td>{{ order.__data__.type }}</td>
                    <td><small>{{ order.__data__.qty | trailingZeros }}</small></td>
                    <td><small>{{ order.__data__.price | trailingZeros }}</small></td>
                    <td>{{ order.__data__.status }}</td>
                    <td><small>{{ order.__data__.created_at | parseDate }}</small></td>
                    <td><small>{{ order.__data__.executed_at | parseDate }}</small></td>
                    <td :class="{ 'text-light': !order.__data__.canceled_at } ">
                      {{ order.__data__.canceled_at ? order.__data__.canceled_at : '–' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </section>
</template>

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
    },
    ohlc: {
      type: Array,
      default: () => [],
      required: true
    },
    isSticky: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selectedOrder: null,
      isTableOverflown: true,
      rowVisibility: {
        index: null,
        visible: false
      }
    }
  },
  computed: {
    ...mapState({
      backtestsFileNames: state => state.files.backtestsFileNames
    })
  },
  created () {
  },
  mounted () {
    function isOverflown (element) {
      return element.scrollWidth > element.clientWidth
    }

    this.isTableOverflown = isOverflown(this.$refs.tableWrapper)
  },
  methods: {
    selectOrder (index) {
      this.selectedOrder = index
    },
    getOrderTime (executedAt) {
      if (this.ohlc.length) {
        this.$emit('get-order-time', executedAt)
      }
    },
    deleteBacktest (fileName) {
      this.$store.dispatch('files/removeFile', fileName)
    },
    showOrders (i) {
      const isVisible = i === this.rowVisibility.index ? !this.rowVisibility.visible : true

      this.$set(this.rowVisibility, 'index', i)
      this.$set(this.rowVisibility, 'visible', isVisible)
    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes quickFlash {
    0% {
      background: var(--color-primary);
    }
    100% {
      background: transparent;
    }
  }

  .highlight {
    -webkit-animation-name: quickFlash;
    -webkit-animation-duration: 1500ms;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-timing-function: ease;
    -moz-animation-name: quickFlash;
    -moz-animation-duration: 1500ms;
    -moz-animation-iteration-count: 1;
    -moz-animation-timing-function: ease;
  }

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
  .table-roundtrips {
    tr thead tr {
      &:hover {
        background-color: var(--bg-color);
      }
    }
    .no-hover {
      &:hover {
        background-color: inherit;
      }
    }
  }
  .circle {
    font-style: normal;
    font-size: 8px;
    &.is-green {
      color: #00c100;
    }
    &.is-red {
      color: #f71e32;
    }
  }
  .orders-heading {
    padding: 0 3px;
  }
  .table-orders {
    .table-orders-sticky-row {
      border-bottom: 0;
      th {
        position: sticky;
        top: 390px;
        background-color: var(--bg-secondary-color);
        z-index: 9;
        box-shadow: inset 0 -1px 0 var(--color-lightGrey);
      }
    }
    .selected-order {
      transition: background 100ms linear;
      background: #f3f3f6;
      background: var(--bg-secondary-color);
    }
    th {
      color: var(--font-color);
      font-weight: 400;
    }
    tr {
      background-color: var(--bg-color);
    }
    tbody {
      td {
        font-size: 13px
      }
    }
  }
</style>
