<template>
  <div class="memo-list" ref="float" :style="widgetStyle">TEST</div>
</template>

<script>
import float from '@/mixins/float';

export default {
  name: 'MemoList',
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
.memo-list {
  position: absolute;
  width: 320px;
  height: 620px;
  z-index: 1;
  background: $menu-list;
}
</style>
