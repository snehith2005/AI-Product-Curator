/**
 * Business dashboard API client
 */
import { apiClient } from './client';
import type { BusinessDashboardResponse } from '../types';

export const businessApi = {
  getDashboardData: (): Promise<BusinessDashboardResponse> =>
    apiClient.get<BusinessDashboardResponse>('/business/dashboard-data'),
};
