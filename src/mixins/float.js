import { mapMutations, mapGetters } from 'vuex';

/*
 * 필수 설정
 * ref = float
 * @click = dragMouseDown
 * */
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
  computed: {
    ...mapGetters('widget', ['getTopIndex']),
  },
  mounted() {
    this.$refs.float.addEventListener('mousedown', () => {
      this.$_float_focusOn();
    })
  },
  methods: {
    $_float_dragMouseDown: function (event) {
      event.preventDefault();
      this.setDrag(false);
      // this.$_float_focusOn();
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.$_float_elementDrag;
      document.onmouseup = this.$_float_closeDragElement;
    },
    $_float_elementDrag: function (event) {
      event.preventDefault();
      this.setDrag(true);
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.float.style.top = this.$refs.float.offsetTop - this.positions.movementY + 'px';
      this.$refs.float.style.left = this.$refs.float.offsetLeft - this.positions.movementX + 'px';
    },
    $_float_closeDragElement() {
      this.$_float_validatePosition();
      document.onmouseup = null;
      document.onmousemove = null;
    },
    // 드래그 앤 드랍 이후 해당 플로팅 객체가 화면에서 벗어나지 않았는지 검증
    $_float_validatePosition() {
      // 플로팅 객체의 너비, 높이 등
      const rect = this.$refs.float.getBoundingClientRect();
      // 화면 너비
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      // 화면 높이
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      // 좌측
      if (rect.left < 0) {
        this.$refs.float.style.left = '0px';
      }
      // 상단
      if (rect.top < 0) {
        this.$refs.float.style.top = '0px';
      }
      // 우측
      if (rect.right > vw) {
        this.$refs.float.style.left = `${vw - rect.width}px`;
      }
      // 하단
      if (rect.bottom > vh) {
        this.$refs.float.style.top = `${vh - rect.height}px`;
      }
      this.setPositions({
        left: this.$refs.float.style.left || '13%',
        top: this.$refs.float.style.top || '13%',
        width: rect.width,
        height: rect.height,
      });
    },
    // float 위젯 포커스 변경
    $_float_focusOn() {
      this.upIndex();
      this.$refs.float.style['z-index'] = this.getTopIndex;
    },
    ...mapMutations('float', ['setDrag', 'setPositions']),
    ...mapMutations('widget', ['upIndex']),
  },
};
