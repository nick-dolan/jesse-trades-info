export const state = () => ({
  backtestsFileNames: []
})

export const mutations = {
  SET_BACKTESTS_FILE_NAMES (state, payload) {
    state.backtestsFileNames = payload
  }
}
