<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const props = defineProps({
  toggle: {
    type: Boolean,
    required: true,
  },
  widget: {
    type: Object,
    required: true,
  },
});

const store = useStore();

// 메모 리스트 보이기 혹은 생성
const getDrag = computed(() => store.getters['widget/getDrag']);
const addWidget = (payload) => store.dispatch('widget/addWidget', payload);
const showMemoList = () => {
  if (!getDrag.value) {
    addWidget({
      type: 'memo/MemoList',
      isSingle: true,
      widget: props.widget,
    });
  }
};
</script>

<template>
  <div class="widget-list" v-show="toggle">
    <div class="widget click-menu" @click="showMemoList">MemoList</div>
  </div>
</template>

<style lang="scss" scoped>
.widget-list {
  background: $float-menu;

  .widget {
    padding-left: 4px;
    padding-top: 4px;
  }
}
</style>
