<script setup lang="ts">
import { ref } from "vue";
import OsCard from "@/components/OsCard.vue";
import { useMemoryStore } from "@/stores/memory.store";
import Header from "@/components/Header.vue";

const memoryStore = useMemoryStore();
const isOnline = ref(false);
</script>

<template>
  <Header :is-online="isOnline" computername="WS XXXXXX-1234" />
  <div class="grid grid-cols-2 gap-4">
    <OsCard
      title="RAM"
      :value="memoryStore.getMemoryUsage()"
      :additional-info="memoryStore.getMemoryCapacity()"
      :is-loading="memoryStore.isLoading"
    />
    <OsCard
      title="RAM"
      :value="memoryStore.getMemoryUsage()"
      :additional-info="memoryStore.getMemoryCapacity()"
      :is-loading="memoryStore.isLoading"
    />
    <OsCard
      title="RAM"
      :value="memoryStore.getMemoryUsage()"
      :additional-info="memoryStore.getMemoryCapacity()"
      :is-loading="memoryStore.isLoading"
    />
    <OsCard
      title="RAM"
      :value="memoryStore.getMemoryUsage()"
      :additional-info="memoryStore.getMemoryCapacity()"
      :is-loading="memoryStore.isLoading"
    />
    <OsCard
      title="RAM"
      :value="memoryStore.getMemoryUsage()"
      :additional-info="memoryStore.getMemoryCapacity()"
      :is-loading="memoryStore.isLoading"
    />
    <OsCard
      title="RAM"
      :value="memoryStore.getMemoryUsage()"
      :additional-info="memoryStore.getMemoryCapacity()"
      :is-loading="memoryStore.isLoading"
    />
  </div>
</template>
