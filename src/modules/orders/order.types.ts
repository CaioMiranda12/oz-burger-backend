export interface CreateOrderItemDTO {
  productId: string;
  quantity: number;
}

export interface CreateOrderDTO {
  items: CreateOrderItemDTO[];
}

export interface CreateOrderData {
  userId: string;
  total: number;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}