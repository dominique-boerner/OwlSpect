<script setup lang="ts">
type OsCardSeverity = "low" | "medium" | "high";

interface OsCardProps {
  title?: string;
  value?: string;
  additionalInfo?: string;
  isLoading?: boolean;
  severity?: OsCardSeverity;
  hasChart?: boolean;
}

withDefaults(defineProps<OsCardProps>(), {
  additionalInfo: "",
  isLoading: false,
  severity: "low",
  hasChart: false,
});
</script>
<template>
  <div
    class="rounded-lg aspect-square w-full h-full shadow-lg"
    :class="{
      'animate-pulse': isLoading,
      'aspect-auto': hasChart,
    }"
  >
    <div class="flex flex-col py-4 justify-between w-full h-full">
      <div class="flex flex-col px-2 h-full">
        <span v-if="title" class="font-bold">
          {{ title }}
        </span>
        <slot name="content" />
        <span
          v-if="value"
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
