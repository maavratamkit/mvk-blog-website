/**
 * Product Service - Handles all product-related API operations
 */

import { fetcher, buildApiUrl, ApiException, fetchAllPages } from '../utils/api';
import { fetchCategoryById, fetchCategoryBySlug } from './categoryService';
import { Product } from '../types/Product';

// Helper to extract kit include strings from various backend shapes.
function extractKitIncludes(raw: any): string[] {
  // raw may be:
  // - an object: { items: ["a","b"] }
  // - a JSON string: '{"items":["a","b"]}'
  // - an array already
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.filter(Boolean).map(String);
  }

  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.filter(Boolean).map(String);
      if (parsed && Array.isArray(parsed.items)) return parsed.items.filter(Boolean).map(String);
      return [];
    } catch (e) {
      // not JSON, treat as single-item string
      return [raw];
    }
  }

  if (typeof raw === 'object') {
    if (Array.isArray(raw.items)) return raw.items.filter(Boolean).map(String);
    // sometimes nested under data or kit_items
    if (Array.isArray(raw.kit_items)) return raw.kit_items.filter(Boolean).map(String);
    return [];
  }

  return [];
}
/**
 * Fetch all products
 * @returns Promise<Product[]>
 */
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    // Mock API response with existing product data
    const mockApiResponse: Product[] = []

    //Simulate API delay without making actual network request
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockApiResponse;

    //  return await fetcher<Product[]>("https://mp527587dbbf3bdf80ea.free.beeceptor.com/api/v1/products",{
    //   method: 'GET',
    // });

  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to fetch products. Please try again.');
  }
}

/**
 * Fetch products by category (optimized data fetching)
 * @param categorySlug - The category slug to filter by
 * @returns Promise<Product[]>
 */
export async function fetchProductsByCategory(categoryParam: string | number): Promise<Product[]> {
  try {
    // Resolve category_id: accept numeric id or slug. If slug provided, look up the category to get its id.
    let categoryId: number | undefined;
    let categorySlug: string | undefined;

    if (typeof categoryParam === 'number') {
      categoryId = categoryParam;
    } else if (/^\d+$/.test(categoryParam)) {
      categoryId = parseInt(categoryParam, 10);
    } else {
      // treat as slug
      const category = await fetchCategoryBySlug(categoryParam);
      categoryId = category?.id;
      categorySlug = category?.slug;
    }

    if (!categoryId || categoryId <= 0) {
      throw new ApiException('Invalid category id provided.', 400, 'INVALID_CATEGORY_ID');
    }

    // Use the paginated helper to fetch all kits for the category
    const { items: pageItems } = await fetchAllPages<any>(`/kits/category/${categoryId}`, {
      limit: 50,
      sort: 'created_at',
      order: 'desc',
    });

    // Map API kit shape to local Product type
    const mapped: Product[] = (pageItems || []).map(item => {
      
      const primary = item.primary_image_url ?? {};
      const getUrl = (img: any) => {
        if (!img) return '';
        if (typeof img === 'string') return img;
        return img.image_url || img.path || img.src || img.image_url || '';
      };

      const primaryImageUrl = getUrl(primary);
      const secondaryUrls: string[] = Array.isArray(item.image_urls)
        ? item.image_urls.map(getUrl).filter(Boolean)
        : [];

      // Ensure primary image is first in the images array if it exists
      const images: string[] = primaryImageUrl
        ? [primaryImageUrl, ...secondaryUrls]
        : secondaryUrls;

      const image = primaryImageUrl || secondaryUrls[0] || '';

      return {
        id: item.kit_id,
        name: item.kit_name || item.name || '',
        description: item.description || '',
        longDescription: item.long_description || item.description || '',
        price: typeof item.price === 'number' ? item.price : Number(item.price) || 0,
        image,
        images,
        category: categorySlug ?? String(item.category_id ?? ''),
        kitIncludes: extractKitIncludes(item.kit_items ?? item.kit_includes ?? item.includes ?? []),
        significance: item.significance || '',
        availability_status: item.availability_status || 'IN_STOCK',
      } as Product;
    });

    return mapped;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to fetch products for category. Please try again.');
  }
}

/**
 * Fetch a single product by ID
 * @param productId - The product ID
 * @returns Promise<Product>
 */
export async function fetchProductById(productId: number): Promise<Product> {
  try {
    if (!productId || productId <= 0) {
      throw new ApiException('Invalid product id provided.', 400, 'INVALID_PRODUCT_ID');
    }

    // Fetch kit from backend
    const kit = await fetcher<any>(buildApiUrl(`/kits/${productId}`));

    if (!kit) {
      throw new ApiException(`Product with ID ${productId} not found.`, 404, 'NOT_FOUND');
    }

    // Map primary/secondary images similar to productService mapping
    const primary = kit.primary_image_url ?? {};
    const getUrl = (img: any) => {
      if (!img) return '';
      if (typeof img === 'string') return img;
      return img.image_url || img.path || img.src || img.image_url || '';
    };

    const primaryImageUrl = getUrl(primary);
    const secondaryUrls: string[] = Array.isArray(kit.image_urls)
      ? kit.image_urls.map(getUrl).filter(Boolean)
      : [];

    // Ensure primary image is first in the images array if it exists
    const images: string[] = primaryImageUrl
      ? [primaryImageUrl, ...secondaryUrls]
      : secondaryUrls;

    const image = primaryImageUrl || secondaryUrls[0] || '';

    // Try to resolve category slug for nicer client-side category strings
    let categorySlug: string | undefined = undefined;
    try {
      if (typeof kit.category_id === 'number') {
        const cat = await fetchCategoryById(kit.category_id);
        categorySlug = cat?.slug;
      }
    } catch (_e) {
      // ignore category resolution failures, fallback to id below
    }

    const product: Product = {
      id: kit.kit_id,
      name: kit.kit_name || kit.name || '',
      description: kit.description || '',
      longDescription: kit.long_description || kit.description || '',
      price: typeof kit.price === 'number' ? kit.price : Number(kit.price) || 0,
      image,
      images,
      category: categorySlug ?? String(kit.category_id ?? ''),
      kitIncludes: extractKitIncludes(kit.kit_items ?? kit.kit_includes ?? kit.includes ?? []),
      significance: kit.significance || '',
      availability_status: kit.availability_status || 'IN_STOCK',
    };

    return product;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to fetch product details. Please try again.');
  }
}

/**
 * Search products by name or description
 * @param query - Search query string
 * @returns Promise<Product[]>
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const allProducts = await fetchAllProducts();
    const searchQuery = query.toLowerCase().trim();
    
    if (!searchQuery) {
      return [];
    }
    
    const filteredProducts = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.longDescription.toLowerCase().includes(searchQuery)
    );
    
    return filteredProducts;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException('Failed to search products. Please try again.');
  }
}