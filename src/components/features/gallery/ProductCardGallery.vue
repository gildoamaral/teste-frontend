<script setup lang="ts">
import { Image as ImageIcon } from 'lucide-vue-next';
import type { Product } from '@/types/Product';

defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  click: [product: Product];
}>();
</script>

<template>
  <div
    @click="emit('click', product)"
    class="bg-white dark:bg-gray-800 rounded-xs overflow-hidden shadow-sm transition-all cursor-pointer group"
  >

  <!-- Image -->
    <div
      class="aspect-square bg-gray-100 dark:bg-gray-700 relative overflow-hidden"
    >
      <img
        v-if="product.bbImageUrl"
        :src="product.bbImageUrl"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div
        v-else
        class="w-full h-full flex flex-col items-center justify-center text-gray-400"
      >
        <ImageIcon :size="48" />
        <span class="text-sm mt-2">Sem imagem</span>
      </div>

      <div class="absolute top-3 right-3">
        <span
          :class="
            product.status === 'OK'
              ? 'bg-green-500'
              : 'bg-red-500'
          "
          class="px-2 py-1 rounded-full text-xs font-medium text-white shadow-md"
        >
          {{ product.status === 'OK' ? 'OK' : 'INDISPONÍVEL' }}
        </span>
      </div>

      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center"
      >
        <span
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg"
        >
          Clique para editar
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 max-h-36">

      <h3 class="font-semibold text-lg line-clamp-2">
        {{ product.name }}
      </h3>

      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        EAN: {{ product.ean }}
      </p>

      <div class="flex items-center justify-between mt-4">
        <span class="text-sm text-gray-600 dark:text-gray-400">
          Score:
        </span>
        <span class="font-medium">
          {{ product.score !== null ? product.score.toFixed(4) : 'N/A' }}
        </span>
      </div>

      <div class="flex gap-2 mt-3">
        <span
          :class="product.bbImageUrl ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'"
          class="px-2 py-1 rounded text-xs font-medium"
        >
          BB Image
        </span>
        <span
          :class="product.miraklImage ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'"
          class="px-2 py-1 rounded text-xs font-medium"
        >
          Mirakl
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
