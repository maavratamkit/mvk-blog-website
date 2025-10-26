/**
 * Product Service - Handles all product-related API operations
 */

import { fetcher, buildApiUrl, ApiException } from '../utils/api';
import { Product } from '../types/Product';

/**
 * Fetch all products
 * @returns Promise<Product[]>
 */
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    // Mock API response with existing product data
    const mockApiResponse: Product[] = [
      // Sai Baba Vratam Kits
      {
        id: 1,
        name: "Sai Baba Vratam Kit",
        description: "Complete kit with all essentials for your sacred Sai Baba vratam including incense, flowers, and prayer items",
        longDescription: "This premium Sai Baba Vratam Kit Deluxe is meticulously crafted for devotees seeking an authentic and complete spiritual experience. Each item has been carefully selected and blessed to ensure your vratam is performed with the highest devotion and traditional accuracy. The kit includes everything needed for a 9-day or 11-day vratam, making it perfect for both beginners and experienced practitioners.",
        price: 1299,
        image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646863/pexels-photo-6646863.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/7902828/pexels-photo-7902828.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646939/pexels-photo-6646939.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-sai-baba-vratam-kits",
        kitIncludes: [
          "Sacred Sai Baba Photo (5x7 inches)",
          "Premium Incense Sticks (Sandalwood & Jasmine)",
          "Camphor Tablets (Pure & Aromatic)",
          "Cotton Wicks for Oil Lamp",
          "Sacred Thread (Kalava)",
          "Kumkum & Turmeric Powder",
          "Rice Grains for Offerings",
          "Coconut for Prayers",
          "Detailed Vratam Guide Book",
          "Prayer Beads (108 count)",
          "Sacred Cloth for Altar",
          "Oil Lamp (Brass)"
        ],
        significance: "Sai Baba Vratam is a powerful spiritual practice that brings peace, prosperity, and divine blessings into your life. Observed on Thursdays, this vratam helps devotees connect with Sai Baba's infinite compassion and wisdom. Regular practice of this vratam is believed to remove obstacles, fulfill wishes, and provide spiritual guidance in times of need."
      },
      {
        id: 2,
        name: "Sai Baba Premium Collection",
        description: "Premium quality items blessed for your spiritual journey with authentic materials and traditional setup",
        longDescription: "Our Sai Baba Premium Collection represents the pinnacle of spiritual authenticity and quality. Each item in this collection has been sourced from traditional suppliers and blessed by experienced priests. This collection is perfect for establishing a permanent Sai Baba shrine in your home or for special occasions and festivals.",
        price: 1899,
        image: "https://images.pexels.com/photos/6646863/pexels-photo-6646863.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/6646863/pexels-photo-6646863.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/7902829/pexels-photo-7902829.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-sai-baba-vratam-kits",
        kitIncludes: [
          "Large Sai Baba Statue (8 inches, Marble finish)",
          "Premium Sandalwood Incense (50 sticks)",
          "Silver-plated Oil Lamp",
          "Silk Cloth for Decoration",
          "Crystal Prayer Beads",
          "Pure Ghee for Lamp",
          "Sacred Ash (Vibhuti)",
          "Rose Water for Abhishek",
          "Premium Kumkum & Chandan",
          "Decorative Flowers (Artificial)",
          "Brass Plate for Offerings",
          "Complete Aarti Book with CD"
        ],
        significance: "This premium collection is designed for devotees who wish to create a sacred space that truly honors Sai Baba's divine presence. The high-quality materials and traditional items help create an atmosphere of deep devotion and spiritual connection, making your daily prayers more meaningful and powerful."
      },
      {
        id: 3,
        name: "Sai Baba Basic Vratam Kit",
        description: "Essential items for beginners starting their Sai Baba devotional practices with guided instructions",
        longDescription: "Perfect for those beginning their spiritual journey with Sai Baba, this basic vratam kit contains all the essential items needed to start your devotional practice. The kit comes with easy-to-follow instructions and is designed to make the vratam accessible to everyone, regardless of their previous experience with spiritual practices.",
        price: 899,
        image: "https://images.pexels.com/photos/7902828/pexels-photo-7902828.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/7902828/pexels-photo-7902828.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646863/pexels-photo-6646863.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-sai-baba-vratam-kits",
        kitIncludes: [
          "Sai Baba Photo (4x6 inches)",
          "Basic Incense Sticks (20 count)",
          "Small Oil Lamp",
          "Cotton Wicks",
          "Kumkum & Turmeric",
          "Simple Prayer Beads",
          "Beginner's Guide Book",
          "Sacred Thread",
          "Small Coconut"
        ],
        significance: "Starting your spiritual journey with Sai Baba brings immense peace and guidance. This basic vratam helps newcomers establish a regular prayer routine and experience the transformative power of devotion. It's an excellent way to begin understanding Sai Baba's teachings of love, compassion, and service."
      },
      
      // Swami Samarth Kits
      {
        id: 4,
        name: "Swami Samarth Divine Kit",
        description: "Sacred items for Swami Samarth devotional practices with traditional elements and blessed materials",
        longDescription: "The Swami Samarth Divine Kit is specially curated for devotees of the great saint Swami Samarth of Akkalkot. This comprehensive kit includes traditional items used in Swami Samarth worship, each carefully selected to enhance your spiritual connection with this powerful saint known for his miraculous powers and divine grace.",
        price: 1599,
        image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646939/pexels-photo-6646939.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/7902828/pexels-photo-7902828.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-swami-samarth-kits",
        kitIncludes: [
          "Swami Samarth Photo (6x8 inches)",
          "Sandalwood Paste",
          "Sacred Rudraksha Beads",
          "Dhoop Sticks (Loban fragrance)",
          "Brass Kalash",
          "Yellow Cloth for Offerings",
          "Panchamrit Ingredients",
          "Sacred Water from Akkalkot",
          "Prayer Manual in Marathi & Hindi",
          "Camphor for Aarti"
        ],
        significance: "Swami Samarth worship is known to bring miraculous results and divine protection. Devotees experience relief from troubles, success in endeavors, and spiritual growth. The saint's blessings are particularly powerful for those facing difficulties and seeking divine intervention in their lives."
      },
      {
        id: 5,
        name: "Swami Samarth Pooja Essentials",
        description: "Complete collection for daily worship and special occasions with authentic spiritual items",
        longDescription: "This essential collection provides everything needed for regular Swami Samarth worship. Whether for daily prayers or special occasions, these authentic items help create a sacred atmosphere that invites the saint's divine presence and blessings into your home.",
        price: 1199,
        image: "https://images.pexels.com/photos/6646939/pexels-photo-6646939.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/6646939/pexels-photo-6646939.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/7902829/pexels-photo-7902829.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-swami-samarth-kits",
        kitIncludes: [
          "Swami Samarth Idol (Small)",
          "Incense Holder",
          "Oil for Lamp",
          "Fresh Flower Garland",
          "Prasad Container",
          "Aarti Plate",
          "Sacred Ash",
          "Prayer Book",
          "Offering Bowl"
        ],
        significance: "Regular worship of Swami Samarth brings stability, prosperity, and spiritual advancement. The saint's grace helps devotees overcome obstacles and achieve their righteous goals while maintaining dharmic principles in life."
      },
      {
        id: 6,
        name: "Swami Samarth Blessing Kit",
        description: "Traditional items handpicked for authentic worship experience with detailed prayer guide",
        longDescription: "Handpicked traditional items that have been used for centuries in Swami Samarth worship. This blessing kit ensures authenticity in your spiritual practice and comes with detailed instructions for proper worship procedures.",
        price: 999,
        image: "https://images.pexels.com/photos/7902829/pexels-photo-7902829.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/7902829/pexels-photo-7902829.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-swami-samarth-kits",
        kitIncludes: [
          "Blessed Photo of Swami Samarth",
          "Traditional Dhoop",
          "Sacred Thread",
          "Turmeric Powder",
          "Simple Oil Lamp",
          "Cotton Wicks",
          "Basic Prayer Guide"
        ],
        significance: "This kit provides the foundation for establishing a meaningful connection with Swami Samarth. The saint's blessings help devotees find peace, resolve conflicts, and progress on their spiritual path."
      },
      
      // Dattatreya Vratam
      {
        id: 7,
        name: "Dattatreya Vratam Complete Set",
        description: "Traditional collection for Dattatreya puja and vratam with all necessary spiritual elements",
        longDescription: "A comprehensive set for Dattatreya worship, honoring the trinity of Brahma, Vishnu, and Mahesh in one divine form. This complete set includes everything needed for the traditional Dattatreya vratam, which is particularly powerful when performed on full moon days.",
        price: 1399,
        image: "https://images.pexels.com/photos/6646939/pexels-photo-6646939.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/6646939/pexels-photo-6646939.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/7902828/pexels-photo-7902828.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-dattatreya-vratam",
        kitIncludes: [
          "Dattatreya Yantra (Copper)",
          "Three-faced Dattatreya Photo",
          "Rudraksha Mala (108 beads)",
          "Sacred Bhasma",
          "Bilva Leaves (Dried)",
          "Panchamrit Set",
          "Ghee for Lamp",
          "Dattatreya Chalisa Book",
          "White Flowers",
          "Sacred Water Pot"
        ],
        significance: "Dattatreya vratam is one of the most powerful spiritual practices, as it honors the combined energy of the Hindu trinity. This vratam brings wisdom, removes ignorance, grants spiritual knowledge, and provides protection from negative influences."
      },
      {
        id: 8,
        name: "Dattatreya Divine Essentials",
        description: "Premium quality items for Dattatreya worship with authentic materials and traditional setup",
        longDescription: "Premium essentials for Dattatreya worship, featuring high-quality traditional items that have been blessed and energized. Perfect for serious practitioners seeking to deepen their spiritual connection with Lord Dattatreya.",
        price: 1699,
        image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646939/pexels-photo-6646939.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-dattatreya-vratam",
        kitIncludes: [
          "Large Dattatreya Statue",
          "Silver Kalash",
          "Premium Sandalwood",
          "Crystal Rudraksha",
          "Silk Cloth Set",
          "Brass Aarti Plate",
          "Sacred Mantras Book",
          "Meditation Cushion"
        ],
        significance: "Dattatreya worship with premium materials enhances the spiritual vibrations and creates a powerful sacred space. The divine energy helps practitioners achieve higher states of consciousness and spiritual realization."
      },
      
      // Ganesha Kits
      {
        id: 9,
        name: "Ganesha Festival Kit",
        description: "Auspicious items for Ganesha worship and festivals with traditional decorative elements",
        longDescription: "Celebrate Ganesha festivals with this comprehensive kit that includes everything needed for traditional Ganesha worship. Perfect for Ganesh Chaturthi and other auspicious occasions, this kit helps create a festive and devotional atmosphere.",
        price: 1099,
        image: "https://images.pexels.com/photos/7902828/pexels-photo-7902828.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/7902828/pexels-photo-7902828.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646863/pexels-photo-6646863.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-ganesha-kits",
        kitIncludes: [
          "Ganesha Idol (Eco-friendly)",
          "Modak Molds",
          "Decorative Flowers",
          "Rangoli Colors",
          "Festival Lights",
          "Aarti Thali",
          "Sweets for Offering",
          "Celebration Guide"
        ],
        significance: "Ganesha worship removes obstacles and brings success in new ventures. Festival celebrations with proper rituals invite Lord Ganesha's blessings for prosperity, wisdom, and good fortune in all endeavors."
      },
      {
        id: 10,
        name: "Ganesha Pooja Collection",
        description: "Complete set for Ganesha worship with blessed items and detailed ritual instructions",
        longDescription: "A complete collection for regular Ganesha worship, designed to help devotees establish a meaningful daily practice. Each item has been carefully selected to honor Lord Ganesha in the traditional manner.",
        price: 799,
        image: "https://images.pexels.com/photos/6646863/pexels-photo-6646863.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/6646863/pexels-photo-6646863.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/7902828/pexels-photo-7902828.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-ganesha-kits",
        kitIncludes: [
          "Small Ganesha Statue",
          "Red Cloth",
          "Durva Grass",
          "Coconut",
          "Jaggery",
          "Incense Sticks",
          "Oil Lamp",
          "Prayer Book"
        ],
        significance: "Daily Ganesha worship brings wisdom, removes obstacles from daily life, and ensures smooth progress in all activities. Lord Ganesha's blessings are essential before starting any new work or venture."
      },
      
      // Krishna Vratam
      {
        id: 11,
        name: "Krishna Bhakti Kit",
        description: "Divine essentials for Krishna bhakti and vratam with traditional worship items",
        longDescription: "Immerse yourself in Krishna bhakti with this divine collection of worship essentials. Perfect for Janmashtami, Ekadashi, and daily Krishna worship, this kit helps devotees connect with the divine love and joy of Lord Krishna.",
        price: 1249,
        image: "https://images.pexels.com/photos/6646863/pexels-photo-6646863.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/6646863/pexels-photo-6646863.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/7902828/pexels-photo-7902828.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-krishna-vratam",
        kitIncludes: [
          "Krishna Idol with Flute",
          "Peacock Feather",
          "Tulsi Leaves",
          "Yellow Cloth",
          "Butter Pot (Makhan)",
          "Conch Shell",
          "Bhagavad Gita (Pocket Size)",
          "Krishna Mantras CD"
        ],
        significance: "Krishna bhakti fills life with divine love, joy, and spiritual bliss. Regular worship helps devotees develop unconditional love, surrender ego, and experience the divine play (leela) of the Supreme Lord in their daily lives."
      },
      {
        id: 12,
        name: "Krishna Janmashtami Special",
        description: "Special collection for Krishna Janmashtami celebrations with festive decorations",
        longDescription: "Celebrate the birth of Lord Krishna with this special Janmashtami collection. This kit includes everything needed to create a beautiful Krishna temple at home and celebrate the festival with traditional fervor and devotion.",
        price: 1549,
        image: "https://images.pexels.com/photos/7902828/pexels-photo-7902828.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/7902828/pexels-photo-7902828.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646863/pexels-photo-6646863.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-krishna-vratam",
        kitIncludes: [
          "Baby Krishna Idol",
          "Decorative Cradle",
          "Festival Lights",
          "Flower Garlands",
          "Sweets for Offering",
          "Janmashtami Songs CD",
          "Celebration Decorations",
          "Fast Guidelines Book"
        ],
        significance: "Janmashtami celebration brings immense joy and divine blessings. The festival commemorates the birth of Lord Krishna and helps devotees connect with the divine child's innocence, love, and spiritual teachings."
      },
      
      // Hanuman Kits
      {
        id: 13,
        name: "Hanuman Protection Kit",
        description: "Powerful collection for Hanuman worship and protection with blessed spiritual items",
        longDescription: "Seek Lord Hanuman's powerful protection with this specially curated kit. Known for his strength, courage, and unwavering devotion, Hanuman's blessings provide protection from negative energies and grant strength to overcome life's challenges.",
        price: 999,
        image: "https://images.pexels.com/photos/7902829/pexels-photo-7902829.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/7902829/pexels-photo-7902829.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-hanuman-kits",
        kitIncludes: [
          "Hanuman Photo (Large)",
          "Red Cloth",
          "Sindoor (Vermillion)",
          "Coconut Oil",
          "Hanuman Chalisa Book",
          "Red Flowers",
          "Protection Amulet",
          "Strength Prayer Beads"
        ],
        significance: "Hanuman worship provides divine protection, physical strength, and mental courage. Devotees experience relief from fears, protection from enemies, and the strength to face any challenge with confidence and devotion."
      },
      {
        id: 14,
        name: "Hanuman Strength Kit",
        description: "Traditional items for Hanuman worship to gain strength and courage in spiritual journey",
        longDescription: "Gain physical, mental, and spiritual strength through Hanuman worship with this traditional kit. Perfect for those seeking courage, determination, and the power to overcome obstacles in their spiritual and material journey.",
        price: 1149,
        image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: [
          "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/7902829/pexels-photo-7902829.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        category: "shree-hanuman-kits",
        kitIncludes: [
          "Hanuman Statue (Brass)",
          "Mace (Gada) Symbol",
          "Orange Marigold Garland",
          "Sesame Oil",
          "Bajrang Baan Text",
          "Tuesday Fast Guide",
          "Strength Mantras Book",
          "Sacred Ash"
        ],
        significance: "Hanuman's strength and devotion inspire devotees to develop unwavering faith and determination. Regular worship helps build physical vitality, mental resilience, and spiritual strength to serve others and progress on the path of righteousness."
      }
    ];

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
export async function fetchProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    // In production, this would make a direct API call with category filter
    // For now, we'll fetch all products and filter client-side
    const allProducts = await fetchAllProducts();
    //console.log(`product Category = ${product.category} category Slug = ${categorySlug}`);
    const filteredProducts = allProducts.filter(product => product.category === categorySlug);
    
    return filteredProducts;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException(`Failed to fetch products for category "${categorySlug}". Please try again.`);
  }
}

/**
 * Fetch a single product by ID
 * @param productId - The product ID
 * @returns Promise<Product>
 */
export async function fetchProductById(productId: number): Promise<Product> {
  try {
    // In production, this would make a direct API call for the specific product
    const allProducts = await fetchAllProducts();
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) {
      throw new ApiException(`Product with ID ${productId} not found.`, 404, 'NOT_FOUND');
    }
    
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