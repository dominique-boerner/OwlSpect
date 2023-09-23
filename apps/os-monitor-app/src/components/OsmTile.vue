<script setup lang="ts">
defineProps<{
  isEmpty?: boolean;
}>();
</script>

<template>
  <ion-card class="osm-tile" :class="{ empty: isEmpty }">
    <ion-card-content v-if="!isEmpty">
      <slot></slot>
    </ion-card-content>
    <ion-card-content v-else>
      <vue-feather
        size="3rem"
        type="plus-circle"
        stroke-width="1"
      ></vue-feather>
    </ion-card-content>
  </ion-card>
</template>

<style scoped lang="scss">
.osm-tile {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  aspect-ratio: 1;
  border-radius: 10px;
  background: linear-gradient(
    47deg,
    rgba(173, 173, 173, 0.2) -13.21%,
    rgba(74, 74, 74, 0) 115.22%
  );
  transition: ease-in-out;
  color: black;
  width: 144px;
  flex-direction: column;
  margin: 7px;
  padding: 0;

  &.empty {
    background: none;
    border-radius: 10px;
    border: 3px dashed #ebebeb;
  }

  &:active {
    opacity: 0.4;
  }
}
</style>
