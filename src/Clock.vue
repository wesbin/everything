<template>
  <div>
    <div class="time">
      {{ this.getTime.hours }}
      <span>:</span>
      {{ this.getTime.minutes }}
    </div>
    <div class="date">
      {{ this.getDate }}
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('clock')

export default {
  name: 'Clock',
  computed: {
    ...mapGetters(['getTime', 'getDate']),
  },
  methods: {
    ...mapActions(['ticTacClock']),
    ...mapMutations(['setDate'])
  },
  created() {
    this.ticTacClock()
    this.setDate()
  },
}
</script>

<style scoped>
.time {
  font-size: 12em;
}
.date {
  font-size: 2em;
  text-align: right;
}
</style>