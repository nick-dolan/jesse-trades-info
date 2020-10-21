<!--suppress ES6ModulesDependencies -->
<template>
  <div
    id="chart"
    ref="chart"/>
</template>

<style scoped lang="scss">

</style>

<script>
import { findIndex } from 'lodash'

export default {
  name: 'ChartOHLC',
  components: {},
  props: {
    ohlc: {
      type: Array,
      default: () => [],
      required: true
    },
    orders: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      settings: {
        width: 800,
        height: 420,
        layout: {
          backgroundColor: '#131722',
          textColor: '#d1d4dc'
        },
        grid: {
          vertLines: {
            color: 'rgba(42, 46, 57, 0.6)'
          },
          horzLines: {
            color: 'rgba(42, 46, 57, 0.6)'
          }
        },
        crosshair: {
          mode: LightweightCharts.CrosshairMode.Normal
        },
        priceScale: {
          borderColor: 'rgba(197, 203, 206, 0.6)'
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.6)',
          timeVisible: true,
          secondsVisible: false
        }
      },
      chart: {}
    }
  },
  computed: {},
  watch: {},
  mounted () {
    this.$set(this.settings, 'width', this.$refs.chart.clientWidth)

    this.chart = LightweightCharts.createChart(this.$refs.chart, this.settings)

    const candleSeries = this.chart.addCandlestickSeries()

    candleSeries.setData(this.ohlc)

    this.chart.timeScale().fitContent()

    const orders = this.orders.map((i) => {
      return {
        time: i.executed_at / 1000,
        position: 'inBar',
        color: i.side === 'buy' ? '#28bd14' : '#d43939',
        shape: 'circle'
      }
    })

    candleSeries.setMarkers(orders)
  },
  methods: {
    getVisibleLogicalRange () {
      return this.chart.timeScale().getVisibleLogicalRange()
    },
    closestCandleByTime (timestamp) {
      return this.ohlc.reduce((prev, curr) => (Math.abs(curr.time - timestamp) < Math.abs(prev.time - timestamp)) ? curr : prev)
    },
    OHLCIndexByTime (time) {
      const closest = this.closestCandleByTime(time / 1000).time

      return findIndex(this.ohlc, { time: closest })
    },
    scrollTo (time) {
      const indexToScroll = this.OHLCIndexByTime(time)
      const logicalRange = this.getVisibleLogicalRange()
      const indent = (logicalRange.to - logicalRange.from) / 2
      const ohlcSize = this.ohlc.length - 1

      this.chart.timeScale().scrollToPosition(-ohlcSize + indexToScroll + indent, true)
    }
  }
}
</script>

