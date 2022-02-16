<script setup>
const props = defineProps({
  memoOptionPosition: {
    required: true,
    type: Object,
  },
});

const emit = defineEmits(['showMemo', 'deleteMemo']);

const showMemo = () => emit('showMemo');
const deleteMemo = () => emit('deleteMemo');
</script>

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

<style lang="scss" scoped>
.memo-option {
  position: absolute;
  z-index: 2147483647;
  vertical-align: center;
  border: 1px solid $float-menu;
  background-color: $menu-header;

  div {
    padding: 2px 4px;

    &:hover {
      background-color: $float-menu;
    }
  }
}
</style>
