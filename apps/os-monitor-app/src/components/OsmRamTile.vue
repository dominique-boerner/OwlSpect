<script setup lang="ts">
import OsmTile from "@/components/OsmTile.vue";
import { onMounted, ref } from "vue";
import { Memory } from "../../../shared/models/memory.interface";
import { ConnectorResponse } from "../../../shared/models/connector-response.interface";

const memory = ref<ConnectorResponse<Memory>>();

const fetchInterval = () => {
  setInterval(fetchMemory, 1000);
};

onMounted(() => {
  fetchMemory();
  fetchInterval();
});

async function fetchMemory() {
  const memoryRequest = await fetch("http://localhost:3000/memory");
  memory.value = await memoryRequest.json();
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
</script>
<template>
  <osm-tile class="ram-tile">
    <ion-text class="label">RAM</ion-text>
    <ion-text class="ram-percentage">
      {{ 100 - (memory?.response.usage * 100).toFixed(1) }} %
    </ion-text>
    <ion-text class="ram-info">
      {{ formatBytes(memory?.response.totalmem - memory?.response.freemem, 1) }}
      /
      {{ formatBytes(memory?.response.totalmem, 1) }}
    </ion-text>
  </osm-tile>
</template>

<style scoped lang="scss">
.ram-tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  .label {
    display: block;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .ram-percentage {
    font-weight: bold;
    font-size: 2rem;
  }

  .ram-info {
    display: flex;
    font-size: 0.8rem;
  }
}
</style>
