<template>
  <div>
    {{ this.getTest }}
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('todo')

export default {
  name: 'Clock',
  computed: {
    ...mapGetters(['getTest']),
  }
}
</script>

<style scoped>

</style>