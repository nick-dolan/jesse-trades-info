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
          <nuxt-link active-class="active" to="/settings">Settings</nuxt-link>
        </div>
      </div>

      <div class="nav-right hide-xs">
        <span class="mr-20 brand-name">Jesse trades info</span>

        <client-only>
          <ThemeSwitch/>
        </client-only>
      </div>
    </nav>
  </div>
</template>

<script>
import ThemeSwitch from '@/components/ThemeSwitch'

export default {
  name: 'Nav',
  components: {
    ThemeSwitch
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

<style lang="scss" scoped>
  .nav a,
  .nav .brand {
    color: var(--color-nav-link);
  }

  .nav {
    margin-bottom: 16px;
    .nav-right {
      align-items: center;
      font-size: 14px;
      color: var(--color-darkGrey);
      font-family: var(--font-family-mono);
    }
    .brand-name {
      color: var(--font-color);
    }
  }

  .tabs {
    .tabs-toggler {
      padding: 2px;
    }
  }
  .tabs > a.active,
  .tabs > a:hover {
    opacity: 1;
    border-bottom: 2px solid var(--color-nav-link-border);
  }
</style>
