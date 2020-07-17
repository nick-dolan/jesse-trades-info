<template>
  <div>
    {{ greeting }}
  </div>
</template>

<style scoped lang="scss">
  div {
    font-size: 2em;
    text-align: center;
  }
</style>

<script>

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      greeting: 'Hello jesse-trades-info'
    }
  },
  computed: {},
  mounted () {
    this.$axios
      .$get('/api/candles', {
        params: {
          symbol: 'BTCUSDT',
          exchange: 'Binance',
          entry_candle_timestamp: 1583231400000,
          exit_candle_timestamp: 1583681400000
        }
      })
      .then((res) => {
        console.log('Data:', res.data.length)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {}
}
</script>
