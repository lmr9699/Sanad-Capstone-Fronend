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

// Mock services data for fallback
const MOCK_SERVICES: Service[] = [
  {
    id: "1",
    name: "Speech Therapy",
    description: "Improve communication and language skills with certified therapists",
    longDescription: "Speech therapy helps individuals develop and improve their communication abilities. Our certified speech-language pathologists work with children and adults to address speech disorders, language delays, voice problems, and swallowing difficulties. Sessions are tailored to each individual's needs and goals.",
    icon: "chatbubbles",
    category: "Therapy",
    rating: 4.9,
    reviews: 128,
    providers: 24,
    color: "#7FB77E",
    benefits: [
      "Improved verbal communication",
      "Better language comprehension",
      "Enhanced social skills",
      "Increased confidence in speaking",
    ],
    duration: "45-60 min",
    frequency: "2x/week",
    ageRange: "2-18 years",
  },
  {
    id: "2",
    name: "Occupational Therapy",
    description: "Develop daily living skills and fine motor abilities",
    longDescription: "Occupational therapy focuses on helping individuals perform daily activities and develop essential life skills. Our therapists work on fine motor skills, sensory processing, self-care routines, and school-related tasks to promote independence and participation in everyday life.",
    icon: "hand-left",
    category: "Therapy",
    rating: 4.8,
    reviews: 95,
    providers: 18,
    color: "#5F8F8B",
    benefits: [
      "Improved fine motor skills",
      "Better sensory processing",
      "Enhanced self-care abilities",
      "Increased independence",
    ],
    duration: "45-60 min",
    frequency: "2x/week",
    ageRange: "1-18 years",
  },
  {
    id: "3",
    name: "Behavioral Therapy",
    description: "Address behavioral challenges with evidence-based approaches",
    longDescription: "Applied Behavior Analysis (ABA) and other behavioral therapies help children develop positive behaviors and reduce challenging ones. Our board-certified behavior analysts create individualized treatment plans based on each child's unique needs and family goals.",
    icon: "heart",
    category: "Therapy",
    rating: 4.7,
    reviews: 87,
    providers: 15,
    color: "#E87830",
    benefits: [
      "Reduced challenging behaviors",
      "Improved social interactions",
      "Better emotional regulation",
      "Enhanced learning abilities",
    ],
    duration: "1-3 hours",
    frequency: "3-5x/week",
    ageRange: "2-12 years",
  },
  {
    id: "4",
    name: "Physical Therapy",
    description: "Enhance movement, balance, and physical development",
    longDescription: "Pediatric physical therapy helps children improve their gross motor skills, strength, balance, and coordination. Our therapists use play-based activities and specialized equipment to make therapy fun while achieving developmental milestones.",
    icon: "fitness",
    category: "Therapy",
    rating: 4.8,
    reviews: 72,
    providers: 12,
    color: "#9B59B6",
    benefits: [
      "Improved mobility and movement",
      "Better balance and coordination",
      "Increased strength and endurance",
      "Achievement of motor milestones",
    ],
    duration: "45-60 min",
    frequency: "1-2x/week",
    ageRange: "0-18 years",
  },
  {
    id: "5",
    name: "Educational Support",
    description: "Specialized learning assistance for academic success",
    longDescription: "Our educational specialists provide individualized learning support for children with learning differences. We offer tutoring, study skills training, and academic accommodations guidance to help every child succeed in school.",
    icon: "school",
    category: "Education",
    rating: 4.6,
    reviews: 64,
    providers: 20,
    color: "#3498DB",
    benefits: [
      "Improved academic performance",
      "Better study habits",
      "Increased confidence in learning",
      "Customized learning strategies",
    ],
    duration: "60 min",
    frequency: "2-3x/week",
    ageRange: "5-18 years",
  },
  {
    id: "6",
    name: "Family Counseling",
    description: "Support for families navigating special needs journey",
    longDescription: "Family counseling provides emotional support and practical guidance for families of children with special needs. Our licensed counselors help families cope with challenges, improve communication, and strengthen family bonds.",
    icon: "people",
    category: "Support",
    rating: 4.9,
    reviews: 56,
    providers: 10,
    color: "#E74C3C",
    benefits: [
      "Reduced family stress",
      "Improved communication",
      "Better coping strategies",
      "Stronger family connections",
    ],
    duration: "60 min",
    frequency: "1x/week",
    ageRange: "All ages",
  },
];

export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await instance.get<ServicesResponse>("/services");
    const data = (response as unknown as ServicesResponse).data;
    if (Array.isArray(data.services) && data.services.length > 0) {
      return data.services;
    }
    // Return mock data if no services from API
    return MOCK_SERVICES;
  } catch (error) {
    // Return mock data on error (for offline/demo mode)
    console.log("Using mock services data");
    return MOCK_SERVICES;
  }
};

export const getServiceById = async (serviceId: string): Promise<Service> => {
  try {
    const response = await instance.get<ServiceResponse>(`/services/${serviceId}`);
    return (response as unknown as ServiceResponse).data.service;
  } catch (error) {
    // Return mock service on error
    const mockService = MOCK_SERVICES.find(s => s.id === serviceId);
    if (mockService) {
      return mockService;
    }
    throw new Error("Service not found");
  }
};
