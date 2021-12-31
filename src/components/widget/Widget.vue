<template>
  <div ref="float" class="widget" :style="widget.style">
    <component :is="componentLoader" :widget="widget" @floatMousedown="dragMouseDown"></component>
    <!--    <component :is="componentLoader" :widget="widget" @floatMousedown="$_float_dragMouseDown"></component>-->
  </div>
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import floatWidget from '@/composables/floatWidget';

export default {
  name: 'Widget',
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // 지금은 사실 따로 빼서 관리하는게 의미가 없긴 해
    const { dragMouseDown, float } = floatWidget(props.widget);

    const componentLoader = computed(() => {
      if (props.widget.visible) {
        return defineAsyncComponent(() => import(`@/components/widget/${props.widget.type}`));
      }
      return false;
    });
    return {
      componentLoader,
      dragMouseDown,
      float,
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
