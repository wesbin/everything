<template>
  <div v-for="(widget, index) in getWidgetList" :key="index">
    <Widget :widget="widget"></Widget>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('widget');

import Widget from '@/components/Widget';

export default {
  name: 'WidgetLoader',
  components: { Widget },
  computed: {
    ...mapGetters(['getWidgetList']),
  },
};
</script>

<style scoped></style>
