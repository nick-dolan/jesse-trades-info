<template>
  <footer class="footer">
    <div class="container">
      <div>
        <a
          class="text-grey"
          href="https://jesse-ai.com/"
          target="_blank">Jesse AI</a>

        •

        <a
          class="text-grey"
          href="https://forum.jesse-ai.com/d/127-jesse-trades-info-tool-to-review-backtest-results"
          target="_blank">Forum</a>
      </div>

      <div>
        <a
          class="text-grey"
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
