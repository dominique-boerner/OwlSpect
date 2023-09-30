<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import AppBar from "@/components/AppBar.vue";
import LogoWithName from "@/components/LogoWithName.vue";

const { isAuthenticated } = useAuthStore();
</script>

<template>
  <header v-if="isAuthenticated()">
    <nav>
      <AppBar class="h-14">
        <template #title>
          <LogoWithName />
        </template>
      </AppBar>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
