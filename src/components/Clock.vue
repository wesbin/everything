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
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Clock',
  setup() {
    const store = useStore();
    store.dispatch('clock/initClock');
    return {
      getTime: computed(() => store.getters['clock/getTime']),
      getDate: computed(() => store.getters['clock/getDate']),
    };
  },
};
</script>

<style scoped>
.clock {
  cursor: default;
  user-select: none;
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
