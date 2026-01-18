import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductsByCategory, fetchProductById, Product } from '../services/productService';
import { useQueryClient } from '@tanstack/react-query';

export const useAllProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnMount: 'always', // Always fetch fresh data when component mounts
  });
};

export const useProductsByCategory = (categorySlug: string) => {
  const queryClient = useQueryClient();

  return useQuery<Product[], Error>({
    queryKey: ['products', 'category', categorySlug],
    queryFn: () => fetchProductsByCategory(categorySlug),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: !!categorySlug, // Only run query if categorySlug is provided
    refetchOnMount: 'always', // Always fetch fresh data when component mounts
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
    staleTime: 2 * 60 * 1000, // 2 minutes - ensure fresh availability status
    gcTime: 20 * 60 * 1000, // 20 minutes
    enabled: !!productId, // Only run query if productId is provided
    refetchOnMount: 'always', // Always fetch fresh data when component mounts
  });
};