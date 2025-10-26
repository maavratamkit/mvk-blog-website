import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials, fetchTestimonialById } from '../services/testimonialService';
import type { Testimonial } from '../services/testimonialService';

export const useTestimonials = () => {
  return useQuery<Testimonial[], Error>({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
    staleTime: 15 * 60 * 1000, // 15 minutes - testimonials don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useTestimonial = (testimonialId: number) => {
  return useQuery<Testimonial, Error>({
    queryKey: ['testimonials', testimonialId],
    queryFn: () => fetchTestimonialById(testimonialId),
    staleTime: 20 * 60 * 1000, // 20 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!testimonialId, // Only run query if testimonialId is provided
  });
};