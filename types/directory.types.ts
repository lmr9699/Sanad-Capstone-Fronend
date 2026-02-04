export interface HealthCenter {
  id: string;
  name: string;
  type: "public" | "private";
  address: string;
  city: string;
  phone: string | number;
  email?: string;
  description?: string;
  specialties?: string[];
  operatingHours?: string;
  rating?: number;
  latitude?: number;          
  longitude?: number; 
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  description?: string;
  centerId?: string;
  centerName?: string;
  email?: string;
  phone?: number;
  experience?: number;
  languages?: string[];
  rating?: number;
}
