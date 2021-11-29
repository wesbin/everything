<template>
  <component :is="componentLoader" :widget="widget"></component>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Widget',
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  computed: {
    componentLoader() {
      if (this.widget.visible) {
        return defineAsyncComponent(() => import(`@/components/widget/${this.widget.type}`));
      }
      return false;
    },
  },
};
</script>

<style scoped></style>
