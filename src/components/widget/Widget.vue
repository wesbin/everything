<template>
  <div ref="float" class="widget" :style="widget.style">
    <component :is="componentLoader" :widget="widget" @floatMousedown="$_float_dragMouseDown"></component>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import widgetFloat from '@/mixins/widgetFloat';

export default {
  name: 'Widget',
  mixins: [widgetFloat],
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

<style scoped>
.widget {
  position: absolute;
  left: 13%;
  top: 13%;
}
</style>
