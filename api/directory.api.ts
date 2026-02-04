import { HealthCenter, Professional } from "../types/directory.types";
import instance from "./axios";


export interface CenterFilters {
  type?: "public" | "private";
  city?: string;
  specialties?: string[];
}

export const getCenters = async (filters?: CenterFilters) => {
  const params: Record<string, string> = {};

  if (filters?.type) params.type = filters.type;
  if (filters?.city) params.city = filters.city;
  if (filters?.specialties?.length) {
    params.specialties = filters.specialties.join(",");
  }
  const response = await instance.get("/directory/centers", { params });
  return response.data;
};


export const getCities = async (): Promise<string[]> => {
  const response = await instance.get("/directory/centers/cities");
  return response.data;
};


export const getSpecialties = async (): Promise<string[]> => {
  const response = await instance.get("/directory/centers/specialties");
  return response.data;
};


export interface ProfessionalFilters {
  specialty?: string;
  tags?: string[];
  city?: string;
  search?: string;
}


export const getProfessionals = async (filters?: ProfessionalFilters): Promise<Professional[]> => {
  const params: Record<string, string> = {};
  
  if (filters?.specialty) params.specialty = filters.specialty;
  if (filters?.tags?.length) params.tags = filters.tags.join(","); 
  if (filters?.city) params.city = filters.city;
  if (filters?.search) params.search = filters.search;
  
  const response = await instance.get<{ success: boolean; data: { professionals: Professional[]; count: number } }>("/directory/professionals", { params });
  // axios interceptor returns response.data directly, so response is already the full response object
  return response.data.professionals;
};

export const getProfessionalSpecialties = async (): Promise<string[]> => {
  const response = await instance.get("/directory/professionals/specialties/list");
  return response.data;
};


export const getProfessionalTags = async (): Promise<string[]> => {
  const response = await instance.get("/directory/professionals/tags/list");
  return response.data;
};

export const getCenterDetails = async (centerId: string): Promise<HealthCenter> => {
  const response = await instance.get(`/directory/centers/${centerId}`);
  return response.data;
};



export const getProfessionalDetails = async (professionalId: string): Promise<Professional> => {
  const response = await instance.get<{ success: boolean; data: { professional: Professional } }>(`/directory/professionals/${professionalId}`);
  // axios interceptor returns response.data directly, so response is already the full response object
  return response.data.professional;
};
