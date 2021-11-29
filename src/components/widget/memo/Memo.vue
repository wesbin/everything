<template>
  <div class="memo" ref="float" :style="widget.style">
    <div class="header" @mousedown="$_float_dragMouseDown">
      <SVGLoader svg-title="delete" @click="closeMemo" class="delete-svg"></SVGLoader>
    </div>
    <MemoTextarea v-model="memoContents"></MemoTextarea>
  </div>
</template>

<script>
import float from '@/mixins/float';
import { mapActions, mapGetters } from 'vuex';
import SVGLoader from '@/components/utils/SVGLoader';
import MemoTextarea from '@/components/widget/memo/MemoTextarea';

export default {
  name: 'Memo',
  components: { MemoTextarea, SVGLoader },
  mixins: [float],
  data() {
    return {
      memoContents: '',
    };
  },
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('float', ['getDrag']),
  },
  methods: {
    closeMemo() {
      if (!this.getDrag) {
        this.closeWidget({ id: this.widget.id, type: 'memo/Memo' });
      }
    },
    ...mapActions('widget', ['closeWidget']),
  },
};
</script>

<style lang="scss" scoped>
.memo {
  color: $dark-font;
  display: grid;
  grid-template-rows: 20px auto;
  position: absolute;
  width: 200px;
  height: 200px;
  resize: both;
  overflow: hidden;
  z-index: 1;
  border: 1px solid $float-menu;

  .header {
    background: $menu-header;
  }

  .delete-svg {
    margin-right: 8px;
    float: right;
    cursor: pointer;
    height: 20px;
  }
}
</style>
