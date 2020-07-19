<template>
  <form @submit.prevent="onSubmit">
    <input type="file" @change="onFileUpload">
    <button>Upload File</button>
  </form>
</template>

<style scoped lang="scss">
</style>

<script>

export default {
  name: 'Upload',
  components: {},
  data () {
    return {
      file: {}
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    onFileUpload (event) {
      this.file = event.target.files[0]
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('backtest', this.file, this.file.name)

      this.$axios
        .$post('/api/upload', formData)
        .then((res) => {
          console.log(res)
        })
    }
  }
}
</script>
