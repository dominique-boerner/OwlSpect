<script setup lang="ts">
defineProps<{
  isEmpty?: boolean;
  label?: string;
  value?: string;
  suffix?: string;
}>();
</script>

<template>
  <ion-card class="osm-tile" :class="{ empty: isEmpty }">
    <ion-text class="label">{{ label }}</ion-text>
    <ion-card-content v-if="!isEmpty" class="content">
      <ion-text v-if="value" class="chart-value">
        {{ value }}
      </ion-text>
      <ion-text v-if="suffix" class="chart-value-suffix">
        {{ suffix }}
      </ion-text>
    </ion-card-content>
    <ion-card-content v-else class="content centered">
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
  box-shadow: none;
  border-radius: 10px;
  background: linear-gradient(
    47deg,
    rgba(173, 173, 173, 0.2) -13.21%,
    rgba(74, 74, 74, 0) 115.22%
  );
  transition: ease-in-out;
  color: black;
  flex-direction: column;
  margin: 0;
  padding: 12px;
  aspect-ratio: 1;
  width: 150px;

  &.empty {
    background: none;
    border-radius: 10px;
    border: 3px dashed #ebebeb;
  }

  &:active {
    opacity: 0.4;
  }

  .content {
    padding: 0;

    &.centered {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .label {
    display: block;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .chart-value {
    font-weight: bold;
    font-size: 2rem;
  }

  .chart-value-suffix {
    display: flex;
    font-size: 0.8rem;
  }
}
</style>
