<script setup lang="ts">
import { ArrowLeft, Edit } from 'lucide-vue-next';

defineProps<{
  hasProduct: boolean;
}>();

const emit = defineEmits<{
  back: [];
  edit: [];
}>();
</script>

<template>
  <div class="flex items-center justify-between">
    <button
      @click="emit('back')"
      class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <ArrowLeft :size="20" />
      Voltar
    </button>

    <button
      v-if="hasProduct"
      @click="emit('edit')"
      class="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
    >
      <Edit :size="20" />
      Editar Produto
    </button>
  </div>
</template>
