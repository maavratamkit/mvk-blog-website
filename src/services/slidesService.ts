/**
 * Slides Service - Handles all slideshow-related API operations
 */

import { fetcher, buildApiUrl, ApiException } from '../utils/api';

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
    // Mock API response with slideshow data
    const mockApiResponse: Slide[] = [
      {
        id: 1,
        title: "New Arrival: Shree Sai Baba Vratam Kit",
        subtitle: "Complete kit with all essentials for your sacred vratam",
        image: "https://i.pinimg.com/736x/2b/a9/86/2ba986468a02d1c4ec3ebec447e60018.jpg",
        cta: "Shop Now",
        link: "/product/1",
        isActive: true,
        order: 1
      },
      {
        id: 2,
        title: "Popular: Shree Swami Samarth Collection",
        subtitle: "Premium quality items blessed for your spiritual journey",
        image: "https://i.pinimg.com/474x/fa/20/e6/fa20e6d764b98789601e7c3b71b8e595.jpg",
        cta: "Explore Collection",
        link: "/category/shree-swami-samarth-kits",
        isActive: true,
        order: 2
      },
      {
        id: 3,
        title: "Divine Dattatreya Vratam Essentials",
        subtitle: "Traditional items handpicked for authentic worship experience",
        image: "https://wallpapers.com/images/hd/lord-dattatreya-scenic-painting-art-4wzyy5nybzfb06he.jpg",
        cta: "View Details",
        link: "/category/shree-dattatreya-vratam",
        isActive: true,
        order: 3
      },
      {
        id: 4,
        title: "Festival Special: Ganesha Celebration Kit",
        subtitle: "Everything you need for auspicious Ganesha worship",
        image: "https://i.pinimg.com/474x/eb/62/44/eb624482fe29be1b3d4bc1c41181d6ba.jpg",
        cta: "Get Started",
        link: "/category/shree-ganesha-kits",
        isActive: true,
        order: 4
      }
    ];

    // In production, this would make an actual API call
    // return await fetcher<Slide[]>(buildApiUrl('/slides'), {
    //   method: 'GET',
    // });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockApiResponse;

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