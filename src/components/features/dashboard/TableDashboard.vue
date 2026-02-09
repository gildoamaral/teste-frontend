<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronUp, ChevronDown } from 'lucide-vue-next';
import type { Product } from '@/types/Product';
import TableItemDashboard from './TableItemDashboard.vue';
import Pagination from '@/components/Pagination.vue';
import EmptyFilterState from '@/components/EmptyFilterState.vue';

const props = defineProps<{
  products: Product[];
  totalProducts: number;
}>();

const emit = defineEmits<{
  edit: [product: Product];
  delete: [id: string];
  clearFilters: [];
}>();

const sortField = ref<keyof Product | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');

const currentPage = ref(1);
const itemsPerPage = 15;

const deleteConfirmId = ref<string | null>(null);

const sortedProducts = computed(() => {
  const productsCopy = [...props.products];
  if (!sortField.value) return productsCopy;

  return productsCopy.sort((a, b) => {
    const aVal = a[sortField.value!];
    const bVal = b[sortField.value!];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection.value === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection.value === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedProducts.value.slice(start, end);
});

function toggleSort(field: keyof Product) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
  currentPage.value = 1;
}

function confirmDelete(id: string) {
  deleteConfirmId.value = id;
}

function cancelDelete() {
  deleteConfirmId.value = null;
}

function handleDelete(id: string) {
  emit('delete', id);
  deleteConfirmId.value = null;
}

function handleEdit(product: Product) {
  emit('edit', product);
}

function resetPagination() {
  currentPage.value = 1;
}

defineExpose({ resetPagination });
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 dark:bg-gray-700/50">
          <tr>
            <th
              @click="toggleSort('id')"
              class="px-4 py-3 text-left text-sm font-semibold cursor-pointer hidden md:table-cell hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div class="flex items-center gap-2">
                ID
                <template v-if="sortField === 'id'">
                  <ChevronUp v-if="sortDirection === 'asc'" :size="16" />
                  <ChevronDown v-else :size="16" />
                </template>
              </div>
            </th>
            <th
              @click="toggleSort('ean')"
              class="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:table-cell"
            >
              <div class="flex items-center gap-2">
                EAN
                <template v-if="sortField === 'ean'">
                  <ChevronUp v-if="sortDirection === 'asc'" :size="16" />
                  <ChevronDown v-else :size="16" />
                </template>
              </div>
            </th>
            <th
              @click="toggleSort('name')"
              class="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-[40%]"
            >
              <div class="flex items-center gap-2">
                Nome
                <template v-if="sortField === 'name'">
                  <ChevronUp v-if="sortDirection === 'asc'" :size="16" />
                  <ChevronDown v-else :size="16" />
                </template>
              </div>
            </th>
            <th
              @click="toggleSort('status')"
              class="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div class="flex items-center gap-2">
                Status
                <template v-if="sortField === 'status'">
                  <ChevronUp v-if="sortDirection === 'asc'" :size="16" />
                  <ChevronDown v-else :size="16" />
                </template>
              </div>
            </th>
            <th
              @click="toggleSort('score')"
              class="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden sm:table-cell"
            >
              <div class="flex items-center gap-2">
                Score
                <template v-if="sortField === 'score'">
                  <ChevronUp v-if="sortDirection === 'asc'" :size="16" />
                  <ChevronDown v-else :size="16" />
                </template>
              </div>
            </th>

            <th class="px-4 py-3 text-right text-sm font-semibold">
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <TableItemDashboard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
            :is-deleting="deleteConfirmId === product.id"
            @edit="handleEdit"
            @delete="handleDelete"
            @confirm-delete="confirmDelete"
            @cancel-delete="cancelDelete"
          />
        </tbody>
      </table>
    </div>

    <div
      v-if="products.length === 0 && totalProducts > 0"
    >
      <EmptyFilterState @clear-filters="$emit('clearFilters')" />
    </div>

    <Pagination
      v-model:current-page="currentPage"
      :total-items="products.length"
      :items-per-page="itemsPerPage"
    />
  </div>
</template>
