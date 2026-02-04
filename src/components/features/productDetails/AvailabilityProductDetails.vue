<script setup lang="ts">
import { CheckCircle } from 'lucide-vue-next';
import type { Product } from '@/types/Product';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl p-6">
    <h2 class="text-lg font-semibold mb-4">Disponibilidade de Imagens</h2>
    
    <div class="space-y-3">
      <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
        <div class="flex items-center gap-3">
          <div
            :class="product.bbImageUrl ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-200 dark:bg-gray-700'"
            class="w-10 h-10 rounded-full flex items-center justify-center"
          >
            <CheckCircle
              :size="20"
              :class="product.bbImageUrl ? 'text-green-600 dark:text-green-400' : 'text-gray-400'"
            />
          </div>
          <span class="font-medium">BigBuy Image</span>
        </div>
        <span
          :class="product.bbImageUrl ? 'text-green-600 dark:text-green-400' : 'text-gray-500'"
          class="text-sm font-medium"
        >
          {{ product.bbImageUrl ? 'Disponível' : 'Indisponível' }}
        </span>
      </div>

      <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
        <div class="flex items-center gap-3">
          <div
            :class="product.miraklImage ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-200 dark:bg-gray-700'"
            class="w-10 h-10 rounded-full flex items-center justify-center"
          >
            <CheckCircle
              :size="20"
              :class="product.miraklImage ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'"
            />
          </div>
          <span class="font-medium">Mirakl Image</span>
        </div>
        <span
          :class="product.miraklImage ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'"
          class="text-sm font-medium"
        >
          {{ product.miraklImage ? 'Disponível' : 'Indisponível' }}
        </span>
      </div>
    </div>
  </div>
</template>
