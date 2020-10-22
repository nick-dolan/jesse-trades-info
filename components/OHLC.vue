<!--suppress ES6ModulesDependencies -->
<template>
  <div
    id="chart"
    ref="chart"
    class="ohlc-chart"/>
</template>

<script>
import { findIndex, sortedIndexBy } from 'lodash'

export default {
  name: 'ChartOHLC',
  components: {},
  props: {
    ohlc: {
      type: Array,
      default: () => [],
      required: true
    },
    rawOrders: {
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
      chart: {},
      candleSeries: {},
      orders: this.rawOrders,
      allowScroll: true
    }
  },
  computed: {},
  watch: {},
  mounted () {
    this.$set(this.settings, 'width', this.$refs.chart.clientWidth)

    this.chart = LightweightCharts.createChart(this.$refs.chart, this.settings)

    this.candleSeries = this.chart.addCandlestickSeries()

    this.candleSeries.setData(this.ohlc)

    this.chart.timeScale().fitContent()

    this.orders = this.orders.map((i) => {
      return {
        time: i.executed_at / 1000,
        position: 'inBar',
        color: i.side === 'buy' ? '#28bd14' : '#d43939',
        shape: 'circle',
        text: ''
      }
    })

    this.candleSeries.setMarkers(this.orders)
  },
  methods: {
    getVisibleLogicalRange () {
      return this.chart.timeScale().getVisibleLogicalRange()
    },
    closestCandleByTime (timestamp) {
      return this.ohlc.reduce((prev, curr) => (Math.abs(curr.time - timestamp) < Math.abs(prev.time - timestamp)) ? curr : prev)
    },
    OHLCItemByTime (time) {
      const closest = this.closestCandleByTime(time / 1000).time

      return {
        index: findIndex(this.ohlc, { time: closest }),
        time: closest
      }
    },
    scrollToPosition (index) {
      this.allowScroll = false
      this.chart.timeScale().scrollToPosition(index, true)

      const vm = this

      setTimeout(() => {
        vm.allowScroll = true
      }, 1000)
    },
    scrollToPositionOld (index) {
      this.chart.timeScale().scrollToPosition(index, true)
    },
    addScrollPointer (time) {
      // Remove previous pointer if exists
      const index = this.orders.findIndex(item => item.text === '▽')

      if (index !== -1) {
        this.orders.splice(index, 1)
      }

      const markerToAdd = {
        time,
        position: 'aboveBar',
        color: '#ffc600',
        text: '▽'
      }

      // Add pointer to selected order
      this.orders.splice(sortedIndexBy(this.orders, markerToAdd, 'time'), 0, markerToAdd)

      // Update markers
      this.candleSeries.setMarkers(this.orders)
    },
    scrollTo (time) {
      if (this.allowScroll) {
        const candleToScroll = this.OHLCItemByTime(time)

        const logicalRange = this.getVisibleLogicalRange()
        const indent = (logicalRange.to - logicalRange.from) / 2
        const ohlcSize = this.ohlc.length - 1

        this.addScrollPointer(candleToScroll.time)
        this.scrollToPosition(-ohlcSize + candleToScroll.index + indent)
      }
    }
  }
}
</script>
