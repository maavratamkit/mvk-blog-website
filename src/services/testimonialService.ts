/**
 * Testimonial Service - Handles all testimonial-related API operations
 */

import { fetcher, buildApiUrl, ApiException } from '../utils/api';

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  testimonial: string;
  image: string;
  isActive?: boolean;
  order?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Fetch all active testimonials
 * @returns Promise<Testimonial[]>
 */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    // Mock API response with testimonial data
    const mockApiResponse: Testimonial[] = [
      {
        id: 1,
        name: "Priya Sharma",
        location: "Mumbai, Maharashtra",
        rating: 5,
        testimonial: "The Sai Baba Vratam Kit exceeded my expectations! Every item was of premium quality and arrived beautifully packaged. The detailed instructions made my vratam experience truly divine.",
        image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
        isActive: true,
        order: 1
      },
      {
        id: 2,
        name: "Rajesh Patel",
        location: "Ahmedabad, Gujarat",
        rating: 5,
        testimonial: "Maa Vratam Kit has transformed our family's spiritual practices. The authentic items and thoughtful curation make every puja feel special. Highly recommend to all devotees!",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
        isActive: true,
        order: 2
      },
      {
        id: 3,
        name: "Lakshmi Iyer",
        location: "Chennai, Tamil Nadu",
        rating: 5,
        testimonial: "The Dattatreya Vratam collection is absolutely divine! Fast delivery, secure packaging, and genuine products. This is now my go-to place for all spiritual needs.",
        image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
        isActive: true,
        order: 3
      },
      {
        id: 4,
        name: "Amit Kumar",
        location: "Delhi, NCR",
        rating: 5,
        testimonial: "Outstanding service and quality! The Ganesha Vratam Kit had everything needed for our festival celebrations. The customer support team was also very helpful and responsive.",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
        isActive: true,
        order: 4
      },
      {
        id: 5,
        name: "Sunita Joshi",
        location: "Pune, Maharashtra",
        rating: 5,
        testimonial: "Being busy with work, these ready-made kits are a blessing! Everything is authentic and saves so much time in preparation. My family loves the convenience and quality.",
        image: "https://images.pexels.com/photos/1181262/pexels-photo-1181262.jpeg?auto=compress&cs=tinysrgb&w=150",
        isActive: true,
        order: 5
      },
      {
        id: 6,
        name: "Deepak Gupta",
        location: "Bangalore, Karnataka",
        rating: 5,
        testimonial: "The Krishna Bhakti Kit brought so much joy to our home! My children now actively participate in our daily prayers. The quality and authenticity are unmatched.",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
        isActive: true,
        order: 6
      }
    ];

    // In production, this would make an actual API call
    // return await fetcher<Testimonial[]>(buildApiUrl('/testimonials'), {
    //   method: 'GET',
    // });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockApiResponse;

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
    const allTestimonials = await fetchTestimonials();
    const testimonial = allTestimonials.find(t => t.id === testimonialId);
    
    if (!testimonial) {
      throw new ApiException(`Testimonial with ID ${testimonialId} not found.`, 404, 'NOT_FOUND');
    }
    
    return testimonial;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to fetch testimonial details. Please try again.');
  }
}