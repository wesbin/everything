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
  // 드래그 이벤트 진입점 - 원하는 태그에 mousedown 이벤트로 해당 메서드 걸어줘야 함
  const dragMouseDown = (event) => {
    event.preventDefault();
    setDrag(false);
    // get the mouse cursor position at startup:
    positions.clientX = event.clientX;
    positions.clientY = event.clientY;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  };
  // 실제 드래그 동작
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
  // 드래그 끝
  const closeDragElement = () => {
    const rePosition = rePositioning();
    savePosition(rePosition);
    document.onmouseup = null;
    document.onmousemove = null;
  };
  // 드래그 끝나고 위젯 위치 검증 후 위치 값 반환
  const rePositioning = () => {
    // 플로팅 객체의 너비, 높이 등
    // fixme getBoundingClientRect를 불러오는게 좋은건지 아니면 widget이나 float에 담겨있는 값을 재활용하는게 좋을지
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
    return {
      left: float.value.style.left || '13%',
      top: float.value.style.top || '13%',
      width: rect.width,
      height: rect.height,
    };
  };
  // 이동된 위젯 포지션 저장
  const savePosition = ({ left, top, width, height }) => {
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
  // 위젯 클릭 시 z-index 가장 앞으로
  const focusOn = () => {
    upIndex();
    updateWidget({
      widget: widget,
      style: {
        'z-index': getTopIndex.value,
      },
    });
  };
  // float ref 값 참조해서 focusOn 이벤트 부착
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
