<script setup lang="ts">
import { computed } from 'vue';
import { Image, XCircle, CheckCircle } from 'lucide-vue-next';
import MetricCard from '@/components/MetricCard.vue';

const props = defineProps<{
  productsWithBBImage: number;
  productsWithMiraklImage: number;
  unavailableProducts: number;
  okProducts: number;
}>();

// Criamos uma lista computada que organiza os dados para o template
const metrics = computed(() => [
  { title: 'BB Img', value: props.productsWithBBImage, icon: Image, color: 'blue' },
  { title: 'Mirakl Img', value: props.productsWithMiraklImage, icon: Image, color: 'indigo' },
  { title: 'Indisponíveis', value: props.unavailableProducts, icon: XCircle, color: 'red' },
  { title: 'Disponíveis', value: props.okProducts, icon: CheckCircle, color: 'green' },
] as const);
</script>

<template>
  <div class="grid grid-cols-4 gap-1 md:gap-4">
    <MetricCard
      v-for="metric in metrics"
      :key="metric.title"
      v-bind="metric"
    />
  </div>
</template>