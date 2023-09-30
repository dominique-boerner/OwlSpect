import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Store containing authentication information.
 */
export const useAuthStore = defineStore("authStore", () => {
  const password = ref("r@nd0mP4ssw0rd");

  function isAuthenticated() {
    return password.value.trim().length > 0;
  }

  return {
    password,
    isAuthenticated,
  };
});
