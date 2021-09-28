<template>
  <div class="home">
    <Time :serverTime="serverTime"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Time from '@/components/Time.vue';
import axios from 'axios';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'Home',
  data() {
    return {
      serverTime: new Date(),
    }
  },
  async beforeCreate() {
    const { data } = await axios.get('http://worldtimeapi.org/api/timezone/Europe/Moscow');
    this.serverTime = new Date(data.datetime);
  },
  components: {
    Time,
  },
  
});
</script>
