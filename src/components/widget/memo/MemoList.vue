<template>
  <div class="memo-list" ref="float" :style="widgetStyle">
    <div class="fix">
      <SVGLoader title="times-solid"></SVGLoader>
    </div>
    <div class="fluid">TEST</div>
  </div>
</template>

<script>
import float from '@/mixins/float';
import SVGLoader from '@/components/SVGLoader';

export default {
  name: 'MemoList',
  components: { SVGLoader },
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
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 10px;
  position: absolute;
  width: 320px;
  height: 620px;
  z-index: 1;
  background: $menu-list;

  .fix {
    background: #333333;
    flex: 0 0 0;
  }

  .fluid {
    background: #333333;
    flex: 1 1 0;
  }
}
</style>
