import { useQuery } from '@tanstack/react-query';
import { fetchSlides, fetchSlideById } from '../services/slidesService';
import { fetchCategories, buildCategoryMap } from '../services/categoryService';
import type { Slide } from '../services/slidesService';

export const useSlides = () => {
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const categoryMap = categories ? buildCategoryMap(categories) : {};

  const slidesQuery = useQuery<Slide[], Error>({
    queryKey: ['slides', categoryMap],
    queryFn: () => fetchSlides(categoryMap),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!categories && categories.length > 0,
  });

  return {
    data: slidesQuery.data,
    isLoading: categoriesLoading || slidesQuery.isLoading,
    error: categoriesError || slidesQuery.error,
    refetch: slidesQuery.refetch,
  };
};

export const useSlide = (slideId: number) => {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const categoryMap = categories ? buildCategoryMap(categories) : {};

  return useQuery<Slide, Error>({
    queryKey: ['slides', slideId],
    queryFn: () => fetchSlideById(slideId, categoryMap),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!slideId && !!categories,
  });
};