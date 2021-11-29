<template>
  <div class="memo-list" ref="float" :style="widgetStyle">
    <div class="field-wrap" @mousedown="$_float_dragMouseDown">
      <div class="field start">
        <SVGLoader svg-title="plus" @click="addMemo" class="plus-svg"></SVGLoader>
      </div>
      <div class="field end">
        <SVGLoader svg-title="delete" @click="closeMemoList" class="delete-svg"></SVGLoader>
      </div>
    </div>
    <div class="body">
      <div class="memo">
        <div class="header"></div>
        <div>
          <textarea class="content">
          </textarea>
        </div>
      </div>

      <div class="memo">
        <div class="header"></div>
        <div>
          <textarea class="content">
          </textarea>
        </div>
      </div>

      <div class="memo">
        <div class="header"></div>
        <div>
          <textarea class="content">
          </textarea>
        </div>
      </div>

      <div class="memo">
        <div class="header"></div>
        <div>
          <textarea class="content">
          </textarea>
        </div>
      </div>

      <div class="memo">
        <div class="header"></div>
        <div>
          <textarea class="content">
          </textarea>
        </div>
      </div>

      <div class="memo">
        <div class="header"></div>
        <div>
          <textarea class="content">
          </textarea>
        </div>
      </div>

      <div class="memo">
        <div class="header"></div>
        <div>
          <textarea class="content">
          </textarea>
        </div>
      </div>

      <div class="memo">
        <div class="header"></div>
        <div>
          <textarea class="content">
          </textarea>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import float from '@/mixins/float';
import { mapActions, mapGetters } from 'vuex';
import SVGLoader from '@/components/utils/SVGLoader';

export default {
  name: 'MemoList',
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

  .field-wrap {
    display: flex;

    .field {
      display: flex;
      flex: 1;

      &.end {
        justify-content: flex-end;
      }

      &.start {
        justify-content: flex-start;
      }

      .delete-svg {
        cursor: pointer;
        height: 20px;
      }

      .plus-svg {
        cursor: pointer;
        height: 20px;
      }
    }
  }

  .body {
    overflow: scroll;
    padding: 4px;

    .memo {
      display: grid;
      grid-template-rows: 10px auto;
      background: $menu;
      width: 100%;
      min-height: 100px;
      max-height: 300px;
      gap: 20px;
      margin-bottom: 10px;

      .header {
        background: $menu-header;
      }

      .content {
        width: 100%;
        height: 100%;
        background: $menu;
      }
    }
  }
}
</style>
