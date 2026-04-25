/**
 * Products API endpoint definitions
 */
import { apiClient } from './client';

// ============================================
// Types
// ============================================

export interface ProductResponse {
  id: string | null;
  name: string;
  category: string | null;
  description: string | null;
  price: number;
  originalPrice: number | null;
  discountPercent: number | null;
  platform: string;
  platformProductId: string | null;
  rating: number | null;
  reviews: number | null;
  image: string | null;
  url: string | null;
  availability: string;
  shippingCost: number | null;
  deliveryDays: number | null;
  brand: string | null;
  features: string[];
  matchType: string | null;
  rank: number | null;
  reason: string | null;
  alternativeListings: AlternativeListing[] | null;
}

export interface AlternativeListing {
  platform: string;
  price: number;
  url?: string;
}

export interface SearchMetadata {
  sessionId: string;
  extractedProduct: string | null;
  extractedCategory: string | null;
  extractedBrand: string | null;
  extractedFeatures: string[];
  priceRange: { min: number; max: number } | null;
  intent: string | null;
  processingErrors: string[];
}

export interface SearchResponse {
  query: string;
  metadata: SearchMetadata;
  recommendations: ProductResponse[];
  allResults: ProductResponse[];
  totalResults: number;
}

export interface SearchRequest {
  query: string;
  platforms?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface PlatformPrice {
  platform: string;
  price: number;
  url: string | null;
}

export interface PriceComparisonResponse {
  productName: string;
  prices: PlatformPrice[];
  lowestPrice: number;
  highestPrice: number;
  priceDifference: number;
}

// Smart comparison types
export interface PlatformComparison {
  platform: string;
  platformKey: string | null;
  productUrl: string;
  platformProductId: string | null;
  price: number;
  originalPrice: number | null;
  discountPercent: number | null;
  currency: string;
  rating: number | null;
  reviewCount: number | null;
  availability: string | null;
  seller: string | null;
  shippingInfo: string | null;
  deliveryEstimate: string | null;
  priceScore: number;
  ratingScore: number;
  valueScore: number;
  brandTrustScore: number;
  comparisonRank: number;
  isBestDeal: boolean;
}

export interface SmartComparisonResponse {
  productName: string;
  query: string;
  comparisons: PlatformComparison[];
  bestDeal: PlatformComparison | null;
  priceRange: { min: number; max: number };
  images: string[];
  recommendation: string;
  totalPlatforms: number;
}

export interface SupportedPlatform {
  id: string;
  name: string;
  baseUrl: string;
  trustScore: number;
  currency: string;
  categories: string[];
}

export interface PlatformsResponse {
  platforms: SupportedPlatform[];
}

export interface ForYouResponse {
  source: 'other_users' | 'trending';
  category: string | null;
  label: string;
  recommendations: ProductResponse[];
}

// ============================================
// API Functions
// ============================================

export const productsApi = {
  /**
   * Search for products using natural language query
   */
  search: (request: SearchRequest): Promise<SearchResponse> => {
    return apiClient.post<SearchResponse>('/consumer/search', request);
  },

  /**
   * Search for products (GET version)
   */
  searchGet: (query: string): Promise<SearchResponse> => {
    return apiClient.get<SearchResponse>(`/consumer/search?q=${encodeURIComponent(query)}`);
  },

  /**
   * Get trending/popular recommendations
   */
  getRecommendations: (category?: string, limit: number = 10): Promise<ProductResponse[]> => {
    const params = new URLSearchParams();
    if (category && category !== 'All') {
      params.append('category', category);
    }
    params.append('limit', limit.toString());
    return apiClient.get<ProductResponse[]>(`/consumer/recommendations?${params.toString()}`);
  },

  /**
   * Get personalized "For You" recommendations based on other users' searches
   */
  getForYouRecommendations: (limit: number = 12, includeOwn: boolean = false): Promise<ForYouResponse> => {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    if (includeOwn) {
      params.append('include_own', 'true');
    }
    return apiClient.get<ForYouResponse>(`/consumer/recommendations/for-you?${params.toString()}`);
  },

  /**
   * Get available categories
   */
  getCategories: (): Promise<CategoriesResponse> => {
    return apiClient.get<CategoriesResponse>('/consumer/categories');
  },

  /**
   * Compare prices for a product across platforms
   */
  comparePrices: (query: string): Promise<PriceComparisonResponse> => {
    return apiClient.get<PriceComparisonResponse>(`/consumer/compare?query=${encodeURIComponent(query)}`);
  },

  /**
   * Smart compare products across multiple platforms with LLM-powered extraction
   */
  smartCompare: (query: string, platforms?: string[]): Promise<SmartComparisonResponse> => {
    const params = new URLSearchParams();
    params.append('query', query);
    if (platforms && platforms.length > 0) {
      params.append('platforms', platforms.join(','));
    }
    return apiClient.get<SmartComparisonResponse>(`/consumer/search/compare?${params.toString()}`);
  },

  /**
   * Get list of supported platforms
   */
  getPlatforms: (): Promise<PlatformsResponse> => {
    return apiClient.get<PlatformsResponse>('/consumer/platforms');
  },

  /**
   * Scrape a single product URL
   */
  scrapeUrl: (url: string, platform?: string): Promise<{ success: boolean; data: ProductResponse; platform: string }> => {
    const params = new URLSearchParams();
    params.append('url', url);
    if (platform) {
      params.append('platform', platform);
    }
    return apiClient.get(`/consumer/scrape/url?${params.toString()}`);
  },
};
