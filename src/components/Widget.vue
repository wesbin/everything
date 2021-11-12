<template>
  <component :is="componentLoader" :widgetStyle="widget.style"></component>
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
      return defineAsyncComponent(() =>
        import(`@/components/widget/${this.widget.type}`)
      );
    },
  },
};
</script>

<style scoped></style>
