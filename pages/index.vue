<template>
  <div>
    {{ greeting }}
  </div>
</template>

<style scoped lang="scss">
  div {
    font-size: 2em;
    text-align: center;
  }
</style>

<script>

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      greeting: 'Hello jesse-trades-info'
    }
  },
  computed: {},
  mounted () {
    this.$axios
      .$post('/api/test-api', {})
      .then((res) => {
        console.log('ok', res)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {}
}
</script>
