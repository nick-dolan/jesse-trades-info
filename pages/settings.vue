<template>
  <section class="container container-small mt-40">
    <h1>
      Settings
    </h1>

    <div class="form-check form-switch ml-5 mb-10">
      <label
        class="form-check-label user-select-none text-grey"
        for="allow_small_timeframes_switch">Allow selecting all timeframes in trades chart.</label>

      <input
        id="allow_small_timeframes_switch"
        v-model="allowAllTimeframesSwitch"
        class="form-check-input"
        type="checkbox">

      <questionCircle
        v-tooltip="{ content: `Be careful. You may catch out of memory <br> error because of the vast number of candles.` }"
        class="text-grey ml-5"
        width="16px"/>
    </div>

    <div class="form-check form-switch ml-5">
      <label
        class="form-check-label user-select-none text-grey"
        for="equity_curve_visibility_switch">Equity Curve chart is visible</label>

      <input
        id="equity_curve_visibility_switch"
        v-model="equityCurveIsVisibleSwitch"
        class="form-check-input"
        type="checkbox">
    </div>
  </section>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import questionCircle from '@/static/svg/question-circle.svg'

export default {
  name: 'Settings',
  components: {
    questionCircle
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      allowAllTimeframes: state => state.settings.allowAllTimeframes,
      equityCurveIsVisible: state => state.settings.equityCurveIsVisible
    }),
    allowAllTimeframesSwitch: {
      get () {
        return this.allowAllTimeframes
      },
      set (value) {
        this.setAllowAllTimeframes(value)
      }
    },
    equityCurveIsVisibleSwitch: {
      get () {
        return this.equityCurveIsVisible
      },
      set (value) {
        this.setEquityCurveIsVisible(value)
      }
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions({
      setAllowAllTimeframes: 'settings/setAllowAllTimeframes',
      setEquityCurveIsVisible: 'settings/setEquityCurveIsVisible'
    })
  },
  head () {
    return {
      title: 'JTI :: Settings'
    }
  }
}
</script>

<style scoped lang="scss">
  .about-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
