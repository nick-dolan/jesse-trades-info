<template>
  <div class="container">
    <nav class="nav">
      <div class="nav-left">
        <nuxt-link
          class="brand"
          to="/">
          <img
            src="/jesse-ai-logo.png"
            alt="Logo">
        </nuxt-link>

        <div class="tabs">
          <nuxt-link exact-active-class="active" to="/">Home</nuxt-link>
          <nuxt-link active-class="active" to="/about">About</nuxt-link>
        </div>
      </div>

      <div class="nav-right"/>
    </nav>
  </div>
</template>

<style lang="scss">
  .nav {
    margin-bottom: 16px;
    .nav-right {
      margin-right: 16px;
      align-items: center;
      margin-left: 20px;
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
