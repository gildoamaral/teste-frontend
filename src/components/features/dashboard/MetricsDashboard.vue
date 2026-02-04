<script setup lang="ts">
import { Image, XCircle, CheckCircle } from 'lucide-vue-next';
import MetricCard from '@/components/MetricCard.vue';

defineProps<{
  productsWithBBImage: number;
  productsWithMiraklImage: number;
  unavailableProducts: number;
  okProducts: number;
}>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <MetricCard
      title="Produtos com BB Image"
      :value="productsWithBBImage"
      :icon="Image"
      color="blue"
    />
    <MetricCard
      title="Produtos com Mirakl Image"
      :value="productsWithMiraklImage"
      :icon="Image"
      color="indigo"
    />
    <MetricCard
      title="Indisponíveis"
      :value="unavailableProducts"
      :icon="XCircle"
      color="red"
    />
    <MetricCard
      title="Produtos OK"
      :value="okProducts"
      :icon="CheckCircle"
      color="green"
    />
  </div>
</template>
