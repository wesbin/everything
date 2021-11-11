<template>
  <component :is="componentLoader"></component>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Widget',
  props: {
    widget: {
      type: String,
    },
  },
  computed: {
    componentLoader() {
      return defineAsyncComponent(() => import('@/components/widget/Memo'));
    },
  },
};
</script>

<style scoped></style>
