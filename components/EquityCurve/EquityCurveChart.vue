<template>
  <div class="position-relative">
    <div
      id="chart"
      ref="chart"/>

    <EquityCurveTooltip :settings="tooltipSettings"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { find } from 'lodash'
import EquityCurveTooltip from '@/components/EquityCurve/EquityCurveTooltip'

const getDefaultTooltipState = () => {
  return {
    data: {
      closed_at: null,
      PNL_percentage: null,
      holding_period: null,
      type: null,
      symbol: null,
      strategy_name: null,
      exchange: null,
      orders: null
    },
    height: 110,
    width: 135,
    margin: 15,
    left: null,
    top: null
  }
}

export default {
  name: 'EquityCurveChart',
  components: {
    EquityCurveTooltip
  },
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
      isTooltipVisible: false,
      tooltipSettings: getDefaultTooltipState(),
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
      theme: 'settings/theme',
      isStickyChart: 'settings/isStickyChart'
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
      const el = this.$refs.chart

      if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > el.clientWidth || param.point.y < 0 || param.point.y > el.clientHeight) {
        this.tooltipSettings = getDefaultTooltipState()
      }
      else {
        const data = find(this.trades, (item) => {
          return item.closed_at / 1000 === param.time
        })

        if (data !== undefined) {
          this.$set(this.tooltipSettings, 'data', {
            closed_at: data.closed_at,
            PNL_percentage: data.PNL_percentage,
            holding_period: data.holding_period,
            type: data.type,
            symbol: data.symbol,
            strategy_name: data.strategy_name,
            exchange: data.exchange,
            orders: data.orders.length
          })

          const price = param.seriesPrices.get(this.lineSeries)
          const coordinate = this.lineSeries.priceToCoordinate(price)

          let shiftedCoordinate = param.point.x - this.tooltipSettings.width / 2

          if (coordinate === null) {
            return
          }

          const width = this.tooltipSettings.width
          const height = this.tooltipSettings.height
          const margin = this.tooltipSettings.margin

          shiftedCoordinate = Math.max(0, Math.min(el.clientWidth - width, shiftedCoordinate))
          const coordinateY = coordinate - height - margin > 0 ? coordinate - height - margin : Math.max(0, Math.min(el.clientHeight - height - margin, coordinate + margin))

          this.$set(this.tooltipSettings, 'left', shiftedCoordinate)
          this.$set(this.tooltipSettings, 'top', coordinateY)
        }
      }
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
          const yOffset = this.isStickyChart ? -395 : -20
          console.log(yOffset, this.isStickyChart)
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

