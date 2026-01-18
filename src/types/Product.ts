export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  kitIncludes: string[];
  significance: string;
  availability_status?: string;
  stock?: number;
  max_quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}