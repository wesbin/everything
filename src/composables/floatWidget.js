import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';

export default (widget) => {
  // data
  const positions = reactive({
    clientX: '',
    clientY: '',
    movementX: '',
    movementY: '',
  });

  // vuex
  const store = useStore();
  const getTopIndex = computed(() => store.getters['widget/getTopIndex']);
  const setDrag = () => store.commit('widget/setDrag');
  const upIndex = () => store.commit('widget/upIndex');
  const updateWidget = (widget) => store.commit('widget/updateWidget', widget);

  // refs
  const float = ref(null);

  // methods
  const dragMouseDown = (event) => {
    event.preventDefault();
    setDrag(false);
    // get the mouse cursor position at startup:
    positions.clientX = event.clientX;
    positions.clientY = event.clientY;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  };

  const elementDrag = (event) => {
    event.preventDefault();
    setDrag(true);
    positions.movementX = positions.clientX - event.clientX;
    positions.movementY = positions.clientY - event.clientY;
    positions.clientX = event.clientX;
    positions.clientY = event.clientY;
    // set the element's new position:
    float.value.style.top = float.value.offsetTop - positions.movementY + 'px';
    float.value.style.left = float.value.offsetLeft - positions.movementX + 'px';
  };

  const closeDragElement = () => {
    rePositioning();
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const rePositioning = () => {
    // 플로팅 객체의 너비, 높이 등
    const rect = float.value.getBoundingClientRect();
    // 화면 너비
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    // 화면 높이
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    // 좌측
    if (rect.left < 0) {
      float.value.style.left = '0px';
    }
    // 상단
    if (rect.top < 0) {
      float.value.style.top = '0px';
    }
    // 우측
    if (rect.right > vw) {
      float.value.style.left = `${vw - rect.width}px`;
    }
    // 하단
    if (rect.bottom > vh) {
      float.value.style.top = `${vh - rect.height}px`;
    }
    savePosition(float.value.style.left || '13%', float.value.style.top || '13%', rect.width, rect.height);
  };

  const focusOn = () => {
    upIndex();
    updateWidget({
      widget: widget,
      style: {
        'z-index': getTopIndex.value,
      },
    });
  };

  const savePosition = (left, top, width, height) => {
    updateWidget({
      widget: widget,
      style: {
        left: left,
        top: top,
        width: width,
        height: height,
      },
    });
  };

  onMounted(() => {
    float.value.addEventListener('mousedown', () => {
      focusOn();
    });
  });

  return {
    float,
    dragMouseDown,
  };
};
