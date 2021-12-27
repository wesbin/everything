import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

export default () => {
  // data
  const positions = toRefs(
    reactive({
      clientX: '',
      clientY: '',
      movementX: '',
      movementY: '',
    })
  );

  // vuex
  const store = useStore();
  const getTopIndex = computed(() => store.getters['widget/getTopIndex']);
  const setDrag =

  // refs
  const float = ref(null);

  // methods
  const dragMouseDown = (event) => {
    event.preventDefault();
    this.setDrag(false);
    // get the mouse cursor position at startup:
    this.positions.clientX = event.clientX;
    this.positions.clientY = event.clientY;
    document.onmousemove = this.$_float_elementDrag;
    document.onmouseup = this.$_float_closeDragElement;
  };

  const elementDrag = (event) => {
    event.preventDefault();
    this.setDrag(true);
    this.positions.movementX = this.positions.clientX - event.clientX;
    this.positions.movementY = this.positions.clientY - event.clientY;
    this.positions.clientX = event.clientX;
    this.positions.clientY = event.clientY;
    // set the element's new position:
    this.$refs.float.style.top = this.$refs.float.offsetTop - this.positions.movementY + 'px';
    this.$refs.float.style.left = this.$refs.float.offsetLeft - this.positions.movementX + 'px';
  }

  const closeDragElement = () => {
    this.$_float_rePositioning();
    document.onmouseup = null;
    document.onmousemove = null;
  }

  const rePositioning = () => {
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
    this.$_float_savePosition(
      this.$refs.float.style.left || '13%',
      this.$refs.float.style.top || '13%',
      rect.width,
      rect.height
    );
  }

  const focusOn = () => {
    this.upIndex();
    this.updateWidget({
      widget: this.widget,
      style: {
        'z-index': this.getTopIndex,
      },
    });
  }

  const savePosition = (left, top, width, height) => {
    this.updateWidget({
      widget: this.widget,
      style: {
        left: left,
        top: top,
        width: width,
        height: height,
      },
    });
  }

  onMounted(() => {
    float.value.addEventListener('mousedown', () => {});
  });

  return {
    float,
    dragMouseDown,

  };
};