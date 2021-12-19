<template>
  <template v-for="(widget, index) in this.getWidgetList" :key="index">
    <Widget :widget="widget"></Widget>
  </template>
</template>

<script>
import { mapGetters } from 'vuex';

import Widget from '@/components/widget/Widget';

export default {
  name: 'WidgetLoader',
  components: { Widget },
  computed: {
    ...mapGetters('widget', ['getWidgetList']),
  },
};
</script>

<style scoped></style>
