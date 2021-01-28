<template>
  <div class="position-relative">
    <div
      id="chart"
      ref="chart"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { find } from 'lodash'

export default {
  name: 'EquityCurveChart',
  components: {},
  props: {
    equityCurve: {
      type: Array,
      required: true,
      default: () => []
    },
    trades: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      chart: null,
      lineSeries: null,
      settings: {
        width: 800,
        height: 300,
        priceScale: {
          borderColor: 'rgba(197, 203, 206, 1)'
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 1)',
          timeVisible: true,
          secondsVisible: false
        }
      },
      lightTheme: {
        chart: {
          layout: {
            backgroundColor: '#ffffff',
            textColor: 'rgba(33, 56, 77, 1)'
          },
          grid: {
            vertLines: {
              color: '#d6dcde'
            },
            horzLines: {
              color: '#d6dcde'
            }
          },
          priceScale: {
            borderColor: '#868b8c'
          },
          timeScale: {
            borderColor: '#868b8c',
            timeVisible: true,
            secondsVisible: false
          }
        },
        series: {
          color: '#5a67d8'
        }
      },
      darkTheme: {
        chart: {
          layout: {
            backgroundColor: '#111c2a',
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
          priceScale: {
            borderColor: 'rgba(197, 203, 206, 0.6)'
          },
          timeScale: {
            borderColor: 'rgba(197, 203, 206, 0.6)',
            timeVisible: true,
            secondsVisible: false
          }
        },
        series: {
          color: '#f9b537'
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      theme: 'settings/theme'
    })
  },
  watch: {
    theme () {
      this.syncToTheme()
    }
  },
  mounted () {
    this.$set(this.settings, 'width', this.$refs.chart.clientWidth)
    this.chart = LightweightCharts.createChart(this.$refs.chart, this.settings)
    this.lineSeries = this.chart.addLineSeries({
      lineWidth: 1.5
    })

    this.chart.timeScale().fitContent()
    this.lineSeries.setData(this.equityCurve)
    this.syncToTheme()

    this.chart.subscribeClick(this.handleClick)
    this.chart.subscribeCrosshairMove(this.handleCrosshairMove)
  },
  beforeDestroy () {
    this.chart.unsubscribeClick(this.handleClick)
    this.chart.unsubscribeCrosshairMove(this.handleCrosshairMove)
  },
  methods: {
    syncToTheme () {
      const themesData = {
        dark: this.darkTheme,
        light: this.lightTheme
      }

      this.chart.applyOptions(themesData[this.theme].chart)
      this.lineSeries.applyOptions(themesData[this.theme].series)
    },
    handleCrosshairMove (param) {
      // if (!param.point) {
      //   return
      // }

      // const info = find(this.trades, (item) => {
      //   return item.closed_at / 1000 === param.time
      // })
      //
      // if (info !== undefined) {
      //   console.log(info)
      // }
    },
    handleClick (param) {
      if (!param.point) {
        return
      }

      const info = find(this.trades, (item) => {
        return item.closed_at / 1000 === param.time
      })

      if (info !== undefined) {
        const element = document.getElementById(info.id)

        if (element) {
          const yOffset = -395
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })

          element.classList.add('highlight')

          setTimeout(() => {
            element.classList.remove('highlight')
          }, 1510)
        }
      }
    }
  }
}
</script>
