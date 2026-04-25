/**
 * API Service for communicating with the backend
 * Handles all HTTP requests to the FastAPI backend
 */

import type { Product, PriceComparison, BusinessMetric } from '../types';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// ============================================
// CONSUMER API ENDPOINTS
// ============================================

export interface SearchRequest {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface SearchResponse {
  searchId: string;
  query: string;
  results: Product[];
  totalResults: number;
  recommendations: Product[];
}

/**
 * Search for products
 */
export async function searchProducts(request: SearchRequest): Promise<SearchResponse> {
  return apiFetch<SearchResponse>('/consumer/search', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

/**
 * Get price comparison for a product
 */
export async function getPriceComparison(productId: string): Promise<PriceComparison> {
  return apiFetch<PriceComparison>(`/consumer/compare/${productId}`);
}

/**
 * Get AI recommendations
 */
export async function getRecommendations(
  category?: string,
  limit: number = 6
): Promise<Product[]> {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  params.append('limit', limit.toString());

  return apiFetch<Product[]>(`/consumer/recommendations?${params.toString()}`);
}

/**
 * Get product details
 */
export async function getProductDetails(productId: string): Promise<Product> {
  return apiFetch<Product>(`/consumer/products/${productId}`);
}

// ============================================
// BUSINESS API ENDPOINTS
// ============================================

export interface TrendDataPoint {
  month: string;
  avgPrice?: number;
  searches?: number;
}

export interface CompetitorData {
  platform: string;
  products: number;
  avgPrice: number;
  marketShare: number;
  avgRating?: number;
}

export interface CustomerJourneyMetric {
  stage: string;
  count: number;
  percentage: number;
}

export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

export interface BusinessDashboardData {
  metrics: BusinessMetric[];
  priceTrends: TrendDataPoint[];
  searchTrends: TrendDataPoint[];
  competitors: CompetitorData[];
  customerJourney: CustomerJourneyMetric[];
  sentiment: SentimentData;
}

/**
 * Get business dashboard data
 */
export async function getBusinessDashboard(category?: string): Promise<BusinessDashboardData> {
  const params = category ? `?category=${encodeURIComponent(category)}` : '';
  return apiFetch<BusinessDashboardData>(`/business/dashboard-data${params}`);
}

export interface BusinessInsight {
  id: string;
  type: string;
  category?: string;
  title: string;
  description: string;
  confidence: number;
  impact: string;
  generatedAt: string;
}

/**
 * Get business insights
 */
export async function getBusinessInsights(
  category?: string,
  limit: number = 10
): Promise<BusinessInsight[]> {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  params.append('limit', limit.toString());

  return apiFetch<BusinessInsight[]>(`/business/insights?${params.toString()}`);
}

/**
 * Get market overview
 */
export async function getMarketOverview(category?: string) {
  const params = category ? `?category=${encodeURIComponent(category)}` : '';
  return apiFetch(`/business/market-overview${params}`);
}

/**
 * Get price trends for a category
 */
export async function getPriceTrends(category: string, days: number = 30) {
  return apiFetch(`/business/price-trends/${encodeURIComponent(category)}?days=${days}`);
}

// ============================================
// HEALTH CHECK
// ============================================

export interface HealthStatus {
  status: string;
  database: string;
  environment: string;
}

/**
 * Check API health
 */
export async function checkHealth(): Promise<HealthStatus> {
  return fetch('/health').then(res => res.json());
}

export default {
  // Consumer
  searchProducts,
  getPriceComparison,
  getRecommendations,
  getProductDetails,

  // Business
  getBusinessDashboard,
  getBusinessInsights,
  getMarketOverview,
  getPriceTrends,

  // Health
  checkHealth,
};
