<script setup lang="ts">
import { Image as ImageIcon, CheckCircle } from 'lucide-vue-next';
import type { Product } from '@/types/Product';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl p-6">
    <div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden relative">
      <img
        v-if="product.bbImageUrl"
        :src="product.bbImageUrl"
        :alt="product.name"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full flex flex-col items-center justify-center text-gray-400"
      >
        <ImageIcon :size="64" />
        <span class="mt-2">Sem imagem</span>
      </div>

      <div class="absolute top-4 right-4">
        <span
          :class="
            product.status !== 'OK'
              ? 'bg-red-500 shadow-lg'
              : ''
          "
          class="px-3 py-1.5 rounded-full text-sm font-medium text-white"
        >
          {{ product.status !== 'OK' ? 'INDISPONÍVEL' : '' }}
        </span>
      </div>
    </div>

    <div class="mt-6 space-y-3">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <CheckCircle
            :size="18"
            :class="product.bbImageUrl ? 'text-green-600' : 'text-gray-400'"
          />
          <span class="text-sm font-medium">Imagem BB</span>
        </div>
        <div
          v-if="product.bbImageUrl"
          class="text-xs text-gray-600 dark:text-gray-400 break-all bg-gray-50 dark:bg-gray-900 p-2 rounded"
        >
          {{ product.bbImageUrl }}
        </div>
        <div v-else class="text-xs text-gray-400">Não disponível</div>
      </div>

      <div>
        <div class="flex items-center gap-2 mb-2">
          <CheckCircle
            :size="18"
            :class="product.miraklImage ? 'text-blue-600' : 'text-gray-400'"
          />
          <span class="text-sm font-medium">Imagem Mirakl</span>
        </div>
        <div
          v-if="product.miraklImage"
          class="text-xs text-gray-600 dark:text-gray-400 break-all bg-gray-50 dark:bg-gray-900 p-2 rounded"
        >
          {{ product.miraklImage }}
        </div>
        <div v-else class="text-xs text-gray-400">Não disponível</div>
      </div>
    </div>
  </div>
</template>
