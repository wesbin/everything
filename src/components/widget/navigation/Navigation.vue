<script setup>
import ButtonPlusMinus from '@/components/widget/navigation/ButtonPlusMinus';
import WidgetList from '@/components/widget/navigation/WidgetList';

import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['dragMouseDown']);

const store = useStore();
// 메뉴 + - 이벤트
const toggle = ref(true);
const getDrag = computed(() => store.getters['widget/getDrag']);
const toggleMenu = () => {
  if (!getDrag.value) {
    toggle.value = !toggle.value;
  }
};
// 위젯 이동
const dragMouseDown = (e) => emit('dragMouseDown', e);
</script>

<template>
  <div class="float-menu" :class="{ open: toggle }" @mousedown="dragMouseDown">
    <ButtonPlusMinus @toggle="toggleMenu" :toggle="toggle"></ButtonPlusMinus>
    <WidgetList :toggle="toggle" :widget="widget"></WidgetList>
  </div>
</template>

<style lang="scss" scoped>
.float-menu {
  background: $background;
  border: solid 2px $float-menu;
  border-radius: 2px;

  &.open {
    width: 125px;
  }
}
</style>
