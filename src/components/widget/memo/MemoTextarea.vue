<script setup>
const props = defineProps({
  contents: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['updateMemoContents']);

const updateMemoContents = (e) => emit('updateMemoContents', e.target.value);
</script>

<template>
  <textarea class="memo-textarea" :value="contents" @input="updateMemoContents"></textarea>
</template>

<style lang="scss" scoped>
.memo-textarea {
  width: 100%;
  height: 100%;
  background: $menu;
}
</style>
