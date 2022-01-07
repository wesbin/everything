<template>
  <teleport to="body">
    <div class="memo-option click-menu" :style="memoOptionPosition">메모 삭제</div>
  </teleport>
</template>

<script>
import {useStore} from 'vuex';

export default {
  name: 'MemoOption',
  props: {
    memoOptionPosition: {
      required: true,
      type: Object,
    },
  },
  setup(props, context) {
    const store = useStore();

    // 메모 삭제


    return {};
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
