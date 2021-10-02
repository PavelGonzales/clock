<template>
  <footer class="footer">
    Made with 💙 by <a class="footer__link" href="https://pavelgonzales.com/" target="_blank" @click="onLinkClick">Pavel Gonzales</a>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',

  methods: {
    onLinkClick() {
      // TODO Fix it!!!
      (this as any).$gtag.event('click', { label: 'pavelgonzales.com' });
    },
  },
});
</script>

<style scoped>
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 16px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
}

.footer__link {
  color: inherit;
  text-decoration: none;
  font-weight: 600;
}

.footer__link:hover {
  color: red;
}
</style>
