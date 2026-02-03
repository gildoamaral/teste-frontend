<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title: string;
  value: number | string;
  icon: any;
  color?: "indigo" | "green" | "red" | "yellow" | "blue";
}

const props = withDefaults(defineProps<Props>(), {
  color: "indigo",
});

const colorClasses = computed(() => {
  const colors = {
    indigo:
      "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400",
    green:
      "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
    red: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400",
    yellow:
      "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400",
    blue: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
  };
  return colors[props.color];
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
  >
    <div class="flex items-center gap-4">
      <div class="p-3 rounded-lg" :class="colorClasses">
        <component :is="icon" :size="28" />
      </div>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ title }}</p>
        <p class="text-2xl font-bold">{{ value }}</p>
      </div>
    </div>
  </div>
</template>
