<template>
  <div v-for="(widget, index) in getWidgetList" :key="index">
    <Widget :widget="widget"></Widget>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Widget from '@/components/Widget';

export default {
  name: 'WidgetLoader',
  components: { Widget },
  computed: {
    ...mapGetters('widget', ['getWidgetList']),
  },
};
</script>

<style scoped></style>
