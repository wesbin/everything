<template>
  <div
    ref="draggableContainer"
    class="float-menu"
    @mousedown="dragMouseDown"
    @click="toggleMenu">

    <PlusMinus :toggle="toggle"></PlusMinus>

    <FloatMenu :toggle="toggle"></FloatMenu>
  </div>
</template>

<script>
import PlusMinus from '@/components/PlusMinus';
import FloatMenu from '@/components/FloatMenu';
export default {
  name: 'FloatButton',
  components: {FloatMenu, PlusMinus},
  data() {
    return {
      drag: false,
      positions: {
        clientX: '',
        clientY: '',
        movementX: '',
        movementY: ''
      },
      toggle: false
    }
  },
  methods: {
    dragMouseDown: function (event) {
      event.preventDefault();
      this.drag = false;
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },
    elementDrag: function (event) {
      event.preventDefault();
      this.drag = true;
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px';
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px';
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
    toggleMenu() {
      if (!this.drag) {
        this.toggle = !this.toggle;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.float-menu {
  position: absolute;
  z-index: 9;
  width: 25px;
  left: 13%;
  top: 13%
}
</style>