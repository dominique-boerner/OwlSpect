<script setup lang="ts">
import OsmTile from "@/components/OsmTile.vue";
import { useMemory } from "@/composables/memory.composable";

const { calculateValue, calculateSuffix } = useMemory();
</script>
<template>
  <osm-tile label="RAM" :value="calculateValue()" :suffix="calculateSuffix()" />
</template>
