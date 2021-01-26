<template>
  <div class="layout">
    <div class="content">
      <Nav/>

      <Nuxt/>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default {
  name: 'Default',
  components: {
    Nav,
    Footer
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>

<style>
  html, body, #__nuxt, #__layout {
    height: 100%;
  }
  .layout {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .content {
    flex: 1 0 auto;
  }
  .footer {
    flex-shrink: 0;
  }
</style>
