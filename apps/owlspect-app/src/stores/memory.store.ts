import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useByteConverter } from "@/composables/byte-converter.composable";
import { useAuthStore } from "@/stores/auth.store";

export const useMemoryStore = defineStore("memoryStore", () => {
  const byteConverter = useByteConverter();
  const authStore = useAuthStore();

  const memory = ref();
  const hasError = ref(false);
  const isLoading = ref(false);
  const fetchInterval = ref(1000);

  onMounted(async () => {
    await fetchMemory();
    setInterval(fetchMemory, fetchInterval.value);
  });

  async function fetchMemory() {
    try {
      const loadingTimeout = setTimeout(() => (isLoading.value = true), 1000);
      const response = (
        await axios.get("http://localhost:3000/memory", {
          headers: {
            authorization: authStore.password,
          },
        })
      ).data;
      clearTimeout(loadingTimeout);
      isLoading.value = false;
      hasError.value = false;
      memory.value = response.data;
    } catch (e) {
      isLoading.value = false;
      hasError.value = true;
      console.error(e);
    }
  }

  function getMemoryUsage(): string {
    try {
      const usage = memory.value.used;
      const total = memory.value.total;
      const percentage = ((usage / total) * 100).toFixed(1);

      return `${percentage} %`;
    } catch (e) {
      return "";
    }
  }

  function getMemoryCapacity(): string {
    try {
      const memoryValue = memory.value;
      if (!memoryValue) {
        return "";
      }

      const totalMemory = memoryValue.total;
      const freeMemory = memoryValue.free;

      const usedRam = byteConverter.formatBytes(totalMemory - freeMemory);
      const totalRam = byteConverter.formatBytes(totalMemory);
      return `${usedRam} / ${totalRam}`;
    } catch (e) {
      return "";
    }
  }

  function getRamThresholds() {
    // TODO: implement severity later
    return {
      low: {
        min: 0,
        max: 40,
      },
      medium: {
        min: 41,
        max: 75,
      },
      high: {
        min: 76,
        max: 100,
      },
    };
  }

  return {
    memory,
    isLoading,
    hasError,
    getMemoryUsage,
    getMemoryCapacity,
    fetchMemory,
    getRamThresholds,
  };
});
