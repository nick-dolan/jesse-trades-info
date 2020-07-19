<template>
  <label
    class="custom-file-upload"
    @dragover.prevent="dragover"
    @dragleave="dragleave"
    @drop.prevent="drop">
    <input
      class="d-none"
      accept="application/JSON"
      type="file"
      @change="onFileUpload">
    Drag and drop a json file here or click
  </label>
</template>

<style lang="scss">
  .custom-file-upload {
    display: flex;
    justify-content: center;
    border: 1px dashed #ccc;
    align-items: center;
    padding: 30px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    color: var(--font-color);
    &:hover, &.is-active {
      background-color: var(--bg-secondary-color);
    }
  }
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
  watch: {
    file (value) {
      if (value !== undefined) {
        this.onSubmit()
      }
    }
  },
  mounted () {},
  methods: {
    onFileUpload (event) {
      this.file = event.target.files[0]
    },
    dragover (event) {
      event.currentTarget.classList.add('is-active')
    },
    dragleave (event) {
      event.currentTarget.classList.remove('is-active')
    },
    drop (event) {
      this.file = event.dataTransfer.files[0]
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('backtest', this.file, this.file.name)

      this.$axios
        .$post('/api/upload', formData)
        .then((fileName) => {
          console.log(fileName)

          this.$router.push(`/trades/${fileName}`)
        })
    }
  }
}
</script>
