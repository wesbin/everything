<template>
  <div class="float-menu" :class="{ open: toggle }" @mousedown="dragMouseDown">
    <ButtonPlusMinus @toggle="toggleMenu" :toggle="toggle"></ButtonPlusMinus>
    <WidgetList :toggle="toggle" :widget="widget"></WidgetList>
  </div>
</template>

<script>
import ButtonPlusMinus from '@/components/widget/navigation/ButtonPlusMinus';
import WidgetList from '@/components/widget/navigation/WidgetList';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Navigation',
  components: { WidgetList, ButtonPlusMinus },
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
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

    return { toggleMenu, toggle, dragMouseDown };
  },
};
</script>

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
