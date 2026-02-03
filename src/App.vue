<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from './components/features/layout/Header.vue';
import LoadingOverlay from './components/features/layout/LoadingOverlay.vue';
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

    <Header />
    <LoadingOverlay />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <RouterView />
    </main>
  </div>
</template>
