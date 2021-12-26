<template>
  <div ref="float" class="widget" :style="widget.style">
    <component :is="componentLoader" :widget="widget" @floatMousedown="$_float_dragMouseDown"></component>
  </div>
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
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
  setup(props) {
    const componentLoader = computed(() => {
      if (props.widget.visible) {
        return defineAsyncComponent(() => import(`@/components/widget/${props.widget.type}`));
      }
      return false;
    });
    return {
      componentLoader,
    };
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
