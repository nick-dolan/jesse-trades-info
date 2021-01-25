<template>
  <section class="container">
    <Uploader/>

    <h1 class="text-capitalize">
      Backtest:
      <span class="mono-font font-size-16">
        {{ backtestName }}
      </span>
    </h1>

    <template v-if="showEquityCurve">
      <h2>Equity Curve</h2>

      <client-only>
        <EquityCurveChart
          class="mb-20"
          :equity-curve="equityCurve"/>
      </client-only>
    </template>

    <div
      v-if="candles.length > 0"
      class="d-flex justify-content-between align-items-center">
      <h2>
        Trades
      </h2>

      <StickyChartSwitcher v-if="candles.length > 0"/>
    </div>

    <client-only>
      <div
        v-if="calculatedTimeframe && candles.length > 0"
        :class="{ 'is-sticky': isStickyChart }"
        class="chart-wrapper d-flex mb-20">
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
      :ohlc="candles"
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
import StickyChartSwitcher from '@/components/StickyChartSwitcher'
import { mapState } from 'vuex'

export default {
  name: 'Backtest',
  components: {
    OHLC,
    TradesList,
    Uploader,
    EquityCurveChart,
    RangeSwitcher,
    StickyChartSwitcher
  },
  async asyncData ({
    $axios,
    route
  }) {
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
    let calculatedTimeframe = 0

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
        .catch((err) => {
          console.log(err.message)
        })
    }

    //
    // Balance line
    //
    let balance = 10000
    let equityCurve = []

    if (trades.length > 0) {
      equityCurve = trades.map((item) => {
        balance = balance + (item.size * item.PNL_percentage / 100)

        return {
          value: balance,
          time: item.closed_at / 1000
        }
      })

      equityCurve.unshift({
        value: 10000,
        time: trades[0].opened_at / 1000
      })
    }

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
      calculatedTimeframe: 0,
      showEquityCurve: false
    }
  },
  head () {
    return {
      title: `JTI :: ${this.backtestName.charAt(0).toUpperCase() + this.backtestName.slice(1)}`
    }
  },
  computed: {
    ...mapState({
      isStickyChart: state => state.settings.isStickyChart,
      equityCurveIsVisible: state => state.settings.equityCurveIsVisible
    }),
    backtestName () {
      return this.$route.params.backtest
    }
  },
  mounted () {
    this.showEquityCurve = this.equityCurveIsVisible
  },
  methods: {
    closestCandleByTime (timestamp) {
      return this.candles.reduce((prev, curr) => (Math.abs(curr.time - timestamp) < Math.abs(prev.time - timestamp)) ? curr : prev)
    },
    scrollToTime (time) {
      const closestCandle = this.closestCandleByTime(time / 1000).time * 1000

      this.$refs.tradesChart.scrollTo(closestCandle)
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
