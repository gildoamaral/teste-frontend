<script setup lang="ts">
import { XCircle } from 'lucide-vue-next';
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
    <XCircle :size="48" class="mx-auto mb-4 text-red-500" />
    <h2 class="text-2xl font-bold mb-2">Produto não encontrado</h2>
    <p class="text-gray-500 dark:text-gray-400">
      O produto solicitado não existe ou foi removido.
    </p>
  </div>
</template>
