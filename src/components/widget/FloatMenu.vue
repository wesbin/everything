<template>
  <div class="float-menu" :class="{ open: toggle }" @mousedown="floatMousedown">
    <ButtonPlusMinus @toggle="toggleMenu" :toggle="toggle"></ButtonPlusMinus>
    <WidgetList :toggle="toggle" :widget="widget"></WidgetList>
  </div>
</template>

<script>
import ButtonPlusMinus from '@/components/widget/ButtonPlusMinus';
import WidgetList from '@/components/widget/WidgetList';
import { mapGetters } from 'vuex';

export default {
  name: 'FloatMenu',
  components: { WidgetList, ButtonPlusMinus },
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
    floatMousedown(e) {
      this.$emit('floatMousedown', e);
    },
  },
};
</script>

<style lang="scss" scoped>
.float-menu {
  z-index: 2147483647 !important;
  background: $background;
  //background: $float-menu-background;

  &.open {
    border: solid 2px $float-menu;
    border-radius: 2px;
    width: 125px;
  }
}
</style>
