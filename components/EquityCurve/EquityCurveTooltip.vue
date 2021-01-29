<template>
  <div
    v-show="isVisible"
    :style="{
      minWidth: width,
      minHeight: height,
      top: top,
      left: left
    }"
    class="equity-curve-tooltip">
    <h4 class="heading">{{ type }}</h4>
    <div>
      PNL: <span :class="[pnlColor]">{{ PNL }}<span v-show="PNL !== '–'">%</span></span>
    </div>
    <div class="text-nowrap">Pair: {{ symbol }}</div>
    <div class="text-nowrap">Number of orders: {{ orders }}</div>
    <div>Holding: {{ holdingPeriod }}</div>
  </div>
</template>

<script>

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)
dayjs.extend(utc)

export default {
  name: 'EquityCurveTooltip',
  components: {},
  props: {
    settings: {
      type: Object,
      required: true,
      default: () => ({
        data: {
          closed_at: null,
          PNL_percentage: null,
          holding_period: null,
          type: null,
          symbol: null,
          strategy_name: null,
          exchange: null,
          orders: null
        },
        height: null,
        width: null,
        margin: null,
        left: null,
        top: null
      })
    }
  },
  data () {
    return {}
  },
  computed: {
    isVisible () {
      return this.settings.left && this.settings.top && this.settings.type !== null
    },
    height () {
      return this.settings.height ? this.settings.height + 'px' : 'auto'
    },
    width () {
      return this.settings.width ? this.settings.width + 'px' : 'auto'
    },
    left () {
      return this.settings.left ? this.settings.left + 'px' : 'initial'
    },
    top () {
      return this.settings.top ? this.settings.top + 'px' : 'initial'
    },
    type () {
      return this.settings.data.type ? this.settings.data.type.toUpperCase() : 'NONE'
    },
    symbol () {
      return this.settings.data.symbol ? this.settings.data.symbol : '–'
    },
    orders () {
      return this.settings.data.orders ? this.settings.data.orders : '–'
    },
    strategyName () {
      return this.settings.data.strategy_name ? this.settings.data.strategy_name : '–'
    },
    exchange () {
      return this.settings.data.exchange ? this.settings.data.exchange : '–'
    },
    closedDate () {
      return this.settings.data.closed_at ? dayjs(this.settings.data.closed_at).utc().format('MMM D, YYYY HH:mm') : '–'
    },
    PNL () {
      return this.settings.data.PNL_percentage ? this.settings.data.PNL_percentage : '–'
    },
    pnlColor () {
      if (this.PNL !== '–') {
        return this.PNL > 0 ? 'text-success' : 'text-error'
      }
      else {
        return ''
      }
    },
    holdingPeriod () {
      return this.settings.data.holding_period ? dayjs.duration(this.settings.data.holding_period, 'seconds').humanize() : '–'
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="scss">
  .equity-curve-tooltip {
    .heading {
      margin: 0;
      font-weight: bold;
    }
    cursor: pointer;
    position: absolute;
    padding: 3px 8px;
    font-size: 12px;
    color: var(--font-color);
    background-color: var(--bg-secondary-color);
    text-align: left;
    z-index: 1000;
    top: 12px;
    left: 12px;
    pointer-events: none;
    border: 1px solid var(--color-primary);
    border-radius: 2px;
  }
</style>
