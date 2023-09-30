<script setup lang="ts">
import windowsImage from "@/assets/windows.png";
import OnlineState from "@/components/OnlineState.vue";

interface HeaderProps {
  isOnline?: boolean;
  computername?: string;
}

withDefaults<HeaderProps>(defineProps<HeaderProps>(), {
  isOnline: false,
  computername: "",
});
</script>
<template>
  <div class="flex items-center flex-wrap pb-4 h-28">
    <div class="relative">
      <!-- TODO: render image based on the used operating system -->
      <img class="w-12 m-4" :src="windowsImage" alt="windows-logo" />
      <OnlineState :is-online="isOnline" />
    </div>
    <div class="flex flex-col">
      <span class="text-2xl font-bold">{{ computername }}</span>
    </div>
  </div>
</template>
