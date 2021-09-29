<template>
  <div :class="['app', {'app--dark': isDarkTheme}]">
    <button class="toggle-button" @click="toggleTheme">night</button>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type Data = {
  isDarkTheme: boolean;
}

export default defineComponent({
  name: 'Home',
  data() {
    return {
      isDarkTheme: false,
    } as Data;
  },
 
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },
  },
});
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #202023;
}

.app {
  width: 100vw;
  height: 100vh;
  transition: all 0.1s ease-in-out;
}

.app--dark {
  background-color: #202023;
  color: #fff;
}

.toggle-button {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  z-index: 1;
}
</style>
