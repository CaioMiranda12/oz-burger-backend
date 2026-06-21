export interface CreateProductDTO {
  name: string;
  price: number;
  description: string;
}

export type UpdateProductDTO = Partial<CreateProductDTO> & {
  available?: boolean;
}