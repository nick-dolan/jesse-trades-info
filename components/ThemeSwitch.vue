<template>
  <button
    class="button-theme"
    @click="toggleTheme">
    <component
      :is="theme === 'dark' ? 'sunIcon' : 'moonStars'"
      class="button-theme-icon"
      width="20px"/>
  </button>
</template>

<script>

import sunIcon from '@/static/svg/sun.svg'
import moonStars from '@/static/svg/moon-stars.svg'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ThemeSwitch',
  components: {
    sunIcon,
    moonStars
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      theme: 'settings/theme'
    })
  },
  methods: {
    ...mapActions({
      setTheme: 'settings/setTheme'
    }),
    toggleTheme () {
      const theme = this.theme === 'light' ? 'dark' : 'light'

      this.setTheme(theme)
      this.$nextTick(() => {
        document.documentElement.setAttribute('data-theme', theme)
      })
    }
  }
}
</script>

<style lang="scss">
  .button-theme {
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--font-color);
    background-color: var(--bg-secondary-color);
    height: 35px;
  }
  .button-theme-icon {
    padding: 2px;
  }
</style>
