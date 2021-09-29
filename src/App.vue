<template>
  <div :class="['app', {'app--dark': isDarkTheme}]">
    <div class="toggle-button">
      <NightModeToggler class="toggler-size" :modelValue="!isDarkTheme" @update:modelValue="toggleTheme"/>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NightModeToggler from '@/components/NightModeToggler.vue';

type Data = {
  isDarkTheme: boolean;
}

export default defineComponent({
  name: 'Home',
  components: {
    NightModeToggler,
  },
  data() {
    return {
      isDarkTheme: false,
    } as Data;
  },

  beforeMount() {
    this.isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme') || 'false');
  },
 
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('isDarkTheme', `${this.isDarkTheme}`)
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
  top: 16px;
  right: 16px;
  cursor: pointer;
  z-index: 1;
}

@media screen and (max-width: 960px) {
  .toggler-size {
    --width: 65px !important;
    --height: 25px !important;
  }
}
</style>
