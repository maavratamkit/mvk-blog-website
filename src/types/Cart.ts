export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  stock: number;
  slug: string;
  max_quantity?: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
