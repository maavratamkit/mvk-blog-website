import { useQuery } from '@tanstack/react-query';
import { fetchSlides, fetchSlideById } from '../services/slidesService';
import type { Slide } from '../services/slidesService';

export const useSlides = () => {
  return useQuery<Slide[], Error>({
    queryKey: ['slides'],
    queryFn: fetchSlides,
    staleTime: 10 * 60 * 1000, // 10 minutes - slides don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useSlide = (slideId: number) => {
  return useQuery<Slide, Error>({
    queryKey: ['slides', slideId],
    queryFn: () => fetchSlideById(slideId),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!slideId, // Only run query if slideId is provided
  });
};