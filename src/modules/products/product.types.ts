export interface CreateProductDTO {
  name: string;
  price: number;
  description: string;
  categoryId: string;
}

export type UpdateProductDTO = Partial<CreateProductDTO> & {
  available?: boolean;
}