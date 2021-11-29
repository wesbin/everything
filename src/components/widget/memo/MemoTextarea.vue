<template>
  <textarea class="memo-textarea" :value="modelValue" @input="updateModelValue"></textarea>
</template>
<script>
import {mapActions} from 'vuex';

export default {
  name: 'MemoTextarea',
  props: ['modelValue'],
  methods: {
    updateModelValue(event) {
      const inputValue = event.target.value;
      this.$emit('update:modelValue', inputValue);
      this.updateWidget()
    },
    ...mapActions('widget', ['addWidget', 'updateWidget']),
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
