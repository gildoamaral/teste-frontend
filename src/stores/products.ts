import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product, ProductFormData } from "../types/Product";

export const useProductStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const isLoading = ref(false);

  /**
   * Adiciona um novo produto
   */
  function addProduct(productData: ProductFormData) {
    const newId = productData.id || `J${Date.now().toString().slice(0, -6)}`;

    const newProduct: Product = {
      ...productData,
      id: newId,
    };

    products.value.push(newProduct);
  }

  /**
   * Atualiza um produto existente
   */
  function updateProduct(id: string, productData: Partial<Product>) {
    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      const existingProduct = products.value[index];
      if (existingProduct) {
        products.value[index] = {
          ...existingProduct,
          ...productData,
          id: existingProduct.id,
        } as Product;
      }
    }
  }

  /**
   * Remove um produto
   */
  function deleteProduct(id: string) {
    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.value.splice(index, 1);
    }
  }

  /**
   * Busca um produto por ID
   */
  function getProductById(id: string): Product | undefined {
    return products.value.find((p) => p.id === id);
  }

  /**
   * Substitui toda a lista de produtos
   */
  function setProducts(newProducts: Product[]) {
    products.value = newProducts;
  }

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    setProducts,
  };
}, {
  persist: true,
});
