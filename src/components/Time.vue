<template>
  <div class="time">
    {{ formattedTime }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'Time',
  data() {
    return {
      intervalId: -1,
      formattedTime: '',
    }
  },
  created() {
    this.updateFormattedTime();
    this.intervalId = setInterval(this.updateFormattedTime, 16);
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    updateFormattedTime() {
      this.formattedTime = dayjs().format('HH:mm:ss:SSS');
    },
  },
});
</script>
