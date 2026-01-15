/**
 * Slides Service - Handles all slideshow-related API operations
 */

import { ApiException, fetchAllPages } from '../utils/api';

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
  isActive?: boolean;
  order?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Fetch all active slides for the homepage slideshow
 * @returns Promise<Slide[]>
 */
export async function fetchSlides(): Promise<Slide[]> {
  try {
    // Use paginated API to fetch slideshow kits
    const { items: pageItems } = await fetchAllPages<any>('/kits/slideshow', {
      limit: 50,
      sort: 'created_at',
      order: 'desc',
    });

    const slides: Slide[] = (pageItems || []).map((item: any, index: number) => {
      const primary = item.primary_image ?? {};
      const getUrl = (img: any) => {
        if (!img) return '';
        if (typeof img === 'string') return img;
        return img.url || img.path || img.src || img.image_url || '';
      };

      const image = getUrl(primary) || '';

      return {
        id: item.kit_id,
        title: item.kit_name || '',
        subtitle: item.description || '',
        image,
        cta: 'Explore Now',
        link: `/product/${item.kit_id}`,
        isActive: Boolean(item.is_on_slideshow),
        order: index + 1,
        created_at: item.created_at,
        updated_at: item.updated_at,
      } as Slide;
    });

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