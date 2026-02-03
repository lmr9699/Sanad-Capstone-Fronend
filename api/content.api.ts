import instance from "./axios";

export const getResources = async () => {
  const response = await instance.get("/content/resources");
  return response.data;
};

export const getContentDetails = async (contentId: string) => {
  const response = await instance.get(`/content/${contentId}`);
  return response.data;
};
