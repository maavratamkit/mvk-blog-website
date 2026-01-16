import { useQuery } from '@tanstack/react-query';
import { fetchSlides, fetchSlideById } from '../services/slidesService';
import type { Slide } from '../services/slidesService';

export const useSlides = () => {
  return useQuery<Slide[], Error>({
    queryKey: ['slides'],
    queryFn: fetchSlides,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useSlide = (slideId: number) => {
  return useQuery<Slide, Error>({
    queryKey: ['slides', slideId],
    queryFn: () => fetchSlideById(slideId),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!slideId,
  });
};