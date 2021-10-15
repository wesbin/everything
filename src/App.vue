<template>
  <div id="app">
    <div class="container">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>

      <div class="item"></div>
      <div class="item clock">
        <div>{{ this.getClock }}</div>
      </div>
      <div class="item"></div>

      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['getClock']),
  },
  methods: {
    ...mapActions(['ticTacClock'])
  },
  created() {
    this.ticTacClock()
  }
}
</script>

<style>
body {
  background-color: #1D2132;
  color: #C9CEC0;
  margin: 0;
}
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100vw;
  height: 100vh;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
}
/*.item:nth-child(even) {*/
/*  background-color: #C9CEC0;*/
/*}*/
.clock {
  font-size: 7em;
}
</style>
