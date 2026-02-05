import { computed, type Ref } from "vue";
import type { Product } from "../types/Product";

export function useProductMetrics(products: Ref<Product[]>) {
  /**
   * Total de produtos que possuem imagem BB
   */
  const productsWithBBImage = computed(
    () =>
      products.value.filter((p) => p.bbImageUrl && p.bbImageUrl.trim() !== "")
        .length,
  );

  /**
   * Total de produtos que possuem imagem Mirakl
   */
  const productsWithMiraklImage = computed(() => {
    const productsWithImage = products.value.filter((p) => {
      return (
        p.miraklImage &&
        p.miraklImage.trim() !== "" &&
        p.miraklImage.trim() !== "N/A"
      );
    });

    return productsWithImage.length;
  });

  /**
   * Total de produtos INDISPONIVEIS
   */
  const unavailableProducts = computed(
    () => products.value.filter((p) => p.status === "INDISPONIVEL").length,
  );

  /**
   * Total de produtos OK
   */
  const okProducts = computed(
    () => products.value.filter((p) => p.status === "OK").length,
  );

  /**
   * Score médio dos produtos (ignorando N/A)
   */
  const averageScore = computed(() => {
    const productsWithScore = products.value.filter((p) => p.score !== null);
    if (productsWithScore.length === 0) return 0;

    const totalScore = productsWithScore.reduce(
      (acc, p) => acc + (p.score || 0),
      0,
    );

    return Math.round((totalScore / productsWithScore.length) * 1000) / 1000;
  });

  /**
   * Total de produtos
   */
  const totalProducts = computed(() => products.value.length);

  /**
   * Produtos com ambas imagens
   */
  const productsWithBothImages = computed(
    () =>
      products.value.filter(
        (p) =>
          p.bbImageUrl &&
          p.bbImageUrl.trim() !== "" &&
          p.miraklImage &&
          p.miraklImage.trim() !== "",
      ).length,
  );

  return {
    productsWithBBImage,
    productsWithMiraklImage,
    unavailableProducts,
    okProducts,
    averageScore,
    totalProducts,
    productsWithBothImages,
  };
}
