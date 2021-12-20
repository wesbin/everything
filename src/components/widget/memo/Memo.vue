<template>
  <div class="memo" :style="memoInListStyle">
    <div class="header" @mousedown="floatMousedown">
      <SVGLoader v-if="!memoInList" svg-title="delete" @click="closeMemo" class="delete-svg"></SVGLoader>
      <SVGLoader v-else svg-title="option" class="trash-svg" @click="optionWindow = !optionWindow"></SVGLoader>
    </div>
    <MemoTextarea :widget="widget"></MemoTextarea>
    <div v-if="optionWindow">TEST</div>
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
      optionWindow: false,
    };
  },
  props: {
    widget: {
      type: Object,
      required: true,
    },
    // 메모 리스트 안에 보여지는 메모의 경우
    memoInList: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    memoInListStyle() {
      const styleObject = {};
      if (!this.memoInList) {
        styleObject.resize = 'both';
      } else {
        styleObject.width = '100%';
        styleObject.height = '150px';
      }
      return styleObject;
    },
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
  overflow: hidden;
  z-index: 1;
  border: 1px solid $float-menu;

  .header {
    background: $menu-header;
  }

  .trash-svg {
    margin-right: 8px;
    float: right;
    cursor: pointer;
    height: 20px;
  }

  .delete-svg {
    margin-right: 8px;
    float: right;
    cursor: pointer;
    height: 20px;
  }
}
</style>
