<template>
  <div id="app">
    <div class="container">
      <Clock></Clock>
    </div>
    <FloatMenu></FloatMenu>
    <WidgetLoader></WidgetLoader>
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
  overflow: hidden;
}
.container {
  background-color: $background;
  width: 100vw;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
}
*::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  &-thumb {
    background-color: $scrollbar;
    background-clip: content-box;
    &:hover {
      background-color: $scrollbar-hover;
    }
  }
  &-track {
    background-color: transparent;
  }
}
textarea {
  font-family: inherit;
  color: inherit;
  box-sizing: border-box;
  border: 0;
  margin: 0;
  padding: 12px;
  resize: none;
  line-height: 1.618;
  &:focus {
    outline: none;
  }
}
</style>
