<template>
  <div>
    <teleport to="body">
      <div class="memo-option click-menu" @click="deleteMemo" :style="memoOptionPosition">메모 삭제</div>
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
      deleteMemo: () => emit('deleteMemo'),
    };
  },
};
</script>

<style lang="scss" scoped>
.memo-option {
  position: absolute;
  z-index: 2147483647;
  border: 1px solid $float-menu;
  background-color: $menu-header;
  vertical-align: center;
  padding: 2px 4px;
}
</style>
