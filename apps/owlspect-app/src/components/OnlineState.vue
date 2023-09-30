<script setup lang="ts">
interface OnlineStateProps {
  isOnline?: boolean;
}

withDefaults(defineProps<OnlineStateProps>(), {
  isOnline: false,
});

// TODO: implement "isOnline" directly in this component.
</script>

<template>
  <div
    class="flex justify-center items-center w-5 text-white aspect-square rounded-full absolute bottom-2 right-2"
    :class="{
      'bg-success': isOnline,
      'bg-danger': !isOnline,
    }"
  >
    <vue-feather v-if="isOnline" type="check" size=".8rem"></vue-feather>
    <vue-feather v-else type="x" size=".8rem"></vue-feather>
  </div>
</template>
