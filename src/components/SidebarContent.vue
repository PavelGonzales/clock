<template>
  <h3>Settings</h3>
  <div class="flex align-items-center mb-2">
    <InputSwitch :modelValue="darkThemeModel" @change="setIsDarkTheme(!darkThemeModel)" class="mr-2" />
    Dark theme
  </div>
  <div class="flex align-items-center mb-2">
    <InputSwitch :modelValue="withMillisecondsModel" @change="setWithMilliseconds(!withMillisecondsModel)" class="mr-2" />
    Show ms
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputSwitch from 'primevue/inputswitch';
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  name: 'SidebarContent',

  components: {
    InputSwitch,
  },

  computed: {
    ...mapState({
      // TODO Убрать any
      darkThemeModel: (state: any) => state.settings.isDarkTheme,
      withMillisecondsModel: (state: any) => state.settings.withMilliseconds,
    }),
  },

  methods: {
    ...mapActions([
      'setIsDarkTheme',
      'setWithMilliseconds',
    ]),
  },
});
</script>
