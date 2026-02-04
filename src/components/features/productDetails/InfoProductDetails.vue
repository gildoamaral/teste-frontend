<script setup lang="ts">
import type { Product } from '@/types/Product';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl p-6">
    <h1 class="text-2xl font-bold mb-6">{{ product.name }}</h1>

    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm text-gray-500 dark:text-gray-400">ID</label>
          <p class="font-mono text-sm mt-1">{{ product.id }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500 dark:text-gray-400">EAN</label>
          <p class="font-mono text-sm mt-1">{{ product.ean }}</p>
        </div>
      </div>

      <div>
        <label class="text-sm text-gray-500 dark:text-gray-400">Status</label>
        <div class="flex items-center gap-2 mt-1">
          <span
            :class="
              product.status === 'OK'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            "
            class="font-semibold"
          >
            {{ product.status }}
          </span>
        </div>
      </div>

      <div>
        <label class="text-sm text-gray-500 dark:text-gray-400">Score</label>
        <p class="text-2xl font-bold mt-1">
          {{ product.score !== null ? product.score.toFixed(4) : 'N/A' }}
        </p>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div
            v-if="product.score !== null"
            :style="{ width: `${product.score * 100}%` }"
            class="bg-indigo-600 h-2 rounded-full transition-all"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
