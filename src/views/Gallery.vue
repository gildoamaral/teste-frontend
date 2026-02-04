<script setup lang="ts">
import { ref, toRef, computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "../stores/products";
import { useProductFilters } from "../composables/useProductFilters";
import EmptyStateGallery from "../components/features/gallery/EmptyStateGallery.vue";
import FunctionalBarGallery from "../components/features/gallery/FunctionalBarGallery.vue";
import ProductCardGallery from "../components/features/gallery/ProductCardGallery.vue";
import EmptyFilterState from "../components/EmptyFilterState.vue";
import Pagination from "../components/Pagination.vue";
import type { Product } from "../types/Product";

const router = useRouter();
const productStore = useProductStore();
const filters = useProductFilters(toRef(productStore, 'products'));

const currentPage = ref(1);
const itemsPerPage = 15;

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filters.filteredProducts.value.slice(start, end);
});

function openProductDetails(product: Product) {
  router.push({ name: 'product-details', params: { id: product.id } });
}
</script>

<template>
  <div class="space-y-6">
    <EmptyStateGallery v-if="productStore.products.length === 0" />

    <template v-else>
      
      <FunctionalBarGallery
        :search-query="filters.searchQuery.value"
        :status-filter="filters.statusFilter.value"
        :statuses="filters.statuses.value"
        :has-active-filters="filters.hasActiveFilters.value"
        @update:search-query="filters.setSearchQuery"
        @update:status-filter="filters.setStatusFilter"
        @clear-filters="filters.clearFilters"
      />

      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
      >
        <ProductCardGallery
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @click="openProductDetails"
        />
      </div>


      <div
        v-if="
          filters.filteredProducts.value.length === 0 &&
          productStore.products.length > 0
        "
        class="bg-white dark:bg-gray-800 rounded-xl"
      >
        <EmptyFilterState @clear-filters="filters.clearFilters" />
      </div>

      <div
        v-if="filters.filteredProducts.value.length > 0"
        class="bg-transparent dark:bg-gray-800 rounded-xs overflow-hidden"
      >
        <Pagination
          v-model:current-page="currentPage"
          :total-items="filters.filteredProducts.value.length"
          :items-per-page="itemsPerPage"
        />
      </div>
    </template>
  </div>
</template>

