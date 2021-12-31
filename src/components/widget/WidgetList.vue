<template>
  <div class="widget-list" v-show="toggle">
    <div class="widget no-select" @click="showMemoList">MemoList</div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'WidgetList',
  props: {
    toggle: {
      type: Boolean,
      required: true,
    },
    widget: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // Vuex
    const store = useStore();
    const getDrag = computed(() => store.getters['widget/getDrag']);
    const addWidget = (payload) => store.dispatch('widget/addWidget', payload);
    // Method
    // 메모 리스트 보이기 혹은 생성
    const showMemoList = () => {
      if (!getDrag.value) {
        addWidget({
          type: 'memo/MemoList',
          isSingle: true,
          widget: props.widget,
        });
      }
    };
    return { showMemoList };
  },
};
</script>

<style lang="scss" scoped>
.widget-list {
  background: $float-menu;

  .widget {
    padding-left: 4px;
    padding-top: 4px;
    cursor: pointer;
  }
}
</style>
