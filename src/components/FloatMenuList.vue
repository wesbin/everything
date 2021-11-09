<template>
  <div class="float-menu-list" v-show="toggle">FLOAT-MENU</div>
</template>

<script>
export default {
  name: "FloatMenuList",
  props: {
    toggle: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.float-menu-list {
  background: $float-menu;
}
</style>
