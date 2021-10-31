<template>
  <div
    ref="draggableContainer"
    class="float-menu"
    @mousedown="dragMouseDown"
    @click="toggleMenu">
    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus-square"
         className="svg-inline--fa fa-plus-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 448 512">
      <path fill="currentColor"
            d="M352 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm96-160v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
    </svg>
    <div v-show="toggle">
      TEST
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatMenu',
  data() {
    return {
      drag: false,
      positions: {
        clientX: '',
        clientY: '',
        movementX: '',
        movementY: ''
      },
      toggle: false,
    };
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
        this.toggle = !this.toggle
      }
    }
  }
};
</script>

<style scoped>
.float-menu {
  position: absolute;
  z-index: 9;
  width: 25px;
}
</style>