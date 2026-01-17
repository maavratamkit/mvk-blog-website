/**
 * Category Service - Handles all category-related API operations
 */

import { fetcher, buildApiUrl, ApiException } from '../utils/api';

import { Category } from '../types/Category';

/**
 * Fetch all product categories
 * @returns Promise<Category[]>
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    // In a real implementation, this would call the actual API
    // For now, we'll simulate the API response with our existing data structure
    const mockApiResponse: Category[] = [
      {
        id: 1,
        title: "Shree Sai Baba Vratam Kits",
        description: "Complete spiritual essentials for Sai Baba worship and vratam",
        image: "https://i.pinimg.com/736x/2b/a9/86/2ba986468a02d1c4ec3ebec447e60018.jpg",
        slug: "shree-sai-baba-vratam-kits",
        product_count: 3
      },
      {
        id: 2,
        title: "Shree Swami Samarth Kits",
        description: "Sacred items for Swami Samarth devotional practices",
        image: "https://i.pinimg.com/736x/47/bc/c1/47bcc15985feb7ee051aa66dd790b40e.jpg",
        slug: "shree-swami-samarth-kits",
        product_count: 3
      },
      {
        id: 3,
        title: "Shree Dattatreya Vratam",
        description: "Traditional collection for Dattatreya puja and vratam",
        image: "https://i.pinimg.com/736x/a6/cb/bc/a6cbbcbab2530e05e90f9c3108fb7cca.jpg",
        slug: "shree-dattatreya-vratam",
        product_count: 2
      },
      {
        id: 4,
        title: "Shree Ganesha Kits",
        description: "Auspicious items for Ganesha worship and festivals",
        image: "https://i.pinimg.com/474x/eb/62/44/eb624482fe29be1b3d4bc1c41181d6ba.jpg",
        slug: "shree-ganesha-kits",
        product_count: 2
      },
      {
        id: 5,
        title: "Shree Krishna Vratam",
        description: "Divine essentials for Krishna bhakti and vratam",
        image: "https://i.pinimg.com/236x/54/54/fa/5454fad23c2d693003f8601ca83ca018.jpg",
        slug: "shree-krishna-vratam",
        product_count: 2
      },
      {
        id: 6,
        title: "Shree Hanuman Kits",
        description: "Powerful collection for Hanuman worship and protection",
        image: "https://t4.ftcdn.net/jpg/08/06/64/31/360_F_806643198_bYkGQLBf3BS7KGY4cr0WEt9CTN1qS0WQ.jpg",
        slug: "shree-hanuman-kits",
        product_count: 2
      }
    ];

    // Simulate API delay without making actual network request

    // return await fetcher<Category[]>(buildApiUrl(`/categories`),{
    //   method: 'GET',
    // });

    //  return await fetcher<Category[]>("https://mp646e60400414ac4c0f.free.beeceptor.com/api/v1/categories",{
    //   method: 'GET',
    // });
    
    
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockApiResponse;

  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to fetch categories. Please try again.');
  }
}

/**
 * Fetch a single category by ID
 * @param categoryId - The category ID
 * @returns Promise<Category>
 */
export async function fetchCategoryById(categoryId: number): Promise<Category> {
  try {
    const categories = await fetchCategories();
    const category = categories.find(cat => cat.id === categoryId);
    
    if (!category) {
      throw new ApiException(`Category with ID ${categoryId} not found.`, 404, 'NOT_FOUND');
    }
    
    return category;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to fetch category details. Please try again.');
  }
}

/**
 * Fetch category by slug
 * @param slug - The category slug
 * @returns Promise<Category>
 */
export async function fetchCategoryBySlug(slug: string): Promise<Category> {
  try {
    const categories = await fetchCategories();
    const category = categories.find(cat => cat.slug === slug);

    if (!category) {
      throw new ApiException(`Category with slug "${slug}" not found.`, 404, 'NOT_FOUND');
    }

    return category;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to fetch category details. Please try again.');
  }
}

/**
 * Build a category map from categories array
 * Maps category ID to category name and slug for quick lookup
 * @param categories - Array of categories
 * @returns CategoryMap object
 */
export function buildCategoryMap(categories: Category[]): Record<number, { title: string; slug: string }> {
  return categories.reduce((map, category) => {
    map[category.id] = {
      title: category.title,
      slug: category.slug || '',
    };
    return map;
  }, {} as Record<number, { title: string; slug: string }>);
}