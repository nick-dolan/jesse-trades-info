<template>
  <div>
    <Nav/>

    <Nuxt/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Default',
  components: {
    Nav
  },
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>
