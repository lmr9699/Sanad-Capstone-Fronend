import instance from "./axios";

export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  category: string;
  rating: number;
  reviews: number;
  providers: number;
  color: string;
  benefits: string[];
  duration: string;
  frequency: string;
  ageRange: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServicesResponse {
  success: boolean;
  data: {
    services: Service[];
    count: number;
  };
}

export interface ServiceResponse {
  success: boolean;
  data: {
    service: Service;
  };
}

export const getServices = async (): Promise<Service[]> => {
  const response = await instance.get<ServicesResponse>("/services");
  // axios interceptor returns response.data directly, so response is already the full response object
  return response.data.services;
};

export const getServiceById = async (serviceId: string): Promise<Service> => {
  const response = await instance.get<ServiceResponse>(`/services/${serviceId}`);
  // axios interceptor returns response.data directly, so response is already the full response object
  return response.data.service;
};
