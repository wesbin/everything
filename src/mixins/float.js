import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      // drag: false,
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
      this.setDrag(false);
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },
    elementDrag: function (event) {
      event.preventDefault();
      this.setDrag(true);
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
      const rect = this.$refs.float.getBoundingClientRect();
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      if (rect.left < 0) {
        this.$refs.float.style.left = '0px';
      }
      if (rect.top < 0) {
        this.$refs.float.style.top = '0px';
      }
      if (rect.right > vw) {
        this.$refs.float.style.left = `${vw - rect.width}px`;
      }
      if (rect.bottom > vh) {
        this.$refs.float.style.top = `${vh - rect.height}px`;
      }
      this.setPositions({
        left: this.$refs.float.style.left || '0px',
        top: this.$refs.float.style.top || '0px',
        width: rect.width,
        height: rect.height,
      });
      document.onmouseup = null;
      document.onmousemove = null;
    },
    ...mapMutations('float', ['setDrag', 'setPositions']),
  },
};
