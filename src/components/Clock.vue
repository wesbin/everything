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
import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapActions } = createNamespacedHelpers("clock");

export default {
  name: "Clock",
  computed: {
    ...mapGetters(["getTime", "getDate"]),
  },
  methods: {
    ...mapActions(["initClock"]),
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
