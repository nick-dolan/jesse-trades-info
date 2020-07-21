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
    Drag and drop a json file or click here
  </label>
</template>

<style lang="scss">
  .custom-file-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    color: var(--font-color);
    transition: background-color 100ms linear;
    background-image: linear-gradient(90deg, silver 50%, transparent 50%), linear-gradient(90deg, silver 50%, transparent 50%), linear-gradient(0deg, silver 50%, transparent 50%), linear-gradient(0deg, silver 50%, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: 6px 1px, 6px 1px, 1px 6px, 1px 6px;
    background-position: left top, right bottom, left bottom, right top;
    animation: border-dance 1s infinite linear;
    &:hover, &.is-active {
      background-color: var(--bg-secondary-color);
    }
    @keyframes border-dance {
      0% {
        background-position: left top, right bottom, left bottom, right top;
      }
      100% {
        background-position: left 6px top, right 6px bottom, left bottom 6px, right top 6px;
      }
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
