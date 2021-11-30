<template>
  <textarea class="memo-textarea" :value="widget.contents" @input="updateModelValue"></textarea>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'MemoTextarea',
  props: {
    modelValue: {
      type: String,
    },
    widget: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateModelValue(event) {
      this.updateWidget({
        widget: this.widget,
        contents: event.target.value,
      });
    },
    ...mapMutations('widget', ['updateWidget']),
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
