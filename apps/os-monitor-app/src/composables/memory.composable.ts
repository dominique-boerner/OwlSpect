import { onMounted, ref } from "vue";
import { ConnectorResponse } from "../../../shared/models/connector-response.interface";
import { Memory } from "../../../shared/models/memory.interface";
import { useToast } from "@/composables/toast.composable";
import { useByteConverter } from "@/composables/byte-converter.composable";

export const useMemory = () => {
  const toast = useToast();
  const byteConverter = useByteConverter();

  const memoryResponse = ref<ConnectorResponse<Memory>>();

  /**
   * Re-fetch memory information for os-monitor-connector in interval.
   */
  onMounted(async () => {
    await fetchMemory();
    setInterval(fetchMemory, 1000);
  });

  /**
   * Fetch the memory from os-monitor-connector.
   */
  const fetchMemory = async () => {
    const memoryRequest = await fetch("http://localhost:3000/memory");
    const memoryValue = await memoryRequest.json();
    memoryResponse.value = memoryValue;
  };

  const calculateValue = (): string => {
    try {
      const usage = memoryResponse.value?.response?.usage ?? 0;
      const value = (100 - usage * 100).toFixed(1);
      return `${value} %`;
    } catch (e) {
      if (e instanceof Error) {
        toast.createErrorToast(
          `Error while trying to calculate RAM label: ${e.message}`,
        );
      }
      return "";
    }
  };

  const calculateSuffix = (): string => {
    try {
      const memoryValue = memoryResponse.value;
      const totalMemory = memoryValue?.response?.totalmem ?? 0;
      const freeMemory = memoryValue?.response?.freemem ?? 0;

      const usedRam = byteConverter.formatBytes(totalMemory - freeMemory);
      const totalRam = byteConverter.formatBytes(totalMemory);
      return `${usedRam} / ${totalRam}`;
    } catch (e) {
      if (e instanceof Error) {
        toast.createErrorToast(
          `Error while trying to calculate, how many ram is used: ${e.message}`,
        );
      }
      return "";
    }
  };

  return {
    memoryResponse,
    calculateValue,
    calculateSuffix,
  };
};
