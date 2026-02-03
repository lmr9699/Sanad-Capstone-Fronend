import instance from "./axios";
import { HealthCenter, Professional } from "@/types/directory.types";


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

export const getCenterDetails = async (centerId: string) => {
  const response = await instance.get(`/directory/centers/${centerId}`);
  return response.data;
};

export const getProfessionals = async () => {
  const response = await instance.get("/directory/professionals");
  return response.data;
};

export const getProfessionalDetails = async (professionalId: string) => {
  const response = await instance.get(`/directory/professionals/${professionalId}`);
  return response.data;
};
