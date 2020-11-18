<template>
  <section class="container container-small mt-40">
    <Uploader class="mb-40"/>

    <BacktestsList/>
  </section>
</template>

<script>
import Uploader from '@/components/Uploader'
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
    return {}
  },
  mounted () {
  },
  methods: {},
  head () {
    return {
      title: 'JTI :: Home',
      meta: [
        { hid: 'description', name: 'description', content: 'List of backtests' }
      ]
    }
  }
}
</script>
