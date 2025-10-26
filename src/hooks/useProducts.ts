import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductsByCategory, fetchProductById, Product } from '../services/productService';
import { useQueryClient } from '@tanstack/react-query';

export const useAllProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useProductsByCategory = (categorySlug: string) => {
  const queryClient = useQueryClient();
  
  return useQuery<Product[], Error>({
    queryKey: ['products', 'category', categorySlug],
    queryFn: () => fetchProductsByCategory(categorySlug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: !!categorySlug, // Only run query if categorySlug is provided
    onSuccess: (products) => {
      // Pre-populate individual product cache entries
      products.forEach(product => {
        queryClient.setQueryData(['products', product.id], product);
      });
    },
  });
};

export const useProduct = (productId: number) => {
  return useQuery<Product, Error>({
    queryKey: ['products', productId],
    queryFn: () => fetchProductById(productId),
    staleTime: 10 * 60 * 1000, // 10 minutes - individual products don't change often
    gcTime: 20 * 60 * 1000, // 20 minutes
    enabled: !!productId, // Only run query if productId is provided
  });
};