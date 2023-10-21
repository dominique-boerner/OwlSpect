<script setup lang="ts">
import { ref } from "vue";
import OsCard from "@/components/OsCard.vue";
import { useMemoryStore } from "@/stores/memory.store";
import Header from "@/components/Header.vue";
import AddTile from "@/components/AddTile.vue";

const memoryStore = useMemoryStore();
const isOnline = ref(false);
</script>

<template>
  <Header :is-online="isOnline" computername="WS XXXXXX-1234" />
  <div class="grid grid-cols-2 grid-flow-dense gap-4">
    <OsCard
      class="flex"
      title="CPU"
      :value="memoryStore.getMemoryUsage()"
      :additional-info="memoryStore.getMemoryCapacity()"
      :is-loading="memoryStore.isLoading"
    />
    <div
      class="flex flex-col justify-center items-center shadow-xl shadow-blue-200 rounded-xl p-2 bg-blue-500 text-white transition active:shadow-md"
    >
      <vue-feather type="thermometer" size="3.3rem" stroke-width="1px" />
      <span class="font-bold text-2xl">45,3°C</span>
      <span class="text-xs">Temperature</span>
    </div>
    <OsCard
      title="RAM"
      :value="memoryStore.getMemoryUsage()"
      :additional-info="memoryStore.getMemoryCapacity()"
      :is-loading="memoryStore.isLoading"
    >
      <template #content> Chart! </template>
    </OsCard>
    <AddTile />
  </div>
</template>
