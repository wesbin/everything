<template>
  <div class="widget-list" v-show="toggle">
    <div class="widget" @click="showMemoList">Memo</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'WidgetList',
  props: {
    toggle: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters('float', ['getDrag']),
  },
  methods: {
    showMemoList() {
      if (!this.getDrag) {
        this.addWidget('memo/MemoList');
      }
    },
    ...mapActions('widget', ['addWidget']),
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
