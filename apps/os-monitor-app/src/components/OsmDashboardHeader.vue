<script setup>
import WindowsImage from "@/assets/windows.png";
import OsmSubtitle from "@/components/OsmSubtitle.vue";
import OsmHostnameTitle from "@/components/OsmHostnameTitle.vue";
import OsmOnlineState from "@/components/OsmOnlineState.vue";
</script>

<template>
  <ion-grid>
    <ion-row class="ion-align-items-center">
      <ion-col size="sm">
        <div style="position: relative; width: 35px; margin: 10px">
          <ion-img style="width: 35px" :src="WindowsImage"></ion-img>
          <osm-online-state />
        </div>
      </ion-col>
      <ion-col>
        <osm-hostname-title />
        <osm-subtitle>198.234.200.103</osm-subtitle>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
