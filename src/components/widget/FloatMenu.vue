<template>
  <div class="float-menu" :class="{ open: toggle }" @mousedown="dragMouseDown">
    <ButtonPlusMinus @toggle="toggleMenu" :toggle="toggle"></ButtonPlusMinus>
    <WidgetList :toggle="toggle" :widget="widget"></WidgetList>
  </div>
</template>

<script>
import ButtonPlusMinus from '@/components/widget/ButtonPlusMinus';
import WidgetList from '@/components/widget/WidgetList';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'FloatMenu',
  components: { WidgetList, ButtonPlusMinus },
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    // Vuex
    const store = useStore();
    const toggle = ref(false);
    const getDrag = computed(() => store.getters['widget/getDrag']);
    // Method
    // 메뉴 + - 이벤트
    const toggleMenu = () => {
      if (!getDrag.value) {
        toggle.value = !toggle.value;
      }
    };
    // 위젯 이동
    const dragMouseDown = (e) => emit('dragMouseDown', e);

    return { toggleMenu, toggle, dragMouseDown };
  },
};
</script>

<style lang="scss" scoped>
.float-menu {
  z-index: 2147483647 !important;
  background: $background;

  &.open {
    border: solid 2px $float-menu;
    border-radius: 2px;
    width: 125px;
  }
}
</style>
