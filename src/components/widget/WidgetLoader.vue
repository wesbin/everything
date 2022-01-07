<template>
  <template v-for="(widget, index) in this.getWidgetList" :key="index">
    <Widget :widget="widget"></Widget>
  </template>
</template>

<script>
import { useStore } from 'vuex';

import Widget from '@/components/widget/Widget';
import { computed } from 'vue';

export default {
  name: 'WidgetLoader',
  components: { Widget },
  setup() {
    const store = useStore();
    const getWidgetList = computed(() => store.getters['widget/getWidgetList']);
    return {
      getWidgetList,
    };
  },
};
</script>

<style scoped></style>
