<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/products';
import ProductModal from '../components/ProductModal.vue';
import HeaderProductDetails from '../components/features/productDetails/HeaderProductDetails.vue';
import NotFoundProductDetails from '../components/features/productDetails/NotFoundProductDetails.vue';
import ImageProductDetails from '../components/features/productDetails/ImageProductDetails.vue';
import InfoProductDetails from '../components/features/productDetails/InfoProductDetails.vue';
import AvailabilityProductDetails from '../components/features/productDetails/AvailabilityProductDetails.vue';
import type { ProductFormData } from '../types/Product';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const productId = computed(() => route.params.id as string);
const product = computed(() => 
  productStore.products.find(p => p.id === productId.value)
);

const isModalOpen = ref(false);

function goBack() {
  router.back();
}

function openEditModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function handleSave(data: ProductFormData) {
  if (product.value) {
    productStore.updateProduct(product.value.id, data);
  }
  closeModal();
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-6">
    <HeaderProductDetails 
      :has-product="!!product"
      @back="goBack"
      @edit="openEditModal"
    />

    <NotFoundProductDetails v-if="!product" />

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ImageProductDetails :product="product" />

      <div class="space-y-6">
        <InfoProductDetails :product="product" />
        <AvailabilityProductDetails :product="product" />
      </div>
    </div>

    <ProductModal
      :is-open="isModalOpen"
      :product="product"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>
