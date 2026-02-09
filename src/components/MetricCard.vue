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
    indigo: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:border-indigo-500",
    green:  "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 hover:border-green-500",
    red:    "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 hover:border-red-500",
    yellow: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 hover:border-yellow-500",
    blue:   "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:border-blue-500",
  };
  return colors[props.color];
});

const colorBorder = computed(() => {
const colors = {
    indigo: "border-indigo-500",
    green:  "border-green-500",
    red:    "border-red-500",
    yellow: "border-yellow-500",
    blue:   "border-blue-500",
  };
  return colors[props.color];
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xs sm:rounded-xl p-3  md:p-6 shadow-sm hover:shadow-lg hover:scale-102 transform transition-all flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-4 select-none border-l sm:border-none"
    :class="colorBorder"
  >
    <div 
      class="p-2 md:p-3 rounded-lg hidden md:block" 
      :class="colorClasses"
    >
      <component :is="icon" :size="24" class="md:w-7" />
    </div>

    <div class="flex flex-col md:justify-center justify-between h-full">
      <p class="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium leading-tight">
        {{ title }}
      </p>
      <p class="text-xl md:text-2xl font-bold mt-1 ">
        {{ value }}
      </p>
    </div>
  </div>
</template>
