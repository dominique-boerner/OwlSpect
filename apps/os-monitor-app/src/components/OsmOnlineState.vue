<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps<{
  isOnline?: boolean;
}>();

const isOnline = ref<boolean>(false);

const fetchInterval = () => {
  setInterval(healthcheck, 5000);
};

onMounted(() => {
  healthcheck();
  fetchInterval();
});

async function healthcheck() {
  try {
    const healthcheck = await fetch("http://localhost:3000/healthcheck");
    isOnline.value = await healthcheck.json();
  } catch (e) {
    isOnline.value = false;
  }
}
</script>

<template>
  <div class="online-state" :class="{ online: isOnline }">
    <vue-feather v-if="isOnline" type="check" size="1rem"></vue-feather>
    <vue-feather v-else type="x" size="1rem"></vue-feather>
  </div>
</template>

<style scoped lang="scss">
.online-state {
  $size: 24px;

  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: $size;
  background: var(--ion-color-danger);
  aspect-ratio: 1;
  bottom: 0;
  right: 0;
  transform: translateX(calc($size / 2)) translateY(calc($size / 2));
  border-radius: 50%;
  color: white;

  &.online {
    background: var(--ion-color-success);
  }
}
</style>
