<script setup lang="ts">
import { ref } from 'vue';
import { Image as ImageIcon, CheckCircle, ZoomIn } from 'lucide-vue-next';
import type { Product } from '@/types/Product';
import ImageZoomModal from '@/components/ImageZoomModal.vue';

defineProps<{
  product: Product;
}>();

const isImageZoomOpen = ref(false);
const zoomImageUrl = ref("");

function openImageZoom(imageUrl: string) {
  if (imageUrl) {
    zoomImageUrl.value = imageUrl;
    isImageZoomOpen.value = true;
  }
}

function closeImageZoom() {
  isImageZoomOpen.value = false;
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl p-6">
    <div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden relative group"
      :class="product.bbImageUrl ? 'cursor-pointer transition-all' : ''"
      @click="product.bbImageUrl && openImageZoom(product.bbImageUrl)">
      <img v-if="product.bbImageUrl" :src="product.bbImageUrl" :alt="product.name" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full flex flex-col items-center justify-center text-gray-400">
        <ImageIcon :size="64" />
        <span class="mt-2">Sem imagem</span>
      </div>

      <div class="absolute top-4 right-4">
        <span :class="product.status !== 'OK'
            ? 'bg-red-500 shadow-lg'
            : ''
          " class="px-3 py-1.5 rounded-full text-sm font-medium text-white">
          {{ product.status !== 'OK' ? 'INDISPONÍVEL' : '' }}
        </span>
      </div>

      <div class="block absolute bottom-4 left-4">
        <h1 class="text-gray-500 group-hover:text-gray-800 group-hover:scale-130 transition-all">
          <ZoomIn :size="50" />
        </h1>
      </div>
    </div>

    <div class="mt-6 space-y-3">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <CheckCircle :size="18" :class="product.bbImageUrl ? 'text-green-600' : 'text-gray-400'" />
          <span class="text-sm font-medium">Imagem BB</span>
        </div>
        <div v-if="product.bbImageUrl"
          class="text-xs text-gray-600 dark:text-gray-400 break-all bg-gray-50 dark:bg-gray-900 p-2 rounded">
          {{ product.bbImageUrl.startsWith("data:image") ? "Imagem em Base64" : product.bbImageUrl }}
        </div>
        <div v-else class="text-xs text-gray-400">Não disponível</div>
      </div>

      <div>
        <div class="flex items-center gap-2 mb-2">
          <CheckCircle :size="18" :class="product.miraklImage ? 'text-blue-600' : 'text-gray-400'" />
          <span class="text-sm font-medium">Imagem Mirakl</span>
        </div>
        <div v-if="product.miraklImage"
          class="text-xs text-gray-600 dark:text-gray-400 break-all bg-gray-50 dark:bg-gray-900 p-2 rounded">
          {{ product.miraklImage.startsWith("data:image") ? "Imagem em Base64" : product.miraklImage }}
        </div>
        <div v-else class="text-xs text-gray-400">Não disponível</div>
      </div>
    </div>
  </div>

  <ImageZoomModal :is-open="isImageZoomOpen" :image-url="zoomImageUrl" :alt="product.name" @close="closeImageZoom" />
</template>
