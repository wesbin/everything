export default {
  data() {
    return {
      drag: false,
      positions: {
        clientX: '',
        clientY: '',
        movementX: '',
        movementY: '',
      },
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
      this.$refs.float.style.top =
        this.$refs.float.offsetTop - this.positions.movementY + 'px';
      this.$refs.float.style.left =
        this.$refs.float.offsetLeft - this.positions.movementX + 'px';
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
};
