<script setup lang="ts">
import { useRouter } from "vue-router";
import { ArrowLeft, Home } from "lucide-vue-next";

const router = useRouter();
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
    <div class="text-center">
      <!-- 404 Text -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 mb-4">
          404
        </h1>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Página não encontrada
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Desculpe, a página que você está procurando não existe ou foi removida.
        </p>
      </div>

      <!-- Illustration -->
      <div class="mb-12 flex justify-center">
        <div class="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center animate-pulse">
          <svg class="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="router.back()"
          class="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-900 dark:text-white"
        >
          <ArrowLeft :size="20" />
          Voltar
        </button>
        <router-link
          to="/"
          class="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium text-white"
        >
          <Home :size="20" />
          Ir para Dashboard
        </router-link>
      </div>

      <!-- Additional Help -->
      <div class="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Páginas disponíveis:
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center text-sm">
          <router-link to="/" class="text-indigo-600 dark:text-indigo-400 hover:underline">
            Dashboard
          </router-link>
          <router-link to="/gallery" class="text-indigo-600 dark:text-indigo-400 hover:underline">
            Galeria
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
