<!--suppress ES6ModulesDependencies -->
<template>
  <div>
    <div
      id="chart"
      ref="chart"/>
  </div>
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
    }
  },
  data () {
    return {
      settings: {
        width: window.innerWidth,
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
    const chart = LightweightCharts.createChart(this.$refs.chart, this.settings)

    const candleSeries = chart.addCandlestickSeries()

    candleSeries.setData(this.ohlc)
  },
  methods: {
    renderChart () {

    }
  }
}
</script>
