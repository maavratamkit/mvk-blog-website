import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../services/categoryService';
import { Category } from '../types/Category';

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};