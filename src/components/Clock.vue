<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
store.dispatch('clock/initClock');

const getTime = computed(() => store.getters['clock/getTime']);
const getDate = computed(() => store.getters['clock/getDate']);
</script>

<template>
  <div class="clock">
    <div class="time">
      {{ getTime.hours }}
      <span class="blink">:</span>
      {{ getTime.minutes }}
    </div>
    <div class="date">
      {{ getDate }}
    </div>
  </div>
</template>

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
