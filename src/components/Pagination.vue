<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next';

const props = defineProps<{
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}>();

const emit = defineEmits<{
  'update:currentPage': [page: number];
}>();

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const startItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return (props.currentPage - 1) * props.itemsPerPage + 1;
});

const endItem = computed(() => {
  const end = props.currentPage * props.itemsPerPage;
  return end > props.totalItems ? props.totalItems : end;
});

const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible = 5;
  
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    const start = Math.max(1, props.currentPage - 2);
    const end = Math.min(totalPages.value, start + maxVisible - 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page);
  }
}

function goToFirst() {
  goToPage(1);
}

function goToLast() {
  goToPage(totalPages.value);
}

function goToPrevious() {
  goToPage(props.currentPage - 1);
}

function goToNext() {
  goToPage(props.currentPage + 1);
}
</script>

<template>
  <div 
    v-if="totalItems > 0"
    class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 dark:border-gray-700"
  >
    <div class="text-sm text-gray-500 dark:text-gray-400">
      Exibindo {{ startItem }} - {{ endItem }} de {{ totalItems }} produtos
    </div>

    <div v-if="totalPages > 1" class="flex items-center gap-1">
      <button
        @click="goToFirst"
        :disabled="currentPage === 1"
        class="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Primeira página"
      >
        <ChevronsLeft :size="18" />
      </button>

      <button
        @click="goToPrevious"
        :disabled="currentPage === 1"
        class="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Página anterior"
      >
        <ChevronLeft :size="18" />
      </button>

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'min-w-9 h-9 px-3 rounded-lg text-sm font-medium transition-colors',
          page === currentPage
            ? 'bg-indigo-600 text-white'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="goToNext"
        :disabled="currentPage === totalPages"
        class="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Próxima página"
      >
        <ChevronRight :size="18" />
      </button>

      <button
        @click="goToLast"
        :disabled="currentPage === totalPages"
        class="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Última página"
      >
        <ChevronsRight :size="18" />
      </button>
    </div>
  </div>
</template>
