<template>
  <div class="memo field-wrap --direction-column --shrink-0" :style="memoInListStyle">
    <div class="header field-wrap" @mousedown="dragMouseDown">
      <div class="field" @dblclick="dblClickShowMemo"></div>
      <div class="action-area field --grow-0">
        <SVGLoader v-if="!memoInList" svg-title="delete" @click="closeMemo" class="delete-svg"></SVGLoader>
        <div v-else @click="clickMemoOption">
          <SVGLoader svg-title="option" class="trash-svg"></SVGLoader>
          <MemoOption
            v-if="optionWindow"
            @deleteMemo="deleteMemo"
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
    memoInList: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    // 메모 닫기
    const getDrag = computed(() => store.getters['widget/getDrag']);
    const hideWidget = (widget) => store.commit('widget/hideWidget', widget);
    const closeMemo = () => {
      if (!getDrag.value) {
        hideWidget(props.widget);
      }
    };
    // 더블클릭 해서 메모 열기
    const dblClickShowMemo = () => emit('dblClickShowMemo', props.widget);
    // 위젯 이동
    const dragMouseDown = (e) => emit('dragMouseDown', e);
    // 메모 리스트에 포함된 메모인 경우 스타일 변경
    const memoInListStyle = computed(() => {
      const styleObject = {};
      if (!props.memoInList) {
        styleObject.resize = 'both';
      } else {
        styleObject.width = '100%';
        styleObject.height = '150px';
      }
      return styleObject;
    });
    // 메모 옵션 클릭 시
    const optionWindow = ref(false);
    const memoOptionPosition = reactive({ top: '', left: '' });
    const clickMemoOption = (e) => {
      optionWindow.value = !optionWindow.value;
      const rect = e.currentTarget.getBoundingClientRect();
      memoOptionPosition.top = `${rect.top + rect.height}px`;
      memoOptionPosition.left = `${rect.left}px`;
    };
    // 메모 내용 작성
    const updateWidget = (payload) => store.commit('widget/updateWidget', payload);
    const updateMemoContents = (contents) => {
      updateWidget({
        widget: props.widget,
        contents: contents,
      });
    };
    // 메모 삭제
    const deleteWidget = (id) => store.commit('widget/deleteWidget', id);
    const deleteMemo = () => {
      deleteWidget(props.widget.id);
    };

    return {
      optionWindow,
      dragMouseDown,
      closeMemo,
      memoInListStyle,
      dblClickShowMemo,
      clickMemoOption,
      memoOptionPosition,
      updateMemoContents,
      deleteMemo,
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
