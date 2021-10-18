<template>
  <div>
    <div class="time">
      {{ this.getTime }}
    </div>
    <div class="date">
      {{ this.getDate }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

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
  }
}
</script>

<style scoped>
.time {
  font-size: 7em;
}
.date {
  font-size: 4em;
  text-align: right;
}
</style>