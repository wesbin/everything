<template>
  <div class="widget-list" v-show="toggle">
    <div class="widget" @click="popMemo">Memo</div>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from 'vuex';

const { mapMutations } = createNamespacedHelpers('widget');

export default {
  name: 'WidgetList',
  props: {
    toggle: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getDrag']),
  },
  methods: {
    popMemo() {
      if (!this.getDrag) {
        this.addMemo();
      }
    },
    ...mapMutations(['addMemo']),
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
