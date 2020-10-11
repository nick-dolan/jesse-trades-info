<template>
  <footer class="footer">
    <div class="container">
      <div>
        <a
          class="text-grey"
          title="The Open-source Python Framework For Trading Cryptocurrencies"
          href="https://jesse.trade/"
          target="_blank">Jesse</a>

        •

        <a
          class="text-grey"
          title="This is the place to discuss Jesse framework, trading strategies, ask your questions, etc"
          href="https://forum.jesse.trade/d/127-jesse-trades-info-tool-to-review-backtest-results"
          target="_blank">Forum</a>
      </div>

      <div>
        <a
          class="text-grey"
          title="Source Code of jesse-trades-info"
          href="https://github.com/nicolay-zlobin/jesse-trades-info"
          target="_blank">
          <githubIcon class="d-block" width="22px"/>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  height: 50px;
  background-color: var(--bg-secondary-color);
  font-size: 14px;
  .container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

<script>
import githubIcon from '@/static/svg/github.svg'

export default {
  name: 'Footer',
  components: {
    githubIcon
  },
  data () {
    return {}
  },
  computed: {},
  mounted () {
  },
  methods: {}
}
</script>
