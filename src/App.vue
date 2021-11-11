<template>
  <div id="app">
    <div class="container">
      <Clock></Clock>
      <FloatMenu></FloatMenu>
      <WidgetLoader></WidgetLoader>
    </div>
  </div>
</template>

<script>
import Clock from '@/components/Clock';
import FloatMenu from '@/components/FloatMenu';

import WidgetLoader from '@/components/WidgetLoader';

export default {
  name: 'App',
  components: {
    WidgetLoader,
    FloatMenu,
    Clock,
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: 'AppleSDGothicNeoL';
  src: url('../public/font/AppleSDGothicNeoL.ttf') format('truetype');
}
body {
  font-family: AppleSDGothicNeoL, sans-serif;
  color: $font;
  margin: 0;
}
.container {
  background-color: $background;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
