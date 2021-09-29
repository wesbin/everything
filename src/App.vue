<template>
  <div id="app">
    {{ this.getClock }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['getClock'])
  }
}
</script>

<style>

</style>
