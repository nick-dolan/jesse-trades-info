<template>
  <div
    id="chart"
    ref="chart"/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EquityCurveChart',
  components: {},
  props: {
    equityCurve: {
      type: Array,
      default: () => [],
      required: true
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
          }
        },
        series: {
          color: '#5a67d8'
        }
      },
      darkTheme: {
        chart: {
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
  },
  methods: {
    syncToTheme () {
      const themesData = {
        dark: this.darkTheme,
        light: this.lightTheme
      }

      this.chart.applyOptions(themesData[this.theme].chart)
      this.lineSeries.applyOptions(themesData[this.theme].series)
    }
  }
}
</script>
