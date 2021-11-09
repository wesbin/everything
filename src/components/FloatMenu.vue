<template>
  <div
    ref="draggableContainer"
    class="float-menu"
    :class="{ open: toggle }"
    @mousedown="dragMouseDown"
  >
    <!-- 열고 닫기  -->
    <ButtonPlusMinus @click="toggleMenu" :toggle="toggle"></ButtonPlusMinus>
    <!-- 메뉴 리스트  -->
    <FloatMenuList :toggle="toggle"></FloatMenuList>
  </div>
</template>

<script>
import ButtonPlusMinus from "@/components/ButtonPlusMinus";
import FloatMenuList from "@/components/FloatMenuList";

export default {
  name: "FloatMenu",
  components: { FloatMenuList, ButtonPlusMinus },
  data() {
    return {
      drag: false,
      positions: {
        clientX: "",
        clientY: "",
        movementX: "",
        movementY: "",
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
      this.$refs.draggableContainer.style.top =
        this.$refs.draggableContainer.offsetTop -
        this.positions.movementY +
        "px";
      this.$refs.draggableContainer.style.left =
        this.$refs.draggableContainer.offsetLeft -
        this.positions.movementX +
        "px";
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
    toggleMenu() {
      if (!this.drag) {
        this.toggle = !this.toggle;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.float-menu {
  position: absolute;
  z-index: 9;
  width: 10vw;
  min-width: 100px;
  max-width: 150px;
  left: 13%;
  top: 13%;

  &.open {
    border: solid 2px $float-menu;
    border-radius: 2px;
  }
}
</style>
