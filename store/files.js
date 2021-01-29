export const state = () => ({
  backtestsFileNames: []
})

export const mutations = {
  SET_BACKTESTS_FILE_NAMES (state, payload) {
    state.backtestsFileNames = payload
  },
  REMOVE_BACKTESTS_FILE_NAME (state, index) {
    state.backtestsFileNames.splice(index, 1)
  }
}

export const actions = {
  async getFilesList ({ commit }) {
    await this.$axios
      .$get(`${process.env.baseUrl}/api/files-list`)
      .then((result) => {
        commit('SET_BACKTESTS_FILE_NAMES', result)
      })
  },
  async removeFile ({ state, commit }, fileName) {
    await this.$axios
      .$delete(`${process.env.baseUrl}/api/delete-file`, {
        params: {
          file_name: fileName
        }
      })
      .then(() => {
        const index = state.backtestsFileNames.findIndex((el) => {
          return el === fileName
        })

        if (index !== -1) {
          commit('REMOVE_BACKTESTS_FILE_NAME', index)
        }
      })
  }
}
