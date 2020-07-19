const fs = require('fs')
const path = require('path')

export default function ({ store }) {
  if (process.server) {
    /*
    * Get and save to store already uploaded backtests' file names
    * */
    const jsonFiles = fs
      .readdirSync('uploads/')
      .filter(el => /\.json$/.test(el))
      .map(item => path.parse(item).name)

    store.commit('SET_BACKTESTS_FILE_NAMES', jsonFiles)
  }
}
