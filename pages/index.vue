<template>
  <div class="cont">
    <Upload/>
  </div>
</template>

<style lang="scss">
  .cont {
    width: 800px;
    margin: 50px auto;
  }
</style>

<script>
import Upload from '../components/Upload'

export default {
  name: 'Home',
  components: {
    Upload
  },
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
          entryTimestamp: 1583233200000,
          exitTimestamp: 1591894800000
        }
      })
      .then((res) => {
        console.log('Data:', res.data.length)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {}
}
</script>
