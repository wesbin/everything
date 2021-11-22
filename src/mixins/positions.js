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
    ...mapMutations('float', ['setDrag', 'setPositions']),
  },
};
