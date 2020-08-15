<template>
  <div
    id="chart"
    ref="chart"/>
</template>

<style scoped lang="scss">
</style>

<script>
export default {
  name: 'PNLChart',
  components: {},
  props: {
    trades: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      settings: {
        width: 800,
        height: 300,
        layout: {
          backgroundColor: '#ffffff',
          textColor: 'rgba(33, 56, 77, 1)'
        },
        priceScale: {
          borderColor: 'rgba(197, 203, 206, 1)'
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 1)',
          timeVisible: true,
          secondsVisible: false
        }
      }
    }
  },
  computed: {},
  mounted () {
    this.$set(this.settings, 'width', this.$refs.chart.clientWidth)

    const chart = LightweightCharts.createChart(this.$refs.chart, this.settings)

    const lineSeries = chart.addLineSeries({
      lineWidth: 1.5,
      color: '#5a67d8'
    })

    chart.timeScale().fitContent()

    const pnl = []

    this.trades.reduce((result, item) => {
      pnl.push({
        time: item.closed_at / 1000,
        value: (result + item.PNL_percentage).toFixed(2)
      })

      return result + item.PNL_percentage
    }, 0)

    lineSeries.setData(pnl)
  },
  methods: {}
}
</script>
