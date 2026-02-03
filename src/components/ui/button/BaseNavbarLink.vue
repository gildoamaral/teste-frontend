<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import type { Component } from "vue";

interface Props {
  to: string;
  label: string;
  icon: Component;
  routeName: string;
}

defineProps<Props>();
const route = useRoute();
</script>

<template>
  <RouterLink
    :to="to"
    class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
    :class="{
      'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400':
        route.name === routeName,
    }"
  >
    <component :is="icon" :size="20" />
    {{ label }}
  </RouterLink>
</template>
