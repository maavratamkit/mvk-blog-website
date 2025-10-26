export interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
  slug?: string;
  product_count?: number;
  created_at?: string;
  updated_at?: string;
}