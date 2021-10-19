<template>
  <div id="app">
    <div class="container">
      <!-- 1 - 1 -->
      <div class="item">
        <Todo></Todo>
      </div>
      <!-- 1 - 2 -->
      <div class="item"></div>
      <!-- 1 - 3 -->
      <div class="item">
      </div>

      <!-- 1 - 1 -->
      <div class="item"></div>
      <!-- 2 - 2 -->
      <div class="item">
        <Clock></Clock>
      </div>
      <!-- 2 - 3 -->
      <div class="item"></div>

      <!-- 3 - 1 -->
      <div class="item"></div>
      <!-- 3 - 2 -->
      <div class="item"></div>
      <!-- 3 - 3 -->
      <div class="item"></div>
    </div>
  </div>
</template>

<script>
import Clock from '@/Clock'
import Todo from './Todo'

export default {
  name: 'App',
  components: {
    Clock,
    Todo
  }
}
</script>

<style>
@font-face {
  font-family: 'AppleSDGothicNeoL';
  src: url("../public/font/AppleSDGothicNeoL.ttf") format('truetype');
}
body {
  font-family: AppleSDGothicNeoL, sans-serif;
  background-color: #1D2132;
  color: #ffffff;
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
</style>
