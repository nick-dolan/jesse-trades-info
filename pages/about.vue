<template>
  <section class="container container-small mt-40">
    <h1>
      Jesse trades info
    </h1>

    <p>
      This tool is supposed to work with <a href="https://jesse-ai.com/" target="_blank">Jesse</a>'s JSON files output
      after backtest that you can get with a command like
      this:
    </p>

    <pre class="mb-10">jesse backtest 2020-03-01 2020-07-01 --json</pre>

    <p>
      It helps parse JSON backtest files with trades and shows in a convenient way with tables and charts.
    </p>
  </section>
</template>

<style scoped lang="scss">
</style>

<script>

export default {
  name: 'About',
  components: {},
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
