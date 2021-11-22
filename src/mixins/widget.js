import { mapMutations, mapGetters } from 'vuex';
import float from '@/mixins/float';

export default {
  mixins: [float],
  computed: {
    ...mapGetters('widget', ['getTopIndex']),
  },
  methods: {
    focusOn() {
      console.log('focusOn');
      this.upIndex();
      // fixme
      this.$refs.float.style['z-index'] = this.getTopIndex;
    },
    ...mapMutations('widget', ['upIndex']),
  },
};
