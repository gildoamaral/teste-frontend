<script setup lang="ts">
import { X } from 'lucide-vue-next';

interface Props {
  imageUrl: string;
  alt?: string;
  isOpen: boolean;
}

defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

function handleClose() {
  emit('close');
}
</script>

<template>
  <Teleport to="body">
    <Transition name="zoom-modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-100 flex items-center justify-center p-4"
        @click="handleClose"
      >
        <div class="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>

        <div class="relative max-w-7xl max-h-[95vh] w-full h-full flex items-center justify-center">
          <button
            @click="handleClose"
            class="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-10"
            title="Fechar"
          >
            <X :size="24" />
          </button>

          <div
            class="relative max-w-full max-h-full flex items-center justify-center"
            @click.stop
          >
            <img
              :src="imageUrl"
              :alt="alt || 'Imagem ampliada'"
              class="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
            
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.zoom-modal-enter-active,
.zoom-modal-leave-active {
  transition: all 0.3s ease;
}

.zoom-modal-enter-from,
.zoom-modal-leave-to {
  opacity: 0;
}

.zoom-modal-enter-from img,
.zoom-modal-leave-to img {
  transform: scale(0.8);
}

.zoom-modal-enter-active img,
.zoom-modal-leave-active img {
  transition: transform 0.3s ease;
}
</style>
