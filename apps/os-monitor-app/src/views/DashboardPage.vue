<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import OsmDashboardHeader from "@/components/OsmDashboardHeader.vue";
import OsmTile from "@/components/OsmTile.vue";
import OsmRamTile from "@/components/OsmRamTile.vue";
</script>
<template>
  <IonPage>
    <IonContent class="ion-padding" :fullscreen="true">
      <osm-dashboard-header />
      <ion-grid style="padding-top: 10px">
        <ion-row>
          <osm-ram-tile />
          <osm-tile is-empty></osm-tile>
        </ion-row>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>
