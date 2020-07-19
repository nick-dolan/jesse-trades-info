<template>
  <div class="cont">
    <Upload/>

    <h3>Backtest list</h3>

    <div
      v-for="(item, i) in backtestsFileNames"
      :key="i">
      <nuxt-link :to="`/trades/${item}`">
        <pre>{{ item }}</pre>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss">
  .cont {
    width: 800px;
    margin: 50px auto;
  }
</style>

<script>
import { mapState } from 'vuex'
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

  middleware: ['middleware'],
  computed: {
    ...mapState({
      backtestsFileNames: state => state.backtestsFileNames
    })
  },
  mounted () {
  },
  methods: {},
  head () {
    return {
      title: 'Home',
      meta: [
        { hid: 'description', name: 'description', content: 'List of backtests' }
      ]
    }
  }
}
</script>
