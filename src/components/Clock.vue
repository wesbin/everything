<template>
  <div class="clock">
    <div class="time">
      {{ this.getTime.hours }}
      <span class="blink">:</span>
      {{ this.getTime.minutes }}
    </div>
    <div class="date">
      {{ this.getDate }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Clock',
  computed: {
    ...mapGetters('clock', ['getTime', 'getDate']),
  },
  methods: {
    ...mapActions('clock', ['initClock']),
  },
  created() {
    this.initClock();
  },
};
</script>

<style scoped>
.clock {
  cursor: default;
}
.time {
  font-size: 12em;
  line-height: 90%;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.blink {
  animation: blink 2s step-end infinite;
}
.date {
  font-size: 2em;
  text-align: right;
}
</style>
