<template>
  <div :class="['app', {'app--dark': isDarkTheme}]">
    <div class="menu-button">
      <Button icon="pi pi-bars" class="menu-button--white p-button-text" @click="visibleSidebar = true" />
    </div>
    <Sidebar v-model:visible="visibleSidebar" position="right" :class="{'sidebar--dark': isDarkTheme}">
      <SidebarContent />
    </Sidebar>

    <router-view :isDarkTheme="isDarkTheme" />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from '@/components/Footer.vue';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import SidebarContent from '@/components/SidebarContent.vue';
import { mapState, mapActions } from 'vuex';

type Data = {
  visibleSidebar: boolean;
}

export default defineComponent({
  name: 'Home',
  components: {
    Footer,
    Sidebar,
    Button,
    SidebarContent,
  },
  data() {
    return {
      visibleSidebar: false,
    } as Data;
  },

  computed: {
    ...mapState({
      isDarkTheme: (state: any) => state.settings.isDarkTheme,
    }),
  },

  beforeMount() {
    this.setIsDarkTheme(JSON.parse(localStorage.getItem('isDarkTheme') || 'false'));
    this.setWithMilliseconds(JSON.parse(localStorage.getItem('withMilliseconds') || 'false'));
  },

  methods: {
    ...mapActions(['setIsDarkTheme', 'setWithMilliseconds']),
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
  position: relative;
}

.app {
  width: 100vw;
  height: 100vh;
  transition: all 0.1s ease-in-out;
  overflow: hidden;
}

.app--dark {
  background-color: #202023;
  color: #fff;
}

.menu-button {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
}

.menu-button--white {
  color: #202023 !important;
}

.app--dark .menu-button--white {
  color: #fff !important;
}

.sidebar--dark {
  background-color: #202023 !important;
  color: #fff !important;
}
</style>
