export const state = () => ({
  allowAllTimeframes: false,
  isStickyChart: true,
  equityCurveIsVisible: true
})

export const mutations = {
  SET_ALLOW_ALL_TIMEFRAMES (state, payload) {
    state.allowAllTimeframes = payload
  },
  SET_IS_STICKY_CHART (state, payload) {
    state.isStickyChart = payload
  },
  SET_EQUITY_CURVE_IS_VISIBLE (state, payload) {
    state.equityCurveIsVisible = payload
  }
}

export const actions = {
  setAllowAllTimeframes ({ commit }, payload) {
    commit('SET_ALLOW_ALL_TIMEFRAMES', payload)
  },
  setIsStickyChart ({ commit }, payload) {
    commit('SET_IS_STICKY_CHART', payload)
  },
  setEquityCurveIsVisible ({ commit }, payload) {
    commit('SET_EQUITY_CURVE_IS_VISIBLE', payload)
  }
}
