export interface Product {
  id: string;
  ean: string;
  name: string;
  status: string;
  score: number | null;
  miraklImage: string;
  bbImageUrl: string;
}

export type ProductFormData = Omit<Product, "id"> & { id?: string };
