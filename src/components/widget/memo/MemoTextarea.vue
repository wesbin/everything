<template>
  <textarea class="memo-textarea" :value="contents" @input="updateMemoContents"></textarea>
</template>
<script>
export default {
  name: 'MemoTextarea',
  props: {
    contents: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    return {
      updateMemoContents: (e) => emit('updateMemoContents', e.target.value),
    };
  },
};
</script>

<style lang="scss" scoped>
.memo-textarea {
  width: 100%;
  height: 100%;
  background: $menu;
}
</style>
