/**
 * Slides Service - Handles all slideshow-related API operations
 */

import { fetcher, buildApiUrl, ApiException } from '../utils/api';

export interface Kit {
  kit_id: number;
  kit_name: string;
  primary_image_url: string;
  category_id: number;
  price?: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Slide {
  id: number;
  title: string;
  image: string;
  cta: string;
  link: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryMap {
  [categoryId: number]: {
    title: string;
    slug: string;
  };
}

/**
 * Transform kit data to slide format with product page links
 * @param kit - Kit data from API
 * @returns Slide object
 */
function transformKitToSlide(kit: Kit): Slide {
  return {
    id: kit.kit_id,
    title: kit.kit_name,
    image: kit.primary_image_url,
    cta: 'Explore Now',
    link: `/product/${kit.kit_id}`,
    created_at: kit.created_at,
    updated_at: kit.updated_at,
  };
}

/**
 * Fetch all active slides for the homepage slideshow
 * @returns Promise<Slide[]>
 */
export async function fetchSlides(): Promise<Slide[]> {
  try {
    const kits = await fetcher<Kit[]>(buildApiUrl('/kits/slideshow'), {
      method: 'GET',
    });

    if (!Array.isArray(kits)) {
      throw new ApiException('Invalid response format from slideshow API.');
    }

    if (kits.length === 0) {
      return [];
    }

    const slides = kits.map(kit => {
      if (!kit.kit_id || !kit.kit_name || !kit.primary_image_url || !kit.category_id) {
        console.warn('Skipping kit with missing required fields:', kit);
        return null;
      }
      return transformKitToSlide(kit);
    }).filter((slide): slide is Slide => slide !== null);

    return slides;

  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to fetch slideshow data. Please try again.');
  }
}

/**
 * Fetch a single slide by ID
 * @param slideId - The slide ID
 * @returns Promise<Slide>
 */
export async function fetchSlideById(slideId: number): Promise<Slide> {
  try {
    const allSlides = await fetchSlides();
    const slide = allSlides.find(s => s.id === slideId);

    if (!slide) {
      throw new ApiException(`Slide with ID ${slideId} not found.`, 404, 'NOT_FOUND');
    }

    return slide;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to fetch slide details. Please try again.');
  }
}