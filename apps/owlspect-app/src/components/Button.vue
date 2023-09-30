<script setup lang="ts">
interface ButtonProps {
  mode: "primary" | "secondary";
}

withDefaults<ButtonProps>(defineProps<ButtonProps>(), {
  mode: "primary",
});
</script>

<template>
  <button
    class="btn btn-primary btn-lg mask mask-squircle text-white"
    :class="{
      'btn-primary': mode === 'primary',
      'btn-secondary': mode === 'secondary',
    }"
  >
    <slot></slot>
  </button>
</template>
