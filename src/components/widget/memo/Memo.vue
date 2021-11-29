<template>
  <div class="memo" ref="float" :style="widgetStyle">
    <div class="header" @mousedown="$_float_dragMouseDown">
      <SVGLoader svg-title="delete" @click="closeMemo" class="delete-svg"></SVGLoader>
    </div>
    <div>
      <textarea class="content"></textarea>
    </div>
  </div>
</template>

<script>
import float from '@/mixins/float';
import { mapActions, mapGetters } from 'vuex';
import SVGLoader from '@/components/utils/SVGLoader';

export default {
  name: 'Memo',
  components: { SVGLoader },
  mixins: [float],
  props: {
    widgetStyle: {
      type: Object,
      required: true,
    },
    widgetId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('float', ['getDrag']),
  },
  methods: {
    closeMemo() {
      if (!this.getDrag) {
        this.closeWidget({ id: this.widgetId, type: 'memo/Memo' });
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
  background: $menu;
  width: 200px;
  height: 200px;
  resize: both;
  overflow: hidden;
  z-index: 1;
  border: 1px solid $float-menu;

  .header {
    background: $menu-header;
  }

  .content {
    width: 100%;
    height: 100%;
    background: $menu;
  }

  .delete-svg {
    margin-right: 8px;
    float: right;
    cursor: pointer;
    height: 20px;
  }
}
</style>
