<script setup>
const props = defineProps({
  toggle: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['toggle']);

const toggleMenu = () => emit('toggle');
</script>

<template>
  <button class="plus-minus" :class="{ open: toggle }" @click="toggleMenu">
    <span class="plus"></span>
    <span class="minus"></span>
  </button>
</template>

<style lang="scss" scoped>
.plus-minus {
  //color: $font;
  background: transparent;
  width: 25px;
  height: 25px;
  border: 0;
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    transition: 300ms;
    background: white;
    border-radius: 2px;
  }

  .plus {
    top: 25%;
    bottom: 25%;
    width: 10%;
    left: 45%;
  }

  .minus {
    left: 25%;
    right: 25%;
    height: 10%;
    top: 45%;
  }

  &.open {
    span {
      transform: rotate(90deg);
    }

    .minus {
      left: 50%;
      right: 50%;
    }
  }
}
</style>
