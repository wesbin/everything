<script setup>
import floatWidget from '@/composables/floating';
import {computed, defineAsyncComponent, onBeforeUnmount, onMounted} from 'vue';

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
});

// fixme 지금은 사실 따로 빼서 관리하는게 의미가 없긴 해 => composable 삭제 ㄱㄱ
const { dragMouseDown, float } = floatWidget(props.widget);
// Dynamic Component Loader
const componentLoader = computed(() => {
  if (props.widget.visible) {
    return defineAsyncComponent(() => import(`@/components/widget/${props.widget.type}`));
  }
  return false;
});

const reSize = () => {
  console.log("@@@");
}

onMounted(() => {
  float.value.addEventListener('resize', reSize)
})

onBeforeUnmount(() => {
  float.value.removeEventListener('resize', reSize)
})
</script>

<template>
  <div ref="float" class="widget" :style="widget.style">
    <component :is="componentLoader" :widget="widget" @dragMouseDown="dragMouseDown"></component>
  </div>
</template>

<style scoped>
.widget {
  position: absolute;
  left: 13%;
  top: 13%;
}
</style>
