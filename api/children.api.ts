import instance from "./axios";

export interface Medication {
  name: string;
  dosage?: string;
  frequency?: string;
}

export interface Child {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  dateOfBirth?: string;
  diagnosis?: string[];
  diagnoses?: string[]; // Alias for diagnosis
  medicalHistory?: string;
  medications?: Medication[];
  allergies?: string[];
  parentId: string;
  medicalFiles?: string[]; // Array of medical file paths
  createdAt?: string;
  updatedAt?: string;
}

export interface ChildrenResponse {
  success: boolean;
  data: {
    children: Child[];
    count: number;
  };
}

export interface ChildResponse {
  success: boolean;
  data: {
    child: Child;
  };
}

/**
 * Get all children for authenticated user
 * GET /api/children
 * Returns an array of children
 */
export const getChildren = async (): Promise<Child[]> => {
  const response = await instance.get<ChildrenResponse>("/children");
  // axios interceptor returns response.data directly, so response is already the full response object
  const data = (response as unknown as ChildrenResponse).data;
  // Ensure we return an array
  if (Array.isArray(data.children)) {
    return data.children;
  }
  // If children is not an array, return empty array
  return [];
};

/**
 * Get child by ID
 * GET /api/children/:childId
 */
export const getChildById = async (childId: string): Promise<Child> => {
  const response = await instance.get<ChildResponse>(`/children/${childId}`);
  // axios interceptor returns response.data directly, so response is already the full response object
  return (response as unknown as ChildResponse).data.child;
};

/**
 * Create a new child
 * POST /api/children
 */
export const createChild = async (data: {
  name: string;
  age?: number;
  gender?: string;
  dateOfBirth?: string;
  diagnosis?: string[];
  medicalHistory?: string;
  medications?: Medication[];
  allergies?: string[];
}): Promise<Child> => {
  const response = await instance.post<ChildResponse>("/children", data);
  return (response as unknown as ChildResponse).data.child;
};

/**
 * Update child
 * PUT /api/children/:childId
 */
export const updateChild = async (
  childId: string,
  data: {
    name?: string;
    age?: number;
    gender?: string;
    dateOfBirth?: string;
    diagnosis?: string[];
    medicalHistory?: string;
    medications?: Medication[];
    allergies?: string[];
  }
): Promise<Child> => {
  const response = await instance.put<ChildResponse>(`/children/${childId}`, data);
  return (response as unknown as ChildResponse).data.child;
};

/**
 * Upload medical file for child
 * POST /api/upload/child/:childId/medical-file
 */
export const uploadChildMedicalFile = async (
  childId: string,
  file: { uri: string; type: string; name: string }
): Promise<{ fileUrl: string; message: string }> => {
  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    type: file.type,
    name: file.name,
  } as any);

  const response = await instance.post<{ success: boolean; data: { fileUrl: string; message: string } }>(
    `/upload/child/${childId}/medical-file`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return (response as unknown as { success: boolean; data: { fileUrl: string; message: string } }).data;
};

/**
 * Delete medical file from child
 * DELETE /api/upload/child/:childId/medical-file/:fileName
 */
export const deleteChildMedicalFile = async (
  childId: string,
  fileName: string
): Promise<{ message: string }> => {
  const response = await instance.delete<{ success: boolean; data: { message: string } }>(
    `/upload/child/${childId}/medical-file/${fileName}`
  );
  return (response as unknown as { success: boolean; data: { message: string } }).data;
};
