<script setup lang="ts">
import { ref, toRef } from "vue";
import { useProductStore } from "../stores/products";
import { useProductFilters } from "../composables/useProductFilters";
import { useProductMetrics } from "../composables/useProductMetrics";
import MetricCard from "../components/MetricCard.vue";
import ProductModal from "../components/ProductModal.vue";
import type { Product, ProductFormData } from "../types/Product";
import {
  Image,
  XCircle,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
} from "lucide-vue-next";

const productStore = useProductStore();

// Composables
const filters = useProductFilters(toRef(productStore, 'products'));
const metrics = useProductMetrics(toRef(productStore, 'products'));

// Modal state
const isModalOpen = ref(false);
const editingProduct = ref<Product | null>(null);

// Sorting
const sortField = ref<keyof Product | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

const deleteConfirmId = ref<string | null>(null);

function openAddModal() {
  editingProduct.value = null;
  isModalOpen.value = true;
}

function openEditModal(product: Product) {
  editingProduct.value = product;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  editingProduct.value = null;
}

function handleSave(data: ProductFormData) {
  if (editingProduct.value) {
    productStore.updateProduct(editingProduct.value.id, data);
  } else {
    productStore.addProduct(data);
  }
  closeModal();
}

function confirmDelete(id: string) {
  deleteConfirmId.value = id;
}

function cancelDelete() {
  deleteConfirmId.value = null;
}

function handleDelete(id: string) {
  productStore.deleteProduct(id);
  deleteConfirmId.value = null;
}

function toggleSort(field: keyof Product) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }
}

function getSortedProducts() {
  const products = [...filters.filteredProducts.value];
  if (!sortField.value) return products;

  return products.sort((a, b) => {
    const aVal = a[sortField.value!];
    const bVal = b[sortField.value!];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection.value === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection.value === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });
}
</script>

<template>
  <div class="space-y-6">
    <div
      v-if="productStore.products.length === 0"
      class="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center"
    >
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

    <template v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Produtos com BB Image"
          :value="metrics.productsWithBBImage.value"
          :icon="Image"
          color="blue"
        />
        <MetricCard
          title="Produtos com Mirakl Image"
          :value="metrics.productsWithMiraklImage.value"
          :icon="Image"
          color="indigo"
        />
        <MetricCard
          title="Indisponíveis"
          :value="metrics.unavailableProducts.value"
          :icon="XCircle"
          color="red"
        />
        <MetricCard
          title="Produtos OK"
          :value="metrics.okProducts.value"
          :icon="CheckCircle"
          color="green"
        />
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="flex-1 relative">
            <Search
              :size="20"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              :value="filters.searchQuery.value"
              @input="
                filters.setSearchQuery(
                  ($event.target as HTMLInputElement).value,
                )
              "
              type="text"
              placeholder="Buscar produtos..."
              class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div class="flex items-center gap-2">
            <Filter :size="20" class="text-gray-400" />
            <select
              :value="filters.statusFilter.value"
              @change="
                filters.setStatusFilter(
                  ($event.target as HTMLSelectElement).value,
                )
              "
              class="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">Todos Status</option>
              <option
                v-for="status in filters.statuses.value"
                :key="status"
                :value="status"
              >
                {{ status }}
              </option>
            </select>
          </div>

          <button
            v-if="filters.hasActiveFilters.value"
            @click="filters.clearFilters"
            class="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <X :size="18" />
            Limpar
          </button>

          <button
            @click="openAddModal"
            class="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
          >
            <Plus :size="18" />
            Adicionar
          </button>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th
                  @click="toggleSort('id')"
                  class="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                  class="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                <th class="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">
                  BB Image
                </th>
                <th class="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">
                  Mirakl Image
                </th>
                <th class="px-4 py-3 text-right text-sm font-semibold">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="product in getSortedProducts()"
                :key="product.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
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

                <td class="px-4 py-3 hidden lg:table-cell">
                  <span
                    :class="
                      product.bbImageUrl
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400'
                    "
                    class="px-2 py-1 rounded text-xs font-medium"
                  >
                    {{ product.bbImageUrl ? 'Sim' : 'Não' }}
                  </span>
                </td>

                <td class="px-4 py-3 hidden lg:table-cell">
                  <span
                    :class="
                      product.miraklImage
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400'
                    "
                    class="px-2 py-1 rounded text-xs font-medium"
                  >
                    {{ product.miraklImage ? 'Sim' : 'Não' }}
                  </span>
                </td>

                <td class="px-4 py-3">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openEditModal(product)"
                      class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-indigo-600 dark:text-indigo-400"
                      title="Editar"
                    >
                      <Pencil :size="18" />
                    </button>

                    <template v-if="deleteConfirmId === product.id">
                      <button
                        @click="handleDelete(product.id)"
                        class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                      >
                        Confirmar
                      </button>
                      <button
                        @click="cancelDelete"
                        class="px-2 py-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 rounded text-sm transition-colors"
                      >
                        Cancelar
                      </button>
                    </template>
                    <button
                      v-else
                      @click="confirmDelete(product.id)"
                      class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-red-600 dark:text-red-400"
                      title="Excluir"
                    >
                      <Trash2 :size="18" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-if="
            filters.filteredProducts.value.length === 0 &&
            productStore.products.length > 0
          "
          class="p-12 text-center"
        >
          <p class="text-gray-500 dark:text-gray-400">
            Nenhum produto encontrado com os filtros aplicados.
          </p>
          <button
            @click="filters.clearFilters"
            class="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Limpar filtros
          </button>
        </div>

        <div
          v-if="filters.filteredProducts.value.length > 0"
          class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400"
        >
          Exibindo {{ filters.filteredProducts.value.length }} de
          {{ productStore.products.length }} produtos
        </div>
      </div>
    </template>

    <ProductModal
      :is-open="isModalOpen"
      :product="editingProduct"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>
