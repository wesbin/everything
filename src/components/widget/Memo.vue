<template>
  <div class="memo" @mousedown="dragMouseDown" ref="float">TEST</div>
</template>

<script>
import float from '@/mixins/float';

export default {
  name: 'Memo',
  mixins: [float],
};
</script>

<style lang="scss" scoped>
.memo {
  position: absolute;
  background: $float-menu;
  width: 100px;
  height: 100px;
}
</style>
