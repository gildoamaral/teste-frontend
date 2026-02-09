<script setup lang="ts">

import {
  LayoutDashboard,
  Images,
  Sun,
  Moon,
  Upload,
  Download,
  Package,
  Menu,
  X,
} from "lucide-vue-next";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import { useProductStore } from "@/stores/products";
import {
  importProductsFromExcel,
  exportProductsToExcel,
} from "@/services/excelService";
import NavbarLink from "@/components/ui/button/BaseNavbarLink.vue";

const themeStore = useThemeStore();
const productStore = useProductStore();
const fileInput = ref<HTMLInputElement | null>(null);
const isLoading = ref(false);
const isSidebarOpen = ref(false);
const route = useRoute();

watch(() => route.fullPath, () => {
  isSidebarOpen.value = false;
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function triggerFileUpload() {
  fileInput.value?.click();
  isSidebarOpen.value = false;
}

async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    isLoading.value = true;
    try {
      const importedProducts = await importProductsFromExcel(file);
      productStore.setProducts(importedProducts);
    } catch (error) {
      console.error("Erro ao importar Excel:", error);
    } finally {
      isLoading.value = false;
      target.value = "";
    }
  }
}

async function handleExport() {
  isLoading.value = true;
  isSidebarOpen.value = false;
  try {
    await exportProductsToExcel(productStore.products);
  } catch (error) {
    console.error("Erro ao exportar Excel:", error);
  } finally {
    isLoading.value = false;
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
          <div>
            <span class="sm:text-xl text-lg font-bold leading-0">Gerenciador</span>
            <span class="block sm:text-xl text-lg font-bold leading-6">de Produtos</span> 
          </div>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-1">
          <NavbarLink to="/" label="Dashboard" :icon="LayoutDashboard" routeName="dashboard" />
          <NavbarLink to="/gallery" label="Galeria" :icon="Images" routeName="gallery" />
        </nav>

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center gap-2">
          <input ref="fileInput" type="file" accept=".xlsx,.xls" class="hidden" @change="handleFileUpload" />
          <button @click="triggerFileUpload"
            class="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
            :disabled="isLoading">
            <Upload :size="18" />
            Importar
          </button>

          <button @click="handleExport"
            class="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
            :disabled="productStore.products.length === 0 || isLoading">
            <Download :size="18" />
            Exportar
          </button>

          <button @click="themeStore.toggleTheme"
            class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            :title="themeStore.isDark ? 'Modo Claro' : 'Modo Escuro'">
            <Sun v-if="themeStore.isDark" :size="20" class="text-yellow-500" />
            <Moon v-else :size="20" class="text-gray-600" />
          </button>
        </div>

        <!-- Mobile Hamburger -->
        <button @click="toggleSidebar"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Menu :size="24" />
        </button>

      </div>

    </div>
  </header>

  <!-- Mobile Sidebar Overlay -->
  <Teleport to="body">
    <Transition name="sidebar">
      <div v-if="isSidebarOpen" class="fixed inset-0 z-60">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm " @click="toggleSidebar"></div>

        <div
          class="sidebar-panel absolute top-0 right-0 h-full w-72 bg-white overflow-y-auto  dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-2xl flex flex-col">
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-2">
              <Package class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span class="font-bold text-lg">Menu</span>
            </div>
            <button @click="toggleSidebar"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <X :size="20" />
            </button>
          </div>

          <!-- Sidebar Content -->
          <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <p class="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Navegação</p>
            <NavbarLink to="/" label="Dashboard" :icon="LayoutDashboard" routeName="dashboard" />
            <NavbarLink to="/gallery" label="Galeria" :icon="Images" routeName="gallery" />

            <div class="my-4 border-t border-gray-200 dark:border-gray-700"></div>
            <p class="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</p>

            <input ref="fileInput" type="file" accept=".xlsx,.xls" class="hidden" @change="handleFileUpload" />
            <button @click="triggerFileUpload" :disabled="isLoading"
              class="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-left">
              <Upload :size="20" class="text-green-600 dark:text-green-400" />
              Importar Excel
            </button>

            <button @click="handleExport" :disabled="productStore.products.length === 0 || isLoading"
              class="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-left disabled:opacity-50">
              <Download :size="20" class="text-indigo-600 dark:text-indigo-400" />
              Exportar Excel
            </button>
          </nav>

          <!-- Sidebar Footer: Theme Toggle -->
          <div class="px-3 py-4 border-t border-gray-200 dark:border-gray-700">
            <button @click="themeStore.toggleTheme"
              class="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
              <Sun v-if="themeStore.isDark" :size="20" class="text-yellow-500" />
              <Moon v-else :size="20" class="text-gray-600" />
              {{ themeStore.isDark ? 'Modo Claro' : 'Modo Escuro' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-enter-active .sidebar-panel,
.sidebar-leave-active .sidebar-panel {
  transition: transform 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}

.sidebar-enter-from .sidebar-panel,
.sidebar-leave-to .sidebar-panel {
  transform: translateX(100%);
}
</style>