import instance from "./axios";
import { Center } from "../types/directory.types";

export interface CenterFilters {
  type?: "public" | "private";
  city?: string;
  specialties?: string[];
}

export interface CentersResponse {
  success: boolean;
  data: {
    centers: Center[];
    count: number;
  };
}

export interface CenterResponse {
  success: boolean;
  data: {
    center: Center;
  };
}

export interface CreateCenterData {
  name: string;
  type?: "public" | "private";
  address: string;
  city: string;
  phone: string;
  email?: string;
  description?: string;
  specialties?: string[];
  operatingHours?: string;
  rating?: number;
  latitude?: number;
  longitude?: number;
}

export interface UpdateCenterData {
  name?: string;
  type?: "public" | "private";
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  description?: string;
  specialties?: string[];
  operatingHours?: string;
  rating?: number;
  latitude?: number;
  longitude?: number;
}

/**
 * Get all centers with optional filters
 * GET /api/centers
 * Query params: type, city, specialties
 */
export const getCenters = async (filters?: CenterFilters): Promise<Center[]> => {
  const params: Record<string, string> = {};

  if (filters?.type) params.type = filters.type;
  if (filters?.city) params.city = filters.city;
  if (filters?.specialties?.length) {
    params.specialties = filters.specialties.join(",");
  }

  const response = await instance.get<CentersResponse>("/centers", { params });
  // axios interceptor returns response.data directly, so response is already the full response object
  const data = (response as unknown as CentersResponse).data;
  // Ensure we return an array
  if (Array.isArray(data.centers)) {
    return data.centers;
  }
  return [];
};

/**
 * Get center by ID
 * GET /api/centers/:centerId
 */
export const getCenterById = async (centerId: string): Promise<Center> => {
  const response = await instance.get<CenterResponse>(`/centers/${centerId}`);
  // axios interceptor returns response.data directly, so response is already the full response object
  return (response as unknown as CenterResponse).data.center;
};

/**
 * Create a new center
 * POST /api/centers
 */
export const createCenter = async (data: CreateCenterData): Promise<Center> => {
  const response = await instance.post<CenterResponse>("/centers", data);
  // axios interceptor returns response.data directly, so response is already the full response object
  return (response as unknown as CenterResponse).data.center;
};

/**
 * Update center by ID
 * PUT /api/centers/:centerId
 * Note: This endpoint may need to be implemented in the backend
 */
export const updateCenter = async (
  centerId: string,
  data: UpdateCenterData
): Promise<Center> => {
  const response = await instance.put<CenterResponse>(`/centers/${centerId}`, data);
  // axios interceptor returns response.data directly, so response is already the full response object
  return (response as unknown as CenterResponse).data.center;
};

/**
 * Delete center by ID
 * DELETE /api/centers/:centerId
 */
export const deleteCenter = async (centerId: string): Promise<{ message: string }> => {
  const response = await instance.delete<{ success: boolean; data: { message: string } }>(
    `/centers/${centerId}`
  );
  // axios interceptor returns response.data directly, so response is already the full response object
  return (response as unknown as { success: boolean; data: { message: string } }).data;
};

/**
 * Get list of available cities from centers
 * Helper function that extracts unique cities from all centers
 */
export const getCities = async (): Promise<string[]> => {
  try {
    const centers = await getCenters();
    const cities = [...new Set(centers.map((center) => center.city).filter(Boolean))];
    return cities.sort();
  } catch {
    console.warn("Failed to get cities from centers");
    return [];
  }
};

/**
 * Get list of center specialties
 * Helper function that extracts unique specialties from all centers
 */
export const getSpecialties = async (): Promise<string[]> => {
  try {
    const centers = await getCenters();
    const specialtiesSet = new Set<string>();
    centers.forEach((center) => {
      if (center.specialties && Array.isArray(center.specialties)) {
        center.specialties.forEach((spec) => {
          if (spec) specialtiesSet.add(spec);
        });
      }
    });
    return Array.from(specialtiesSet).sort();
  } catch {
    console.warn("Failed to get specialties from centers");
    return [];
  }
};
