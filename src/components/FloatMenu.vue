<template>
  <div
    ref="float"
    class="float-menu"
    :class="{ open: toggle }"
    @mousedown="dragMouseDown"
  >
    <ButtonPlusMinus @toggle="toggleMenu" :toggle="toggle"></ButtonPlusMinus>
    <WidgetList :toggle="toggle"></WidgetList>
  </div>
</template>

<script>
import ButtonPlusMinus from '@/components/ButtonPlusMinus';
import WidgetList from '@/components/WidgetList';
import float from '@/mixins/float';

export default {
  name: 'FloatMenu',
  components: { WidgetList, ButtonPlusMinus },
  mixins: [float],
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    toggleMenu() {
      if (!this.drag) {
        this.toggle = !this.toggle;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.float-menu {
  position: absolute;
  z-index: 9;
  width: 10vw;
  min-width: 100px;
  max-width: 150px;
  left: 13%;
  top: 13%;

  &.open {
    border: solid 2px $float-menu;
    border-radius: 2px;
  }
}
</style>
