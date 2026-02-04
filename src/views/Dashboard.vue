<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useProductStore } from '@/stores/products';
import { useProductFilters } from '@/composables/useProductFilters';
import { useProductMetrics } from '@/composables/useProductMetrics';
import ProductModal from '@/components/ProductModal.vue';
import EmptyStateDashboard from '@/components/features/dashboard/EmptyStateDashboard.vue';
import MetricsDashboard from '@/components/features/dashboard/MetricsDashboard.vue';
import FunctionalBarDashboard from '@/components/features/dashboard/FunctionalBarDashboard.vue';
import TableDashboard from '@/components/features/dashboard/TableDashboard.vue';
import type { Product, ProductFormData } from '@/types/Product';

const productStore = useProductStore();

const filters = useProductFilters(toRef(productStore, 'products'));
const metrics = useProductMetrics(toRef(productStore, 'products'));

const isModalOpen = ref(false);
const editingProduct = ref<Product | null>(null);

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

function handleDelete(id: string) {
  productStore.deleteProduct(id);
}
</script>

<template>
  <div class="space-y-6">
    <EmptyStateDashboard v-if="productStore.products.length === 0" />

    <template v-else>
      <MetricsDashboard
        :products-with-b-b-image="metrics.productsWithBBImage.value"
        :products-with-mirakl-image="metrics.productsWithMiraklImage.value"
        :unavailable-products="metrics.unavailableProducts.value"
        :ok-products="metrics.okProducts.value"
      />

      <FunctionalBarDashboard
        :search-query="filters.searchQuery.value"
        :status-filter="filters.statusFilter.value"
        :statuses="filters.statuses.value"
        :has-active-filters="filters.hasActiveFilters.value"
        @update:search-query="filters.setSearchQuery"
        @update:status-filter="filters.setStatusFilter"
        @clear-filters="filters.clearFilters"
        @add-product="openAddModal"
      />

      <TableDashboard
        :products="filters.filteredProducts.value"
        :total-products="productStore.products.length"
        @edit="openEditModal"
        @delete="handleDelete"
        @clear-filters="filters.clearFilters"
      />
    </template>

    <ProductModal
      :is-open="isModalOpen"
      :product="editingProduct"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>
