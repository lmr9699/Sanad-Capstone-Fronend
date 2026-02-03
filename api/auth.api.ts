import { ForgotPasswordRequest, LoginRequest, RegisterRequest } from "../types/auth.types";
import instance from "./axios";

export const login = async (data: LoginRequest) => {
  const response = await instance.post("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const response = await instance.post("/auth/register", data);
  return response.data;
};

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  const response = await instance.post("/auth/forgot-password", data);
  return response.data;
};

export const logout = async () => {
  await instance.post("/auth/logout");
};
