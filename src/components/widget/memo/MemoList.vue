<template>
  <div class="memo-list field-wrap --direction-column">
    <div class="field-wrap" @mousedown="dragMouseDown">
      <div class="field --start">
        <SVGLoader svg-title="plus" @click="addMemo" class="plus-svg"></SVGLoader>
      </div>
      <strong class="no-select">MemoList</strong>
      <div class="field --end">
        <SVGLoader svg-title="delete" @click="closeMemoList" class="delete-svg"></SVGLoader>
      </div>
    </div>
    <div class="list-body field-wrap --direction-column">
      <template v-for="(memoWidget, index) in filterTypeWidgetList('memo/Memo')" :key="index">
        <Memo v-if="!memoWidget.delete" :inList="true" :widget="memoWidget" @showMemo="showWidget"></Memo>
      </template>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import SVGLoader from '@/components/utils/SVGLoader';
import Memo from '@/components/widget/memo/Memo';
import { computed } from 'vue';

export default {
  name: 'MemoList',
  components: { Memo, SVGLoader },
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const _store = useStore();
    const store = {
      filterTypeWidgetList: computed(() => _store.getters['widget/filterTypeWidgetList']),
      getDrag: computed(() => _store.getters['widget/getDrag']),
      hideWidget: (widget) => _store.commit('widget/hideWidget', widget),
      showWidget: (widget) => _store.commit('widget/showWidget', widget),
      addWidget: (payload) => _store.dispatch('widget/addWidget', payload),
    };
    // Initialize
    const init = {
      dragMouseDown: (e) => emit('dragMouseDown', e),
    };

    const memoList = {
      // 메모 추가
      addMemo: () => {
        if (!store.getDrag.value) {
          store.addWidget({
            widget: props.widget,
            type: 'memo/Memo',
            isSingle: false,
            visible: false,
            contents: '',
          });
        }
      },
      // 메모 리스트 위젯 닫기
      closeMemoList: () => {
        if (!store.getDrag.value) {
          store.hideWidget(props.widget);
        }
      },
    };

    return {
      ...init,
      ...memoList,
      showWidget: store.showWidget,
      filterTypeWidgetList: store.filterTypeWidgetList,
    };
  },
};
</script>

<style lang="scss" scoped>
.memo-list {
  padding: 8px;
  gap: 10px;
  width: 320px;
  height: 620px;
  z-index: 1;
  background: $menu-list;

  .delete-svg {
    cursor: pointer;
    height: 20px;
  }

  .plus-svg {
    cursor: pointer;
    height: 20px;
  }

  .list-body {
    height: 100%;
    overflow-y: auto;
    overflow-x: visible;
    padding-right: 4px;
    color: $dark-font;
    gap: 10px;
  }
}
</style>
