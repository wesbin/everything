<template>
  <div class="memo-list">
    <div class="field-wrap" @mousedown="floatMousedown">
      <div class="field start">
        <SVGLoader svg-title="plus" @click="addMemo" class="plus-svg"></SVGLoader>
      </div>
      <div class="field end">
        <SVGLoader svg-title="delete" @click="closeMemoList" class="delete-svg"></SVGLoader>
      </div>
    </div>
    <div class="memos">
      <div
        class="memo"
        @click="clickMemo(memoWidget)"
        v-for="(memoWidget, index) in this.filterTypeWidgetList('memo/Memo')"
        :key="index"
      >
        <div class="header"></div>
        <div>
          <MemoTextarea disabled :widget="memoWidget"></MemoTextarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import SVGLoader from '@/components/utils/SVGLoader';
import MemoTextarea from '@/components/widget/memo/MemoTextarea';

export default {
  name: 'MemoList',
  components: { MemoTextarea, SVGLoader },
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('widget', ['getDrag']),
    ...mapGetters('widget', ['filterTypeWidgetList']),
  },
  methods: {
    addMemo() {
      if (!this.getDrag) {
        this.addWidget({
          type: 'memo/Memo',
          isSingle: false,
          widget: this.widget,
        });
      }
    },
    clickMemo(memoWidget) {
      this.showWidget(memoWidget);
    },
    closeMemoList() {
      if (!this.getDrag) {
        this.hideWidget(this.widget);
      }
    },
    floatMousedown(e) {
      this.$emit('floatMousedown', e);
    },
    ...mapActions('widget', ['addWidget']),
    ...mapMutations('widget', ['showWidget', 'hideWidget']),
  },
};
</script>

<style lang="scss" scoped>
.memo-list {
  display: grid;
  grid-template-rows: 20px auto;
  padding: 8px;
  gap: 10px;
  width: 320px;
  height: 620px;
  z-index: 1;
  background: $menu-list;

  .field-wrap {
    display: flex;

    .field {
      display: flex;
      flex: 1;
      gap: 10px;

      &.end {
        justify-content: flex-end;
      }

      &.start {
        justify-content: flex-start;
      }

      .delete-svg {
        cursor: pointer;
        height: 20px;
      }

      .plus-svg {
        cursor: pointer;
        height: 20px;
      }
    }
  }

  .memos {
    overflow: scroll;
    padding-right: 4px;

    .memo {
      display: grid;
      grid-template-rows: 10px auto;
      width: 100%;
      min-height: 100px;
      max-height: 300px;
      margin-bottom: 10px;

      .header {
        background: $menu-header;
      }

      &:hover {
        .header {
          background: $memo-hover;
        }
      }
    }
  }
}
</style>
