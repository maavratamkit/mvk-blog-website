/**
 * Category Service - Handles all category-related API operations
 */

import { ApiException, fetchAllPages } from '../utils/api';
import { slugify } from '../utils/slugify';

import { Category } from '../types/Category';

// NOTE: API base URL is centralized in `src/utils/api.ts` (Vite env var: VITE_API_BASE_URL).

/**
 * Fetch all product categories
 * @returns Promise<Category[]>
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    // Use helper to fetch all paginated pages from the backend
    const { items: pageItems } = await fetchAllPages<any>('/categories', {
      limit: 50,
      sort: 'created_at',
      order: 'desc',
    });

    // Map API items to local Category shape
    const allCategories: Category[] = pageItems.map(item => ({
      id: item.category_id,
      title: item.title,
      description: item.description,
      image: item.image_url,
      slug: item.title ? slugify(item.title) : undefined,
      created_at: item.created_at,
      updated_at: item.updated_at,
    } as Category));

    return allCategories;

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