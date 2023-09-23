<template>
  <ion-text class="osm-title">
    <slot></slot>
  </ion-text>
</template>

<style scoped>
.osm-title {
  font-size: var(--osm-font-size-title);
  color: var(--ion-color-medium-rgb);
  font-weight: bold;
  display: block;
}
</style>
