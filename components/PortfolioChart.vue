<template>
  <div
    id="chart"
    ref="chart"/>
</template>

<style scoped lang="scss">
</style>

<script>
// import dayjs from 'dayjs'

export default {
  name: 'PortfolioChart',
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

    const trades = this.trades.map((i) => {
      return {
        // time: dayjs(i.closed_at).utc().format('YYYY-MM-DD'), // yyyy-mm-dd
        time: i.closed_at / 1000,
        value: i.size
      }
    })

    lineSeries.setData(trades)
  },
  methods: {}
}
</script>
