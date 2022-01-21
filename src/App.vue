<template>
  <div id="app">
    <div class="container">
      <Clock></Clock>
    </div>
    <WidgetLoader></WidgetLoader>
  </div>
</template>

<script>
import Clock from '@/components/Clock';

import WidgetLoader from '@/components/widget/WidgetLoader';

export default {
  name: 'App',
  components: {
    WidgetLoader,
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
  color: $white-font;
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
// 스크롤
*::-webkit-scrollbar {
  width: 3px;
  height: 0;
  &-thumb {
    background-color: $scrollbar;
    background-clip: content-box;
    border-radius: 4px;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    transition-delay: 0;
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
