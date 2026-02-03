import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(true);

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme() {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  }

  function toggleTheme() {
    isDark.value = !isDark.value;
    applyTheme();
  }

  function setDarkMode(value: boolean) {
    isDark.value = value;
    applyTheme();
  }

  applyTheme();

  watch(isDark, () => {
    applyTheme();
  });

  return {
    isDark,
    toggleTheme,
    setDarkMode,
  };
});
