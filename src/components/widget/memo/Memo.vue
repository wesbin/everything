<script setup>
import SVGLoader from '@/components/utils/SVGLoader';
import MemoTextarea from '@/components/widget/memo/MemoTextarea';
import MemoOption from '@/components/widget/memo/MemoOption';
import { useStore } from 'vuex';
import { computed, reactive, ref } from 'vue';

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
  // 메모 리스트 안에 보여지는 메모의 경우
  inList: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['dragMouseDown', 'showMemo']);

const _store = useStore();

// 위젯 이동
const dragMouseDown = (e) => emit('dragMouseDown', e);

// 메모 리스트에 포함된 메모인 경우 스타일 변경
const memoInListStyle = computed(() => {
  const styleObject = {};
  if (!props.inList) {
    styleObject.resize = 'both';
  } else {
    styleObject.width = '100%';
    styleObject.height = '150px';
  }
  return styleObject;
});

// 메모 닫기
const getDrag = computed(() => _store.getters['widget/getDrag']);
const hideWidget = (widget) => _store.commit('widget/hideWidget', widget);
const closeMemo = () => {
  if (!getDrag.value) {
    hideWidget(props.widget);
  }
};
// 더블클릭 해서 메모 열기
const showMemo = () => emit('showMemo', props.widget);

// 메모 내용 업데이트
const updateWidget = (payload) => _store.commit('widget/updateWidget', payload);
const updateMemoContents = (contents) => {
  updateWidget({
    widget: props.widget,
    contents: contents,
  });
};

// option 보이기 안 보이기
const optionWindow = ref(false);
// option 위치 설정
const memoOptionPosition = reactive({ top: '', left: '' });

// 메모 옵션 클릭 시
const clickMemoOption = (e) => {
  optionWindow.value = !optionWindow.value;
  const rect = e.currentTarget.getBoundingClientRect();
  memoOptionPosition.top = `${rect.top + rect.height}px`;
  memoOptionPosition.left = `${rect.left}px`;
};

// 메모 삭제
const deleteWidget = (id) => _store.commit('widget/deleteWidget', id);
const deleteMemo = () => deleteWidget(props.widget.id);
</script>

<template>
  <div class="memo field-wrap --direction-column --shrink-0" :style="memoInListStyle" @resize="reSize">
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
