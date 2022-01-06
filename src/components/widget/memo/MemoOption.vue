<template>
  <div class="memo-option click-menu" :style="memoOptionPosition">@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@</div>
</template>

<script>
import {getCurrentInstance, onMounted} from 'vue';

export default {
  name: 'MemoOption',
  props: {
    memoOptionPosition: {
      type: Object,
      required: true,
    }
  },
};
</script>

<style lang="scss" scoped>
.memo-option {
  position: absolute;
  background-color: red;
  color: white;
  top: 50%;
  left: 50%;
}
</style>
