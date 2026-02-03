import { HealthCenter, Professional } from "../types/directory.types";
import instance from "./axios";

export const getCenters = async (): Promise<HealthCenter[]> => {
  const response = await instance.get("/directory/centers");
  return response.data;
};

export const getCenterDetails = async (centerId: string): Promise<HealthCenter> => {
  const response = await instance.get(`/directory/centers/${centerId}`);
  return response.data;
};

export const getProfessionals = async (): Promise<Professional[]> => {
  const response = await instance.get("/directory/professionals");
  return response.data;
};

export const getProfessionalDetails = async (professionalId: string): Promise<Professional> => {
  const response = await instance.get(`/directory/professionals/${professionalId}`);
  return response.data;
};
