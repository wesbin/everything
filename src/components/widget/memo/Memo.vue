<template>
  <div class="memo" :style="memoInListStyle">
    <div class="header" @mousedown="floatMousedown">
      <SVGLoader v-if="!memoInList" svg-title="delete" @click="closeMemo" class="delete-svg"></SVGLoader>
      <SVGLoader v-else svg-title="option" class="trash-svg" @click="optionWindow = !optionWindow"></SVGLoader>
    </div>
    <MemoTextarea :widget="widget"></MemoTextarea>
    <div v-if="optionWindow">TEST</div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import SVGLoader from '@/components/utils/SVGLoader';
import MemoTextarea from '@/components/widget/memo/MemoTextarea';
import { computed } from 'vue';

export default {
  name: 'Memo',
  components: { MemoTextarea, SVGLoader },
  data() {
    return {
      memoContents: '',
      optionWindow: false,
    };
  },
  props: {
    widget: {
      type: Object,
      required: true,
    },
    // 메모 리스트 안에 보여지는 메모의 경우
    memoInList: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const getDrag = computed(() => store.getters['widget/getDrag']);
    const hideWidget = (widget) => store.commit('widget/hideWidget', widget);

    const closeMemo = () => {
      if (!getDrag.value) {
        hideWidget(props.widget);
      }
    };

    const memoInListStyle = computed(() => {
      const styleObject = {};
      if (!props.memoInList) {
        styleObject.resize = 'both';
      } else {
        styleObject.width = '100%';
        styleObject.height = '150px';
      }
      return styleObject;
    });

    return {
      floatMousedown: (e) => emit('floatMousedown', e),
      closeMemo,
      memoInListStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.memo {
  color: $dark-font;
  display: grid;
  grid-template-rows: 20px auto;
  width: 200px;
  height: 200px;
  overflow: hidden;
  z-index: 1;
  border: 1px solid $float-menu;

  .header {
    background: $menu-header;
  }

  .trash-svg {
    margin-right: 8px;
    float: right;
    cursor: pointer;
    height: 20px;
  }

  .delete-svg {
    margin-right: 8px;
    float: right;
    cursor: pointer;
    height: 20px;
  }
}
</style>
