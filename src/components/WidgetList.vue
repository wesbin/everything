<template>
  <div class="widget-list" v-show="toggle">
    <div class="widget" @click="addMemo">Memo</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapMutations } = createNamespacedHelpers('widget');

export default {
  name: 'WidgetList',
  props: {
    toggle: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
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
