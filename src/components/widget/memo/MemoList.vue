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
      <template v-for="(memoWidget, index) in this.filterTypeWidgetList('memo/Memo')" :key="index">
        <Memo
          v-if="!memoWidget.delete"
          :memoInList="true"
          :widget="memoWidget"
          @dblClickShowMemo="dblClickShowMemo"
        ></Memo>
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
    const store = useStore();

    const filterTypeWidgetList = computed(() => store.getters['widget/filterTypeWidgetList']);
    // 메모 추가
    const addWidget = (payload) => store.dispatch('widget/addWidget', payload);
    const addMemo = () => {
      if (!getDrag.value) {
        addWidget({
          type: 'memo/Memo',
          isSingle: false,
          visible: false,
          widget: props.widget,
          contents: '',
        });
      }
    };
    // 더블클릭해서 메모 열기
    const showWidget = (widget) => store.commit('widget/showWidget', widget);
    const dblClickShowMemo = (memoWidget) => {
      showWidget(memoWidget);
    };
    // 메모 리스트 위젯 닫기
    const getDrag = computed(() => store.getters['widget/getDrag']);
    const hideWidget = (widget) => store.commit('widget/hideWidget', widget);
    const closeMemoList = () => {
      if (!getDrag.value) {
        hideWidget(props.widget);
      }
    };
    // 위젯 이동
    const dragMouseDown = (e) => emit('dragMouseDown', e);

    return {
      addMemo,
      dblClickShowMemo,
      closeMemoList,
      dragMouseDown,
      filterTypeWidgetList,
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
