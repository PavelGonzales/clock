<template>
  <div class="root">
    <div class="location-info">
      Time in {{ locationData.city }}, {{ locationData.country }} now:
    </div>
    <Time class="time" />
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
dayjs.extend(weekOfYear)

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

type LocationData = {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

type Data = {
  serverData: ServerData;
  locationData: LocationData;
  offset: string;
}

export default defineComponent({
  name: 'Home',
  data() {
    return {
      serverData: {},
      locationData: {},
      offset: '',
    } as Data;
  },
  async beforeCreate() {
    const { data: locationData } = await axios.get('http://ip-api.com/json');
    this.locationData = locationData;
    const { data: serverData } = await axios.get<ServerData>(`http://worldtimeapi.org/api/timezone/${this.locationData?.timezone}`);
    this.serverData = serverData;
    this.setOffset();
  },
  components: {
    Time,
  },
  methods: {
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
    formattedDate() {
      return dayjs().format('dddd, DD MMMM YYYY')
    },
    week() {
      return dayjs().week() - 1;
    },
  },
});
</script>

<style scoped>
.root {
  padding-top: 50px;
  padding-top: 20vh;
}

.location-info {
  font-size: 3vw;
  line-height: 1em;
  padding-left: 16px;
}

.time {
  font-size: 15.7vw;
  font-weight: 600;
  line-height: 1em;
}

.date-info {
  font-size: 3vw;
  line-height: 1em;
  text-align: right;
  padding-right: 16px;
}

.offset-info {
  font-size: 3vw;
  font-weight: 500;
  line-height: 1em;
  text-align: center;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
}

.offset-info__gap {
  font-size: 3.65vw;
  font-weight: 600;
}
</style>
