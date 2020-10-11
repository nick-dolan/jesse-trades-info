<template>
  <section class="container container-small mt-40">
    <header class="about-header">
      <h1>
        Jesse trades info
      </h1>

      <a
        class="text-dark"
        title="Source Code of jesse-trades-info"
        href="https://github.com/nicolay-zlobin/jesse-trades-info"
        target="_blank">
        <githubIcon width="24px"/>
      </a>
    </header>

    <p>
      This tool is supposed to work with <a href="https://jesse.trade/" target="_blank">Jesse</a>'s JSON files output
      after backtest that you can get with a command like this:
    </p>

    <pre class="mb-10">jesse backtest 2020-03-01 2020-07-01 --json</pre>

    <p>
      It helps parse JSON backtest files with trades and shows in a convenient way with tables and charts.
    </p>

    <p>
      If you have any questions or feature requests, you may ask it
      <a
        target="_blank"
        href="https://forum.jesse.trade/d/127-jesse-trades-info-tool-to-review-backtest-results">here</a>.
    </p>
  </section>
</template>

<style scoped lang="scss">
  .about-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<script>
import githubIcon from '@/static/svg/github.svg'

export default {
  name: 'About',
  components: {
    githubIcon
  },
  data () {
    return {}
  },
  computed: {},
  mounted () {
  },
  methods: {},
  head () {
    return {
      title: 'About'
    }
  }
}
</script>
