<template>
  <div class="range-switcher">
    <button
      v-for="(item, i) in timeframes"
      :key="i"
      :disabled="item.value < calculatedTimeframe"
      :class="{ 'active': selectedTimeframe === item.value }"
      @click="getCandlesByFrame(item.value)">
      <i
        v-if="selectedTimeframe === item.value && loading"
        class="sk-wander sk-center d-inline-block">
        <span class="sk-wander-cube"/>
        <span class="sk-wander-cube"/>
        <span class="sk-wander-cube"/>
      </i>

      <span v-else>{{ item.name }}</span>
    </button>
  </div>
</template>

<script>

export default {
  name: 'RangeSwitcher',
  components: {},
  props: {
    trades: {
      type: Array,
      required: true,
      default: () => []
    },
    calculatedTimeframe: {
      type: Number,
      default: null,
      required: true
    },
    candles: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      // Supported timeframes are 1m, 3m, 5m, 15m, 30m, 1h, 2h, 3h, 4h, 6h, 8h, 1D
      timeframes: [
        {
          value: 1,
          name: '1m'
        },
        {
          value: 3,
          name: '3m'
        },
        {
          value: 5,
          name: '5m'
        },
        {
          value: 15,
          name: '15m'
        },
        {
          value: 30,
          name: '30m'
        },
        {
          value: 60,
          name: '1h'
        },
        {
          value: 120,
          name: '2h'
        },
        {
          value: 180,
          name: '3h'
        },
        {
          value: 240,
          name: '4h'
        },
        {
          value: 360,
          name: '6h'
        },
        {
          value: 480,
          name: '8h'
        },
        {
          value: 1440,
          name: '1D'
        }
      ],
      selectedTimeframe: this.calculatedTimeframe,
      loading: false
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    async getCandlesByFrame (timeframe) {
      if (!this.loading && this.trades.length > 0) {
        this.selectedTimeframe = timeframe
        this.loading = true

        await this.$axios
          .$get('/api/candles', {
            params: {
              symbol: this.trades[0].symbol,
              exchange: this.trades[0].exchange,
              entryTimestamp: this.trades[0].opened_at,
              exitTimestamp: this.trades[this.trades.length - 1].closed_at,
              selectedTimeframe: timeframe
            }
          })
          .then((result) => {
            this.$emit('update:candles', result.data)
            this.loading = false
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .range-switcher {
    width: 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    button {
      height: 100%;
      border-radius: 0;
      padding: 0;
      margin: 0;
      outline: 0;
      border: 0;
      transform: none;
      color: #9b9ea4;
      font-size: 10px;
      background-color: #111723;
      font-family: var(--font-family-mono);
      &.active {
        color: white;
        font-weight: bold;
        position: relative;
      }
      &:disabled {
        opacity: 1;
        color: #43474a;
        &:hover {
          color: #43474a;
        }
      }
      &:hover {
        color: var(--color-primary)
      }
    }
  }
</style>
