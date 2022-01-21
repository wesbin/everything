<template>
  <div class="memo field-wrap --direction-column --shrink-0" :style="memoInListStyle">
    <div class="header field-wrap" @mousedown="dragMouseDown">
      <div class="field" @dblclick="showMemo"></div>
      <div class="action-area field --grow-0">
        <SVGLoader v-if="!inList" svg-title="delete" @click="closeMemo" class="delete-svg"></SVGLoader>
        <div v-else @click="clickMemoOption">
          <SVGLoader svg-title="option" class="trash-svg"></SVGLoader>
          <MemoOption
            v-if="optionWindow"
            @deleteMemo="deleteMemo"
            @showMemo="showMemo"
            :memoOptionPosition="memoOptionPosition"
          ></MemoOption>
        </div>
      </div>
    </div>
    <MemoTextarea @updateMemoContents="updateMemoContents" :contents="widget.contents"></MemoTextarea>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import SVGLoader from '@/components/utils/SVGLoader';
import MemoTextarea from '@/components/widget/memo/MemoTextarea';
import { computed, reactive, ref } from 'vue';
import MemoOption from '@/components/widget/memo/MemoOption';

export default {
  name: 'Memo',
  components: { MemoOption, MemoTextarea, SVGLoader },
  props: {
    widget: {
      type: Object,
      required: true,
    },
    // 메모 리스트 안에 보여지는 메모의 경우
    inList: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // Vuex
    const _store = useStore();
    const store = {
      getDrag: computed(() => _store.getters['widget/getDrag']),
      updateWidget: (payload) => _store.commit('widget/updateWidget', payload),
      hideWidget: (widget) => _store.commit('widget/hideWidget', widget),
      deleteWidget: (id) => _store.commit('widget/deleteWidget', id),
    };
    // fixme 이렇게 정리하는게 보기 좋은가? MemoOption Component 에 단점이 드러나는 듯?
    // Initialize
    const init = {
      // 위젯 이동
      dragMouseDown: (e) => emit('dragMouseDown', e),
      // 메모 리스트에 포함된 메모인 경우 스타일 변경
      memoInListStyle: computed(() => {
        const styleObject = {};
        if (!props.inList) {
          styleObject.resize = 'both';
        } else {
          styleObject.width = '100%';
          styleObject.height = '150px';
        }
        return styleObject;
      }),
    };
    // Memo Component
    const memo = {
      // 메모 닫기
      closeMemo: () => {
        if (!store.getDrag.value) {
          store.hideWidget(props.widget);
        }
      },
      // 더블클릭 해서 메모 열기
      showMemo: () => emit('showMemo', props.widget),
    };
    // MemoTextArea Component
    const memoTextArea = {
      updateMemoContents: (contents) => {
        store.updateWidget({
          widget: props.widget,
          contents: contents,
        });
      },
    };
    // MemoOption Component
    const memoOption = {
      optionWindow: ref(false),
      memoOptionPosition: reactive({ top: '', left: '' }),
      // 메모 옵션 클릭 시
      clickMemoOption: (e) => {
        memoOption.optionWindow.value = !memoOption.optionWindow.value;
        const rect = e.currentTarget.getBoundingClientRect();
        memoOption.memoOptionPosition.top = `${rect.top + rect.height}px`;
        memoOption.memoOptionPosition.left = `${rect.left}px`;
      },
      // 메모 삭제
      deleteMemo: () => store.deleteWidget(props.widget.id),
    };
    return {
      dragMouseDown: init.dragMouseDown,
      memoInListStyle: init.memoInListStyle,
      closeMemo: memo.closeMemo,
      showMemo: memo.showMemo,
      updateMemoContents: memoTextArea.updateMemoContents,
      optionWindow: memoOption.optionWindow,
      clickMemoOption: memoOption.clickMemoOption,
      memoOptionPosition: memoOption.memoOptionPosition,
      deleteMemo: memoOption.deleteMemo,
    };
  },
};
</script>

<style lang="scss" scoped>
.memo {
  color: $dark-font;
  width: 200px;
  height: 200px;
  z-index: 1;
  overflow: auto;
  border: 1px solid $float-menu;
  box-sizing: border-box;

  .header {
    background: $menu-header;
  }

  .action-area {
    position: relative;
  }

  .trash-svg {
    margin: 0 8px;
    float: right;
    cursor: pointer;
    height: 20px;
  }

  .delete-svg {
    margin: 0 8px;
    float: right;
    cursor: pointer;
    height: 20px;
  }
}
</style>
