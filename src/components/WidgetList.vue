<template>
  <div class="widget-list" v-show="toggle">
    <div class="widget" @click="addMemo">Memo</div>
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
    addMemo() {
      if (!this.getDrag) {
        this.addWidget('Memo');
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
