<script setup lang="ts">
import { ref, watch } from "vue";
import type { Product, ProductFormData } from "../types/Product";
import { X, Save, ImagePlus } from "lucide-vue-next";

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
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="handleClose"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <!-- Modal -->
        <div
          class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <!-- Header -->
          <div
            class="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between z-10"
          >
            <h2 class="text-xl font-bold">
              {{ product ? "Editar Produto" : "Novo Produto" }}
            </h2>
            <button
              @click="handleClose"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X :size="20" />
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <!-- Image Preview -->
            <div class="flex flex-col items-center gap-4">
              <div
                class="w-32 h-32 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="formData.bbImageUrl"
                  :src="formData.bbImageUrl"
                  :alt="formData.name"
                  class="w-full h-full object-cover"
                  @error="formData.bbImageUrl = ''"
                />
                <ImagePlus v-else :size="40" class="text-gray-400" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nome -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-2"
                  >Nome do Produto *</label
                >
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="Nome do produto"
                />
              </div>

              <!-- EAN -->
              <div>
                <label class="block text-sm font-medium mb-2">EAN *</label>
                <input
                  v-model="formData.ean"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="Código EAN"
                />
              </div>

              <!-- Status -->
              <div>
                <label class="block text-sm font-medium mb-2">Status *</label>
                <select
                  v-model="formData.status"
                  required
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Selecione...</option>
                  <option value="OK">OK</option>
                  <option value="INDISPONI">INDISPONI</option>
                </select>
              </div>

              <!-- Score -->
              <div>
                <label class="block text-sm font-medium mb-2"
                  >Score (0-1)</label
                >
                <input
                  v-model.number="formData.score"
                  type="number"
                  step="0.0001"
                  min="0"
                  max="1"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="0.9945"
                />
              </div>

              <!-- Mirakl Image -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-2"
                  >URL Imagem Mirakl</label
                >
                <input
                  v-model="formData.miraklImage"
                  type="url"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="https://media-prod-eu-1.mirakl.net/..."
                />
              </div>

              <!-- BB Image URL -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-2"
                  >URL Imagem BB *</label
                >
                <input
                  v-model="formData.bbImageUrl"
                  type="url"
                  required
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="https://cdnbigbuy.com/images/..."
                />
              </div>
            </div>

            <!-- Actions -->
            <div
              class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <button
                type="button"
                @click="handleClose"
                class="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium"
              >
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
