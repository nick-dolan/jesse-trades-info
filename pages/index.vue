<template>
  <section class="container container-home mt-40">
    <Uploader/>

    <BacktestsList/>
  </section>
</template>

<style scoped lang="scss">
  .container.container-home {
    max-width: 800px;
  }
</style>

<script>
import Uploader from '../components/Uploader'
import BacktestsList from '@/components/BacktestsList'

export default {
  name: 'Home',
  components: {
    Uploader,
    BacktestsList
  },
  async asyncData ({ store }) {
    await store.dispatch('files/getFilesList')
  },
  data () {
    return {
      greeting: 'Hello jesse-trades-info'
    }
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
