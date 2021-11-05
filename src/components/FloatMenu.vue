<template>
  <div v-show="toggle">
    FLOAT-MENU
  </div>
</template>

<script>
export default {
  name: 'FloatMenu',
  props: {
    toggle: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>