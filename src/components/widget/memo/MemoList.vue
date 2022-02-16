<script setup>
import SVGLoader from '@/components/utils/SVGLoader';
import Memo from '@/components/widget/memo/Memo';

import { useStore } from 'vuex';
import { computed } from 'vue';

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['dragMouseDown']);
const dragMouseDown = (e) => emit('dragMouseDown', e);

const _store = useStore();
const getDrag = computed(() => _store.getters['widget/getDrag']);
const filterTypeWidgetList = computed(() => _store.getters['widget/filterTypeWidgetList']);
const showWidget = (widget) => _store.commit('widget/showWidget', widget);

// 메모 추가
const addWidget = (payload) => _store.dispatch('widget/addWidget', payload);
const addMemo = () => {
  if (!getDrag.value) {
    addWidget({
      widget: props.widget,
      type: 'memo/Memo',
      isSingle: false,
      visible: false,
      contents: '',
    });
  }
};

// 메모 리스트 위젯 닫기
const hideWidget = (widget) => _store.commit('widget/hideWidget', widget);
const closeMemoList = () => {
  if (!getDrag.value) {
    hideWidget(props.widget);
  }
};
</script>

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
