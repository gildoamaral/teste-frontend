<script setup lang="ts">
import { RouterLink } from "vue-router"
import {
  LayoutDashboard,
  Images,
  Sun,
  Moon,
  Upload,
  Download,
  Package,
} from "lucide-vue-next";
import { ref } from "vue";
import { useThemeStore } from "../../stores/theme";
import { useProductStore } from "../../stores/products";

const themeStore = useThemeStore();
const productStore = useProductStore();
const fileInput = ref<HTMLInputElement | null>(null);

function triggerFileUpload() {
  fileInput.value?.click();
}

async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    await productStore.importFromExcel(file);
    target.value = "";
  }
}
</script>

<template>
      <header class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <Package class="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span class="text-xl font-bold">Gerenciador de Produtos</span>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-1">
            <RouterLink
              to="/"
              class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="{
                'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400':
                  $route.name === 'dashboard',
              }"
            >
              <LayoutDashboard :size="20" />
              Dashboard
            </RouterLink>
            <RouterLink
              to="/gallery"
              class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="{
                'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400':
                  $route.name === 'gallery',
              }"
            >
              <Images :size="20" />
              Galeria
            </RouterLink>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <!-- Import -->
            <input
              ref="fileInput"
              type="file"
              accept=".xlsx,.xls"
              class="hidden"
              @change="handleFileUpload"
            />
            <button
              @click="triggerFileUpload"
              class="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
              :disabled="productStore.isLoading"
            >
              <Upload :size="18" />
              <span class="hidden sm:inline">Importar</span>
            </button>

            <!-- Export -->
            <button
              @click="productStore.exportToExcel"
              class="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
              :disabled="productStore.products.length === 0"
            >
              <Download :size="18" />
              <span class="hidden sm:inline">Exportar</span>
            </button>

            <!-- Theme Toggle -->
            <button
              @click="themeStore.toggleTheme"
              class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              :title="themeStore.isDark ? 'Modo Claro' : 'Modo Escuro'"
            >
              <Sun
                v-if="themeStore.isDark"
                :size="20"
                class="text-yellow-500"
              />
              <Moon v-else :size="20" class="text-gray-600" />
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <nav class="md:hidden flex items-center gap-1 pb-3">
          <RouterLink
            to="/"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="{
              'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400':
                $route.name === 'dashboard',
            }"
          >
            <LayoutDashboard :size="20" />
            Dashboard
          </RouterLink>
          <RouterLink
            to="/gallery"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="{
              'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400':
                $route.name === 'gallery',
            }"
          >
            <Images :size="20" />
            Galeria
          </RouterLink>
        </nav>
      </div>
    </header>
</template>