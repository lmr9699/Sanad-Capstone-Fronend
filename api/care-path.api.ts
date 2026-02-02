import instance from "./axios";

export const getWeeklyPlan = async () => {
  const response = await instance.get("/care-path/weekly-plan");
  return response;
};

export const getTaskDetails = async (taskId: string) => {
  const response = await instance.get(`/care-path/tasks/${taskId}`);
  return response;
};

export const getProgress = async () => {
  const response = await instance.get("/care-path/progress");
  return response;
};

export const submitCheckIn = async (data: { notes: string; rating: number }) => {
  const response = await instance.post("/care-path/check-in", data);
  return response;
};

export const generateCarePath = async () => {
  const response = await instance.post("/care-path/generate");
  return response;
};

import { Child } from "../types/child.types";

export const getChildren = async (): Promise<Child[]> => {
  const response = await instance.get<Child[]>("/care-path/children");
  return response.data;
};
