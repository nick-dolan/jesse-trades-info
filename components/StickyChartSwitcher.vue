<template>
  <div class="form-check form-switch">
    <label
      class="form-check-label user-select-none text-grey"
      for="sticky_chart_switch">Sticky Chart</label>

    <input
      id="sticky_chart_switch"
      v-model="isStickyChartSwitch"
      class="form-check-input"
      type="checkbox">
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Hello',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      isStickyChart: state => state.settings.isStickyChart
    }),
    isStickyChartSwitch: {
      get () {
        return this.isStickyChart
      },
      set (value) {
        this.setIsStickyChart(value)
      }
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions({
      setIsStickyChart: 'settings/setIsStickyChart'
    })
  }
}
</script>

<style lang="scss">

</style>
