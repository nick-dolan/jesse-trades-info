const state = () => ({
  allowAllTimeframes: false,
  isStickyChart: true,
  equityCurveIsVisible: true,
  theme: 'light' // light or dark
})

const mutations = {
  SET_ALLOW_ALL_TIMEFRAMES (state, payload) {
    state.allowAllTimeframes = payload
  },
  SET_IS_STICKY_CHART (state, payload) {
    state.isStickyChart = payload
  },
  SET_EQUITY_CURVE_IS_VISIBLE (state, payload) {
    state.equityCurveIsVisible = payload
  },
  SET_THEME (state, payload) {
    state.theme = payload
  }
}

const getters = {
  theme: state => state.theme
}

const actions = {
  setAllowAllTimeframes ({ commit }, payload) {
    commit('SET_ALLOW_ALL_TIMEFRAMES', payload)
  },
  setIsStickyChart ({ commit }, payload) {
    commit('SET_IS_STICKY_CHART', payload)
  },
  setEquityCurveIsVisible ({ commit }, payload) {
    commit('SET_EQUITY_CURVE_IS_VISIBLE', payload)
  },
  setTheme ({ commit }, payload) {
    commit('SET_THEME', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
