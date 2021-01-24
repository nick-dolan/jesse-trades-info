<template>
  <section class="table-wrapper mb-40">
    <h2>Uploaded backtests</h2>

    <table v-if="backtestsFileNames.length > 0" class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Remove</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in backtestsFileNames"
          :key="i"
          class="is-pointer"
          @click="$router.push(`/trades/${item}`)">
          <td>
            <span class="mono-font text-capitalize">{{ item }}</span>
          </td>

          <td>
            <div
              class="remove-item"
              @click.stop="deleteBacktest(item)">
              <minusSquare
                class="icon"
                width="21px"/>
            </div>
          </td>

          <td>
            <nuxt-link :to="`/trades/${item}`">
              Link
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="text-grey">
      There is no uploaded backtests yet.
    </p>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import minusSquare from '@/static/svg/minus-square.svg'

export default {
  name: 'BacktestsList',
  components: {
    minusSquare
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      backtestsFileNames: state => state.files.backtestsFileNames
    })
  },
  mounted () {
  },
  methods: {
    deleteBacktest (fileName) {
      this.$store.dispatch('files/removeFile', fileName)
    }
  }
}
</script>

<style scoped lang="scss">
  .remove-item {
    display: flex;
    align-items: center;

    svg {
      color: var(--color-grey);

      &:hover {
        color: var(--color-error);
      }
    }
  }
</style>
