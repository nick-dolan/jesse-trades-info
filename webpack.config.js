/*
* https://github.com/nuxt/nuxt.js/issues/1881#issuecomment-338157397
* */
module.exports = {
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname),
      '~': require('path').resolve(__dirname)
    }
  }
}
