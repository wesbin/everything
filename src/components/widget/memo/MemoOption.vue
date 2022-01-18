<template>
  <div>
    <teleport to="body">
      <div class="memo-option click-menu" :style="memoOptionPosition">
        <div @click="showMemo">메모 열기</div>
        <div @click="deleteMemo">메모 삭제</div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: 'MemoOption',
  props: {
    memoOptionPosition: {
      required: true,
      type: Object,
    },
  },
  setup(props, { emit }) {
    return {
      showMemo: () => emit('showMemo'),
      deleteMemo: () => emit('deleteMemo'),
    };
  },
};
</script>

<style lang="scss" scoped>
.memo-option {
  position: absolute;
  z-index: 2147483647;
  vertical-align: center;

  div {
    border: 1px solid $float-menu;
    background-color: $menu-header;
    padding: 2px 4px;
  }
}
</style>
