<template>
  <div class="memo">
    <div class="header" @mousedown="floatMousedown">
      <SVGLoader svg-title="delete" @click="closeMemo" class="delete-svg"></SVGLoader>
    </div>
    <MemoTextarea :widget="widget"></MemoTextarea>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import SVGLoader from '@/components/utils/SVGLoader';
import MemoTextarea from '@/components/widget/memo/MemoTextarea';

export default {
  name: 'Memo',
  components: { MemoTextarea, SVGLoader },
  data() {
    return {
      memoContents: '',
    };
  },
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('widget', ['getDrag']),
  },
  methods: {
    closeMemo() {
      if (!this.getDrag) {
        this.hideWidget(this.widget);
      }
    },
    floatMousedown(e) {
      this.$emit('floatMousedown', e);
    },
    ...mapMutations('widget', ['hideWidget']),
  },
};
</script>

<style lang="scss" scoped>
.memo {
  color: $dark-font;
  display: grid;
  grid-template-rows: 20px auto;
  width: 200px;
  height: 200px;
  resize: both;
  overflow: hidden;
  z-index: 1;
  border: 1px solid $float-menu;

  .header {
    background: $menu-header;
  }

  .delete-svg {
    margin-right: 8px;
    float: right;
    cursor: pointer;
    height: 20px;
  }
}
</style>
