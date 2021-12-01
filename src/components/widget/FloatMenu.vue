<template>
  <div ref="float" class="float-menu" :class="{ open: toggle }" @mousedown="$_float_dragMouseDown">
    <ButtonPlusMinus @toggle="toggleMenu" :toggle="toggle"></ButtonPlusMinus>
    <WidgetList :toggle="toggle" :widget="widget"></WidgetList>
  </div>
</template>

<script>
import ButtonPlusMinus from '@/components/widget/ButtonPlusMinus';
import WidgetList from '@/components/widget/WidgetList';
import widgetFloat from '@/mixins/widgetFloat';
import { mapGetters } from 'vuex';

export default {
  name: 'FloatMenu',
  components: { WidgetList, ButtonPlusMinus },
  mixins: [widgetFloat],
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      toggle: false,
    };
  },
  computed: {
    ...mapGetters('widget', ['getDrag']),
  },
  methods: {
    toggleMenu() {
      if (!this.getDrag) {
        this.toggle = !this.toggle;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.float-menu {
  position: absolute;
  z-index: 2147483647 !important;
  left: 13%;
  top: 13%;
  background: $background;
  //background: $float-menu-background;

  &.open {
    border: solid 2px $float-menu;
    border-radius: 2px;
    width: 125px;
  }
}
</style>
