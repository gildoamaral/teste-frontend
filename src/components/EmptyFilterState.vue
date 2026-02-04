<script setup lang="ts">
defineProps<{
  message?: string;
}>();

const emit = defineEmits<{
  clearFilters: [];
}>();
</script>

<template>
  <div class="p-12 text-center">
    <p class="text-gray-500 dark:text-gray-400">
      {{ message || 'Nenhum produto encontrado com os filtros aplicados.' }}
    </p>
    <button
      @click="emit('clearFilters')"
      class="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
    >
      Limpar filtros
    </button>
  </div>
</template>
