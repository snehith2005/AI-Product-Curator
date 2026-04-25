/**
 * Central type exports
 */
export * from './auth.types';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  platform: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
}

export interface PriceComparison {
  productId: string;
  platforms: {
    name: string;
    price: number;
    shipping: number;
    rating: number;
    availability: string;
    url: string;
  }[];
}

export interface BusinessMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export interface DailySearchVolume {
  date: string;
  searches: number;
}

export interface CategoryBreakdown {
  category: string;
  count: number;
  percentage: number;
}

export interface TopSearchTerm {
  term: string;
  category: string | null;
  count: number;
}

export interface CompetitorData {
  platform: string;
  products: number;
  avgPrice: number;
  marketShare: number;
  avgRating: number | null;
}

export interface UserActivityItem {
  email: string;
  searchCount: number;
  lastActive: string;
}

export interface PriceInsight {
  category: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  productCount: number;
}

export interface BusinessDashboardResponse {
  metrics: BusinessMetric[];
  dailySearchVolume: DailySearchVolume[];
  categoryBreakdown: CategoryBreakdown[];
  topSearchTerms: TopSearchTerm[];
  platformPerformance: CompetitorData[];
  userActivity: UserActivityItem[];
  priceInsights: PriceInsight[];
}