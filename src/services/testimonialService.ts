/**
 * Testimonial Service - Handles all testimonial-related API operations
 */

import { fetcher, buildApiUrl, ApiException } from '../utils/api';

export interface Testimonial {
  testimonial_id: number;
  customer_name: string;
  customer_location: string;
  testimonial: string;
  customer_img_url: string;
  created_at: string;
}

interface ApiResponse {
  data: Testimonial[];
}

/**
 * Fetch all active testimonials
 * @returns Promise<Testimonial[]>
 */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetcher<ApiResponse>(buildApiUrl('/testimonials'), {
      method: 'GET',
    });

    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to fetch testimonials. Please try again.');
  }
}

/**
 * Fetch a single testimonial by ID
 * @param testimonialId - The testimonial ID
 * @returns Promise<Testimonial>
 */
export async function fetchTestimonialById(testimonialId: number): Promise<Testimonial> {
  try {
    const response = await fetcher<{ data: Testimonial }>(
      buildApiUrl(`/testimonials/${testimonialId}`),
      {
        method: 'GET',
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to fetch testimonial details. Please try again.');
  }
}