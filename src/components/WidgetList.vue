<template>
  <div class="widget-list" v-show="toggle">
    <Widget></Widget>
  </div>
</template>

<script>
import Widget from "@/components/Widget";
export default {
  name: "WidgetList",
  components: { Widget },
  props: {
    toggle: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.widget-list {
  background: $float-menu;
}
</style>
