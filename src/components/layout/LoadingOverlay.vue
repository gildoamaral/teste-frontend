<script setup lang="ts">
import { useProductStore } from '../../stores/products';



const productStore = useProductStore();

</script>

<template>
      <div
      v-if="productStore.isLoading"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-8 flex flex-col items-center gap-4"
      >
        <div
          class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"
        ></div>
        <p class="text-lg font-medium">Carregando...</p>
      </div>
    </div>
</template>