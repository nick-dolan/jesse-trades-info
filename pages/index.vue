<template>
  <div class="cont">
    <Upload/>

    <h3>Backtest list</h3>

    <div
      v-for="(item, i) in backtestsFileNames"
      :key="i">
      <nuxt-link :to="`/backtest/${item}`">
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
  middleware: ['middleware'],
  data () {
    return {
      greeting: 'Hello jesse-trades-info'
    }
  },
  computed: {
    ...mapState({
      backtestsFileNames: state => state.backtestsFileNames
    })
  },
  mounted () {
  },
  methods: {}
}
</script>
