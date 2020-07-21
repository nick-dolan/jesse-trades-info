<!--suppress ES6ModulesDependencies -->
<template>
  <div
    id="chart"
    ref="chart"/>
</template>

<style scoped lang="scss">

</style>

<script>

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
          borderColor: 'rgba(197, 203, 206, 0.6)'
        }
      }
    }
  },
  computed: {},
  watch: {},
  mounted () {
    this.$set(this.settings, 'width', this.$refs.chart.clientWidth)

    const chart = LightweightCharts.createChart(this.$refs.chart, this.settings)

    const candleSeries = chart.addCandlestickSeries()

    candleSeries.setData(this.ohlc)

    chart.timeScale().fitContent()

    const orders = this.orders.map((i) => {
      return {
        time: i.executed_at,
        position: 'inBar',
        color: i.side === 'buy' ? '#28bd14' : '#d43939',
        // shape: i.side === 'buy' ? 'arrowUp' : 'arrowDown',
        shape: 'circle'
      }
    })

    candleSeries.setMarkers(orders)
  },
  methods: {
    renderChart () {

    }
  }
}
</script>
