<template>
  <textarea class="memo-textarea" :value="widget.contents" @input="updateModelValue"></textarea>
</template>
<script>
import { useStore } from 'vuex';

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
  setup(props) {
    // Vuex
    const store = useStore();
    const updateWidget = (payload) => store.commit('widget/updateWidget', payload);
    // Method
    // 메모 입력
    const updateModelValue = (e) => {
      updateWidget({
        widget: props.widget,
        contents: e.target.value,
      });
    };
    return {
      updateModelValue,
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
