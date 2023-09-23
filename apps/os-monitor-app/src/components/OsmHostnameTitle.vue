<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MachineInformation } from "../../../shared/models/machine-information.interface";
import OsmTitle from "@/components/OsmTitle.vue";
import { ConnectorResponse } from "../../../shared/models/connector-response.interface";

const machineInformation = ref<ConnectorResponse<MachineInformation>>();

const fetchInterval = () => {
  setInterval(fetchHostname, 1000);
};

onMounted(() => {
  fetchHostname();
  fetchInterval();
});

async function fetchHostname() {
  const infoRequest = await fetch("http://localhost:3000/info");
  machineInformation.value = await infoRequest.json();
}
</script>

<template>
  <osm-title>
    {{ machineInformation?.response.hostname }}
  </osm-title>
</template>
