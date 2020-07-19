<template>
  <div>
    {{ $route.params.name }}

    <pre>{{ candles.length }}</pre>

    <client-only>
      <OHLC :ohlc="candles"/>
    </client-only>
  </div>
</template>

<style scoped lang="scss">
</style>

<script>

import OHLC from '@/components/OHLC'

export default {
  name: 'Backtest',
  components: {
    OHLC
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
            // exitTimestamp: 1583234200000
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
    isClient () {
      return process.client
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
