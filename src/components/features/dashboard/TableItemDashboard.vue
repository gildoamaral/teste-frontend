<script setup lang="ts">
import { Image, Pencil, Trash2 } from 'lucide-vue-next';
import type { Product } from '@/types/Product';

defineProps<{
  product: Product;
  isDeleting: boolean;
}>();

const emit = defineEmits<{
  edit: [product: Product];
  delete: [id: string];
  confirmDelete: [id: string];
  cancelDelete: [];
}>();
</script>

<template>
  <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
    <td class="px-4 py-3 font-mono text-sm">
      {{ product.id }}
    </td>

    <td class="px-4 py-3 font-mono text-sm hidden md:table-cell">
      {{ product.ean }}
    </td>

    <td class="px-4 py-3">
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden shrink-0"
        >
          <img
            v-if="product.bbImageUrl"
            :src="product.bbImageUrl"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center"
          >
            <Image :size="20" class="text-gray-400" />
          </div>
        </div>
        <p class="font-medium">{{ product.name }}</p>
      </div>
    </td>

    <td class="px-4 py-3">
      <span
        :class="
          product.status === 'OK'
            ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400'
            : product.status === 'INDISPONI'
              ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400'
              : 'bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-400'
        "
        class="px-2 py-1 rounded-full text-xs font-medium"
      >
        {{ product.status }}
      </span>
    </td>

    <td class="px-4 py-3 hidden sm:table-cell font-mono">
      <span v-if="product.score !== null">
        {{ product.score.toFixed(4) }}
      </span>
      <span v-else class="text-gray-400 dark:text-gray-500">
        N/A
      </span>
    </td>

    <td class="px-4 py-3">
      <div class="flex items-center justify-end gap-2">
        <button
          @click="$emit('edit', product)"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-indigo-600 dark:text-indigo-400"
          title="Editar"
        >
          <Pencil :size="18" />
        </button>

        <template v-if="isDeleting">
          <button
            @click="$emit('delete', product.id)"
            class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
          >
            Confirmar
          </button>
          <button
            @click="$emit('cancelDelete')"
            class="px-2 py-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 rounded text-sm transition-colors"
          >
            Cancelar
          </button>
        </template>
        <button
          v-else
          @click="$emit('confirmDelete', product.id)"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-red-600 dark:text-red-400"
          title="Excluir"
        >
          <Trash2 :size="18" />
        </button>
      </div>
    </td>
  </tr>
</template>
