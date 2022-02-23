<script setup>
import { useStore } from 'vuex';

import Widget from '@/components/widget/Widget';
import { computed } from 'vue';

const store = useStore();
const getWidgetList = computed(() => store.getters['widget/getWidgetList']);
</script>

<template>
  <template v-for="(widget, index) in getWidgetList" :key="index">
    <Widget :widget="widget"></Widget>
  </template>
</template>

<style scoped></style>
