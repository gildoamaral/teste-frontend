<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next';
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
    <div
      class="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
    >
      <AlertTriangle :size="40" class="text-gray-400" />
    </div>
    <h2 class="text-2xl font-bold mb-2">Nenhum produto carregado</h2>
    <p class="text-gray-500 dark:text-gray-400 mb-6">
      Importe uma planilha Excel para começar a gerenciar seus produtos.
    </p>
    <p class="text-sm text-gray-400 dark:text-gray-500">
      Use o botão "Importar" no cabeçalho para carregar sua planilha.
    </p>
  </div>
</template>
