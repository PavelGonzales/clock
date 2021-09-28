<template>
  <div class="hello">
    {{ formattedTime }}
    <br>
    {{ formattedDate }}
    <br>
    offset {{ offset }} ms
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
  props: {
    serverTime: [String, Number, Date],
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
  computed: {
    offset() {
      return dayjs(Date.now() - +new Date(this.serverTime || '')).format('SSS');
    },
    formattedDate() {
      return dayjs().format('DD MMMM YYYY')
    }
  },
});
</script>

<style scoped>

</style>
