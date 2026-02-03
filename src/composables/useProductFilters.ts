import { computed, ref, type Ref } from "vue";
import type { Product } from "../types/Product";

export function useProductFilters(products: Ref<Product[]>) {
  const searchQuery = ref("");
  const statusFilter = ref<string>("");

  /**
   * Lista de status únicos dos produtos
   */
  const statuses = computed(() =>
    [...new Set(products.value.map((p) => p.status))].filter(Boolean),
  );

  /**
   * Produtos filtrados com base nos filtros ativos
   */
  const filteredProducts = computed(() => {
    return products.value.filter((p) => {
      const matchesSearch =
        !searchQuery.value ||
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        p.ean.toLowerCase().includes(searchQuery.value.toLowerCase());

      const matchesStatus =
        !statusFilter.value || p.status === statusFilter.value;

      return matchesSearch && matchesStatus;
    });
  });

  /**
   * Define o texto de busca
   */
  function setSearchQuery(query: string) {
    searchQuery.value = query;
  }

  /**
   * Define o filtro de status
   */
  function setStatusFilter(status: string) {
    statusFilter.value = status;
  }

  /**
   * Limpa todos os filtros
   */
  function clearFilters() {
    searchQuery.value = "";
    statusFilter.value = "";
  }

  /**
   * Verifica se há algum filtro ativo
   */
  const hasActiveFilters = computed(() => {
    return searchQuery.value !== "" || statusFilter.value !== "";
  });

  return {
    searchQuery,
    statusFilter,

    statuses,
    filteredProducts,
    hasActiveFilters,

    setSearchQuery,
    setStatusFilter,
    clearFilters,
  };
}
