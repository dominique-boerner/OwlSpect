import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useByteConverter } from "@/composables/byte-converter.composable";
import { useAuthStore } from "@/stores/auth.store";
import type { MemoryResponse } from "owlspect-shared/public-api";
import { isNullOrUndefined } from "@/utils/vue-ref.util";

export const useMemoryStore = defineStore("memoryStore", () => {
  const byteConverter = useByteConverter();
  const authStore = useAuthStore();

  const memory = ref<MemoryResponse>();
  const hasError = ref(false);
  const isLoading = ref(true);
  const fetchInterval = ref(1000);

  onMounted(async () => {
    await fetchMemory();
    setInterval(fetchMemory, fetchInterval.value);
  });

  async function fetchMemory() {
    try {
      const response = (
        await axios.get("http://localhost:3000/memory", {
          headers: {
            authorization: authStore.password,
          },
        })
      ).data;
      memory.value = response;
      isLoading.value = false;
      hasError.value = false;
    } catch (e) {
      isLoading.value = false;
      hasError.value = true;
      console.error(e);
    }
  }

  function getMemoryUsage(): string {
    try {
      if (isLoading.value || hasError.value) {
        return "";
      }

      if (isNullOrUndefined(memory)) {
        return "";
      }

      const memoryValue = memory.value as MemoryResponse;

      const usage = memoryValue.data.used;
      const total = memoryValue.data.total;
      const percentage = ((usage / total) * 100).toFixed(1);

      return `${percentage} %`;
    } catch (e) {
      return "";
    }
  }

  function getMemoryCapacity(): string {
    try {
      if (isLoading.value || hasError.value) {
        return "";
      }

      if (isNullOrUndefined(memory)) {
        return "";
      }

      const memoryValue = memory.value as MemoryResponse;

      const totalMemory = memoryValue.data.total;
      const freeMemory = memoryValue.data.free;

      const usedRam = byteConverter.formatBytes(totalMemory - freeMemory);
      const totalRam = byteConverter.formatBytes(totalMemory);
      return `${usedRam} / ${totalRam}`;
    } catch (e) {
      return "";
    }
  }

  return {
    memory,
    isLoading,
    hasError,
    getMemoryUsage,
    getMemoryCapacity,
  };
});
