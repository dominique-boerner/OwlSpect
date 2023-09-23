<template>
  <ion-text class="osm-subtitle">
    <slot></slot>
  </ion-text>
</template>

<style scoped>
.osm-subtitle {
  font-size: var(--osm-font-size-subtitle);
  color: var(--ion-color-medium-rgb);
  display: block;
}
</style>
<script setup></script>
