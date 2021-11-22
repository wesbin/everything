<template>
  <div class="memo" ref="float" :style="widgetStyle">
    <div class="header" @mousedown="$_float_dragMouseDown"></div>
    <div>
      <textarea class="content"></textarea>
    </div>
  </div>
</template>

<script>
import float from '@/mixins/float';

export default {
  name: 'Memo',
  mixins: [float],
  props: {
    widgetStyle: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.memo {
  display: grid;
  grid-template-rows: 20px auto;
  position: absolute;
  background: $menu;
  width: 200px;
  height: 200px;
  resize: both;
  overflow: hidden;
  z-index: 1;
  border: 1px solid $float-menu;
  .header {
    background: $menu-header;
  }
  .content {
    width: 100%;
    height: 100%;
    background: $menu;
  }
}
</style>
