<template>
  <div class="root">
    <h1 class="location-info">
      Time in {{ city }} now:
    </h1>
    <Time :class="['time', {'time--large': !withMilliseconds}]" :withMilliseconds="withMilliseconds" />
    <div class="date-info">
      {{ formattedDate }}, week {{ week }}
    </div>
    <div class="offset-info">
      <template v-if="serverData?.datetime">
        <!-- <span class="offset-info__gap">Your clock is 0.3 seconds behind.</span> -->
        Accuracy of synchronisation was ±{{ offset }}.
      </template>
      <template v-else>Synchronizing...</template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Time from '@/components/Time.vue';
import axios from 'axios';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { mapState } from 'vuex';
dayjs.extend(weekOfYear);

type ServerData = {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: string | null;
  dst_offset: number;
  dst_until: string | null;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string
  utc_offset: string;
}

type Data = {
  serverData: ServerData;
  offset: string;
  intervalId: number;
}

export default defineComponent({
  name: 'Home',
  props: ['isDarkTheme'],
  data() {
    return {
      serverData: {},
      offset: '',
      intervalId: -1,
    } as Data;
  },
  created() {
    this.getServerData();
    this.intervalId = setInterval(this.getServerData, 60 * 1000);
    // TODO Fix it!!!
    const dateNow = dayjs();
    (this as any).$gtag.event('session info', {
      date: dateNow.format('DD MM YYYY'),
      time: dateNow.format('HH:mm:ss'),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  },
  beforeUnmount() {
    if (this.intervalId !== -1) {
      clearInterval(this.intervalId);
    }
  },
  components: {
    Time,
  },
  methods: {
    async getServerData() {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const { data: serverData } = await axios.get<ServerData>(`https://worldtimeapi.org/api/timezone/${timezone}`);

        this.serverData = serverData;
        this.setOffset();
      } catch (err) {
        console.log('Failed get serverData', err);
      }
    },
    setOffset() {
      const offset = Date.now() - +new Date(this.serverData?.datetime || '');
      const ms = dayjs(offset).format('SSS');
      const sec = dayjs(offset).format('ss');
      if (offset >= 1000) {
        this.offset = `${sec} sec ${ms} ms`;
      } else {
        this.offset = `${ms} ms`;
      }
    },
  },
  computed: {
    ...mapState({
      withMilliseconds: (state: any) => state.settings.withMilliseconds,
    }),
    formattedDate() {
      return dayjs().format('dddd, DD MMMM YYYY')
    },
    week() {
      return dayjs().week() - 1;
    },
    city() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1];
    },
  },
});
</script>

<style scoped>
.root {
  padding: 82px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.location-info {
  font-size: 3vw;
  line-height: 1em;
  padding-left: 16px;
  font-weight: 500;
  margin: 0;
}

.time {
  font-size: 15.7vw;
  font-weight: 900;
  line-height: 1em;
  text-align: center;
}

.time--large {
  font-size: 23.5vw;
}

.date-info {
  font-size: 3vw;
  line-height: 1em;
  text-align: right;
  padding-right: 16px;
  font-weight: 500;
}

.offset-info {
  font-size: 3vw;
  font-weight: 600;
  line-height: 1em;
  text-align: center;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
}

.offset-info__gap {
  font-size: 3.65vw;
  font-weight: 600;
}
</style>
