<script setup lang="ts">
type OsCardSeverity = "low" | "medium" | "high";

interface OsCardProps {
  title?: string;
  value?: string;
  additionalInfo?: string;
  isLoading?: boolean;
  severity?: OsCardSeverity;
}

withDefaults(defineProps<OsCardProps>(), {
  title: "",
  value: "",
  additionalInfo: "",
  isLoading: false,
  severity: "low",
});
</script>
<template>
  <div
    class="border-2 rounded-lg aspect-square"
    :class="{
      'animate-pulse': isLoading,
    }"
  >
    <div class="flex flex-col py-4 h-full justify-between">
      <div class="flex flex-col px-2">
        <span class="font-bold">
          {{ title }}
        </span>
        <span
          class="font-bold text-4xl"
          :class="{
            'text-danger': severity === 'high',
            'text-warning': severity === 'medium',
          }"
          >{{ value }}</span
        >
      </div>
      <span class="px-2 text-sm">
        {{ additionalInfo }}
      </span>
    </div>
  </div>
</template>
