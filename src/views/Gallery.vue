<script setup lang="ts">
import { ref, toRef } from "vue";
import { useProductStore } from "../stores/products";
import { useProductFilters } from "../composables/useProductFilters";
import ProductModal from "../components/ProductModal.vue";
import type { Product, ProductFormData } from "../types/Product";
import {
  Image as ImageIcon,
  AlertTriangle,
  Search,
  Filter,
  X,
} from "lucide-vue-next";

const productStore = useProductStore();
const filters = useProductFilters(toRef(productStore, 'products'));

// Modal state
const isModalOpen = ref(false);
const editingProduct = ref<Product | null>(null);

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
  }
  closeModal();
}
</script>

<template>
  <div class="space-y-6">
    <!-- Empty State -->
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
        Importe uma planilha Excel para visualizar a galeria de produtos.
      </p>
      <p class="text-sm text-gray-400 dark:text-gray-500">
        Use o botão "Importar" no cabeçalho para carregar sua planilha.
      </p>
    </div>

    <template v-else>
      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Search -->
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

          <!-- Status Filter -->
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

          <!-- Clear Filters -->
          <button
            v-if="filters.hasActiveFilters.value"
            @click="filters.clearFilters"
            class="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <X :size="18" />
            Limpar
          </button>
        </div>
      </div>

      <!-- Gallery Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="product in filters.filteredProducts.value"
          :key="product.id"
          @click="openEditModal(product)"
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
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

            <!-- Status Badge -->
            <div class="absolute top-3 right-3">
              <span
                :class="
                  product.status === 'OK'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                "
                class="px-2 py-1 rounded-full text-xs font-medium text-white shadow-md"
              >
                {{ product.status === 'OK' ? 'OK' : 'INDISPONI' }}
              </span>
            </div>

            <!-- Hover Overlay -->
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
          <div class="p-4">
            <!-- Status -->
            <span
              :class="
                product.status === 'OK'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              "
              class="text-xs font-medium uppercase tracking-wide"
            >
              {{ product.status }}
            </span>

            <!-- Name -->
            <h3 class="font-semibold text-lg mt-1 line-clamp-2">
              {{ product.name }}
            </h3>

            <!-- EAN -->
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              EAN: {{ product.ean }}
            </p>

            <!-- Score -->
            <div class="flex items-center justify-between mt-4">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Score:
              </span>
              <span class="font-medium">
                {{ product.score !== null ? product.score.toFixed(4) : 'N/A' }}
              </span>
            </div>

            <!-- Images Badges -->
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
      </div>

      <!-- No Results -->
      <div
        v-if="
          filters.filteredProducts.value.length === 0 &&
          productStore.products.length > 0
        "
        class="bg-white dark:bg-gray-800 rounded-xl p-12 text-center"
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

      <!-- Results Count -->
      <div
        v-if="filters.filteredProducts.value.length > 0"
        class="text-center text-sm text-gray-500 dark:text-gray-400"
      >
        Exibindo {{ filters.filteredProducts.value.length }} de
        {{ productStore.products.length }} produtos
      </div>
    </template>

    <!-- Product Modal -->
    <ProductModal
      :is-open="isModalOpen"
      :product="editingProduct"
      @close="closeModal"
      @save="handleSave"
    />
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
