<script setup lang="ts">
interface AppBarProps {
  canNavigateBack?: boolean;
}
withDefaults(defineProps<AppBarProps>(), {
  canNavigateBack: false,
});
</script>
<template>
  <div class="flex justify-between items-center shrink-0 self-stretch bg-light">
    <div
      :class="{
        invisible: !canNavigateBack,
      }"
    >
      <vue-feather type="chevron-left" />
    </div>
    <slot name="title"></slot>
    <vue-feather type="settings" />
  </div>
</template>
