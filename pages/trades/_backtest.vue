<template>
  <section class="container">
    <Uploader/>

    <h1 class="text-capitalize">
      Backtest:
      <span class="mono-font font-size-16">
        {{ backtestName }}
      </span>
    </h1>

    <h2>Equity Curve</h2>

    <client-only>
      <EquityCurveChart :equity-curve="equityCurve"/>
    </client-only>

    <div class="d-flex justify-content-between align-items-center">
      <h2>
        Trades
      </h2>

      <div class="form-check form-switch">
        <label
          class="form-check-label user-select-none text-grey"
          for="sticky_chart_switch">Sticky Chart</label>
        <input
          id="sticky_chart_switch"
          v-model="isStickyChart"
          class="form-check-input"
          type="checkbox">
      </div>
    </div>

    <client-only>
      <div
        :class="{ 'is-sticky': isStickyChart }"
        class="chart-wrapper d-flex mb-40">
        <small class="trades-candles-length">Number of candles: {{ candles.length }}</small>

        <RangeSwitcher
          :trades="trades"
          :candles.sync="candles"
          :calculated-timeframe="calculatedTimeframe"/>

        <OHLC
          ref="tradesChart"
          :raw-orders="orders"
          :is-sticky="isStickyChart"
          :ohlc="candles"
          class="flex-grow-1 w-100"/>
      </div>
    </client-only>

    <TradesList
      :trades="trades"
      :is-sticky="isStickyChart"
      @get-order-time="scrollToTime"/>
  </section>
</template>

<script>

import OHLC from '@/components/OHLC'
import TradesList from '@/components/TradesList'
import Uploader from '@/components/Uploader'
import EquityCurveChart from '@/components/EquityCurveChart'
import RangeSwitcher from '@/components/RangeSwitcher'

export default {
  name: 'Backtest',
  components: {
    OHLC,
    TradesList,
    Uploader,
    EquityCurveChart,
    RangeSwitcher
  },
  async asyncData ({ $axios, route }) {
    //
    // Trades
    //
    let trades = []

    await $axios
      .$get('/api/read-file', {
        params: {
          fileName: route.params.backtest
        }
      })
      .then((result) => {
        trades = result.trades
      })

    //
    // Candles
    //
    let candles = []
    let calculatedTimeframe = null

    if (trades.length > 0) {
      await $axios
        .$get('/api/candles', {
          params: {
            symbol: trades[0].symbol,
            exchange: trades[0].exchange,
            entryTimestamp: trades[0].opened_at,
            exitTimestamp: trades[trades.length - 1].closed_at
          }
        })
        .then((result) => {
          calculatedTimeframe = result.calculatedFrame
          candles = result.data
        })
    }

    //
    // Balance line
    //
    let balance = 10000

    const equityCurve = trades.map((item) => {
      balance = balance + (item.size * item.PNL_percentage / 100)

      return {
        value: balance,
        time: item.closed_at / 1000
      }
    })

    equityCurve.unshift({
      value: 10000,
      time: candles[0].time
    })

    //
    // Orders
    //
    let orders = trades.map((item) => {
      return [...item.orders]
    })

    orders = orders.flat()

    return {
      trades,
      equityCurve,
      candles,
      calculatedTimeframe,
      orders
    }
  },
  data () {
    return {
      orders: [],
      candles: [],
      trades: [],
      equityCurve: [],
      calculatedTimeframe: null,
      isStickyChart: true
    }
  },
  computed: {
    backtestName () {
      return this.$route.params.backtest
    }
  },
  mounted () {
  },
  methods: {
    scrollToTime (time) {
      this.$refs.tradesChart.scrollTo(time)
    }
  },
  head () {
    return {
      title: `Trades :: ${this.backtestName.charAt(0).toUpperCase() + this.backtestName.slice(1)}`
    }
  }
}
</script>

<style lang="scss">
  .chart-wrapper {
    background-color: #111723;
    position: relative;
    &.is-sticky {
      top: 12px;
      position: sticky;
      z-index: 10;
    }
    .trades-candles-length {
      position: absolute;
      color: var(--color-grey);
      top: -12px;
      left: 0;
      font-size: 8px;
    }
  }
</style>
