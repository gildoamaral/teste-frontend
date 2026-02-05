<script setup lang="ts">
import { ref, watch } from "vue";
import type { Product, ProductFormData } from "../types/Product";
import { X, Save, ImagePlus, Pencil, ChevronDown, ChevronUp } from "lucide-vue-next";

interface Props {
  product?: Product | null;
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
  save: [data: ProductFormData];
}>();

const formData = ref<ProductFormData>({
  ean: "",
  name: "",
  status: "",
  score: null,
  miraklImage: "",
  bbImageUrl: "",
});

const fileInput = ref<HTMLInputElement | null>(null);
const showUrlInputs = ref(false);

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      formData.value = { ...newProduct };
    } else {
      formData.value = {
        ean: "",
        name: "",
        status: "",
        score: null,
        miraklImage: "",
        bbImageUrl: "",
      };
    }
  },
  { immediate: true },
);

function handleSubmit() {
  emit("save", { ...formData.value });
}

function handleClose() {
  emit("close");
}

function triggerImageUpload() {
  fileInput.value?.click();
}

function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      formData.value.miraklImage = result;
      formData.value.bbImageUrl = result;
    };
    reader.readAsDataURL(file);
  }
}

function toggleUrlInputs() {
  showUrlInputs.value = !showUrlInputs.value;
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" 
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="handleClose"></div>

        <div
          class="relative bg-white overflow-y-auto  dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] ">
          <div
            class="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between z-10">
            <h2 class="text-xl font-bold">
              {{ product ? "Editar Produto" : "Novo Produto" }}
            </h2>
            <button @click="handleClose"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <X :size="20" />
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">

            <!-- image -->
            <div class="flex flex-col items-center gap-4 relative">

              <button type="button" @click="triggerImageUpload"
                class="group absolute -top-2 right-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center p-2 cursor-pointer overflow-hidden"
                title="Adicionar imagem">
                <Pencil :size="16" class="shrink-0" />

                <span
                  class="whitespace-nowrap text-xs font-medium max-w-0 opacity-0 group-hover:max-w-25 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 ease-in-out overflow-hidden">
                  Adicionar
                </span>
              </button>

              <div class="group">
                <div
                  class="w-32 h-32 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  <img v-if="formData.miraklImage || formData.bbImageUrl"
                    :src="formData.miraklImage || formData.bbImageUrl" :alt="formData.name"
                    class="w-full h-full object-cover" @error="formData.miraklImage = ''; formData.bbImageUrl = ''" />
                  <ImagePlus v-else :size="40" class="text-gray-400" />
                </div>

                <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-2">Nome do Produto *</label>
                <input v-model="formData.name" type="text" required
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="Nome do produto" />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">EAN *</label>
                <input v-model="formData.ean" maxlength="13" type="text" required
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="Código EAN" />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Status *</label>
                <select v-model="formData.status" required
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all">
                  <option value="">Selecione...</option>
                  <option value="OK">OK</option>
                  <option value="INDISPONIVEL">INDISPONIVEL</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Score (0-1)</label>
                <input v-model.number="formData.score" type="number" step="0.0001" min="0" max="1"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="0.9945" />
              </div>

            </div>

            <!-- Toggle para URLs de imagem -->
            <div class="md:col-span-2">
              <button type="button" @click="toggleUrlInputs"
                class="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <component :is="showUrlInputs ? ChevronUp : ChevronDown" :size="18" />
                URLs de Imagem (Avançado)
              </button>

              <Transition name="slide">
                <div v-if="showUrlInputs" class="mt-4 space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">URL Imagem Mirakl</label>
                    <input v-model="formData.miraklImage" type="url"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      placeholder="https://media-prod-eu-1.mirakl.net/..." />
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">URL Imagem BB</label>
                    <input v-model="formData.bbImageUrl"
                    type="url"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      placeholder="https://cdnbigbuy.com/images/..." />
                  </div>
                </div>
              </Transition>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button type="button" @click="handleClose"
                class="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancelar
              </button>
              <button type="submit"
                class="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium">
                <Save :size="18" />
                {{ product ? "Salvar Alterações" : "Criar Produto" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>



<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
