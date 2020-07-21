<template>
  <section class="container">
    <h1 class="text-capitalize">
      {{ $route.params.backtest }}
    </h1>

    <client-only>
      <OHLC :ohlc="candles" class="mb-10"/>
    </client-only>

    <TradesList :trades="trades"/>
  </section>
</template>

<style scoped lang="scss">
</style>

<script>

import OHLC from '@/components/OHLC'
import TradesList from '@/components/TradesList'

export default {
  name: 'Backtest',
  components: {
    OHLC,
    TradesList
  },
  async asyncData ({ $axios, route }) {
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

    let candles = []

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
          candles = result.data
        })
    }

    return {
      trades,
      candles
    }
  },
  data () {
    return {
      candles: [],
      trades: []
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {}
}
</script>
