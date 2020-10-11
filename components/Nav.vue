<template>
  <div class="container">
    <nav class="nav">
      <div class="nav-left">
        <nuxt-link
          class="brand"
          to="/">
          <img
            src="/svg/jesse-bot-logo.svg"
            alt="Jesse Bot">
        </nuxt-link>

        <div class="tabs">
          <nuxt-link exact-active-class="active" to="/">Home</nuxt-link>
          <nuxt-link active-class="active" to="/about">About</nuxt-link>
        </div>
      </div>

      <div class="nav-right">
        Jesse trades info
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
  .nav {
    margin-bottom: 16px;
    .nav-right {
      align-items: center;
      font-size: 14px;
      color: var(--color-darkGrey);
      font-family: var(--font-family-mono);
    }
  }
  .tabs {
    .tabs-toggler {
      padding: 2px;
    }
  }
</style>

<script>

export default {
  name: 'Nav',
  components: {
    // ThemeSwitch
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
