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
    <div class="list-body">
      <div
        class="list-item"
        @click="clickMemo(memoWidget)"
        v-for="(memoWidget, index) in this.filterTypeWidgetList('memo/Memo')"
        :key="index"
      >
        <Memo :memoInList="true" :widget="memoWidget"></Memo>
      </div>
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
  methods: {
    floatMousedown(e) {
      this.$emit('floatMousedown', e);
    },
  },
  setup(props) {
    const store = useStore();
    const getDrag = computed(() => store.getters['widget/getDrag']);
    const filterTypeWidgetList = computed(() => store.getters['widget/filterTypeWidgetList']);
    const addWidget = (payload) => store.dispatch('widget/addWidget', payload);
    const showWidget = (widget) => store.commit('widget/showWidget', widget);
    const hideWidget = (widget) => store.commit('widget/hideWidget', widget);

    const addMemo = () => {
      if (!getDrag.value) {
        addWidget({
          type: 'memo/Memo',
          isSingle: false,
          widget: props.widget,
        });
      }
    };

    const clickMemo = (memoWidget) => {
      showWidget(memoWidget);
    };

    const closeMemoList = () => {
      if (!getDrag.value) {
        hideWidget(props.widget);
      }
    };

    return {
      addMemo,
      clickMemo,
      closeMemoList,
      filterTypeWidgetList,
    };
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

  .list-body {
    overflow: scroll;
    padding-right: 4px;
    color: $dark-font;

    .list-item {
      display: grid;
      grid-template-rows: 10px auto;
      width: 100%;
      height: 100px;
      margin-bottom: 10px;
    }
  }
}
</style>
