<template>
  <div class="cont">
    <Uploader/>

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
import Uploader from '../components/Uploader'

export default {
  name: 'Home',
  components: {
    Uploader
  },
  async asyncData ({ $axios, store }) {
    await $axios
      .$get('/api/files-list')
      .then((result) => {
        store.commit('SET_BACKTESTS_FILE_NAMES', result)
      })
  },
  data () {
    return {
      greeting: 'Hello jesse-trades-info'
    }
  },
  // middleware: ['middleware'],
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
