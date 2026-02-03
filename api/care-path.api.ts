import { CheckIn, Progress, Task, WeeklyPlan } from "../types/care-path.types";
import { Child } from "../types/child.types";
import instance from "./axios";

export const getWeeklyPlan = async (): Promise<WeeklyPlan> => {
  const response = await instance.get("/care-path/weekly-plan");
  return response.data;
};

export const getTaskDetails = async (taskId: string): Promise<Task> => {
  const response = await instance.get(`/care-path/tasks/${taskId}`);
  return response.data;
};

export const getProgress = async (): Promise<Progress> => {
  const response = await instance.get("/care-path/progress");
  return response.data;
};

export const submitCheckIn = async (data: { notes: string; rating: number }): Promise<CheckIn> => {
  const response = await instance.post("/care-path/check-in", data);
  return response.data;
};

export const generateCarePath = async (): Promise<WeeklyPlan> => {
  const response = await instance.post("/care-path/generate");
  return response.data;
};

export const getChildren = async (): Promise<Child[]> => {
  const response = await instance.get("/care-path/children");
  return response.data;
};
