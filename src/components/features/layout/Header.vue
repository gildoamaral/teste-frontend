<script setup lang="ts">

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

function triggerFileUpload() {
  fileInput.value?.click();
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

        <!-- Desktop -->
        <div class="flex items-center justify-between h-16">

          <div class="flex items-center gap-3">
            <Package class="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span class="text-xl font-bold">Gerenciador de Produtos</span>
          </div>

          <nav class="hidden md:flex items-center gap-1">
            <NavbarLink
              to="/"
              label="Dashboard"
              :icon="LayoutDashboard"
              routeName="dashboard"
            />
            <NavbarLink
              to="/gallery"
              label="Galeria"
              :icon="Images"
              routeName="gallery"
            />
          </nav>

          <div class="flex items-center gap-2">
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
              :disabled="isLoading"
            >
              <Upload :size="18" />
              <span class="hidden sm:inline">Importar</span>
            </button>

            <button
              @click="handleExport"
              class="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
              :disabled="productStore.products.length === 0 || isLoading"
            >
              <Download :size="18" />
              <span class="hidden sm:inline">Exportar</span>
            </button>

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

        <!-- Mobile -->
        <nav class="md:hidden flex items-center gap-1 pb-3">
          <NavbarLink
            to="/"
            label="Dashboard"
            :icon="LayoutDashboard"
            routeName="dashboard"
          />
          <NavbarLink
            to="/gallery"
            label="Galeria"
            :icon="Images"
            routeName="gallery"
          />
        </nav>
        
      </div>
    </header>
</template>