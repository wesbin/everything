<template>
  <div class="memo-list" ref="float" :style="widgetStyle">
    <div class="flex-fix" @mousedown="$_float_dragMouseDown">
      <div class="field start">
        <img class="plus-svg" src="@/assets/icon/plus-solid.svg" alt="+" @click="addMemo" />
      </div>
      <div class="field end">
        <img class="delete-svg" src="@/assets/icon/times-solid.svg" alt="X" @click="closeMemoList" />
      </div>
    </div>
    <div class="flex-fluid">TEST</div>
  </div>
</template>

<script>
import float from '@/mixins/float';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MemoList',
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
    addMemo() {
      if (!this.getDrag) {
        this.addWidget({
          type: 'memo/Memo',
          isSingle: false,
        });
      }
    },
    closeMemoList() {
      if (!this.getDrag) {
        this.closeWidget({ id: this.widgetId, type: 'memo/MemoList' });
      }
    },
    ...mapActions('widget', ['addWidget', 'closeWidget']),
  },
};
</script>

<style lang="scss" scoped>
.memo-list {
  display: grid;
  grid-template-rows: 20px auto;
  padding: 8px;
  gap: 10px;
  position: absolute;
  width: 320px;
  height: 620px;
  z-index: 1;
  background: $menu-list;

  .flex-fix {
    display: flex;
    flex: 0 0 0;

    .delete-svg {
      cursor: pointer;
      height: 20px;
    }

    .plus-svg {
      cursor: pointer;
      height: 20px;
    }
  }

  .field {
    display: flex;
    flex: 1;

    &.end {
      justify-content: flex-end;
    }

    &.start {
      justify-content: flex-start;
    }
  }

  .flex-fluid {
  }
}
</style>
