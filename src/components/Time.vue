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
  props: {
    withMilliseconds: {
      type: Boolean,
      default: true,
    },
  },
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
      if (this.withMilliseconds) {
        this.formattedTime = dayjs().format('HH:mm:ss:SSS');
      } else {
        this.formattedTime = dayjs().format('HH:mm:ss');
      }
    },
  },
});
</script>
