<script setup lang="ts">
import { Search, Filter, X } from 'lucide-vue-next';

defineProps<{
  searchQuery: string;
  statusFilter: string;
  statuses: string[];
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  'update:searchQuery': [value: string];
  'update:statusFilter': [value: string];
  clearFilters: [];
}>();
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
    <div class="flex flex-col gap-3">
      <div class="relative">
        <Search
          :size="20"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          :value="searchQuery"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Buscar produtos..."
          class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-2 flex-1 min-w-37.5">
          <Filter :size="20" class="text-gray-400 shrink-0" />
          <select
            :value="statusFilter"
            @change="emit('update:statusFilter', ($event.target as HTMLSelectElement).value)"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">Todos Status</option>
            <option
              v-for="status in statuses"
              :key="status"
              :value="status"
            >
              {{ status }}
            </option>
          </select>
        </div>

        <button
          v-if="hasActiveFilters"
          @click="emit('clearFilters')"
          class="flex items-center gap-2 px-3 py-2.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <X :size="18" />
          <span class="hidden sm:inline">Limpar</span>
        </button>
      </div>
    </div>
  </div>
</template>
