import { Event, Post } from "../types/community.types";
import instance from "./axios";

export const getCommunityPosts = async (): Promise<Post[]> => {
  const response = await instance.get("/community/posts");
  return response.data;
};

export const createPost = async (data: { content: string }): Promise<Post> => {
  const response = await instance.post("/community/posts", data);
  return response.data;
};

export const getEvents = async (): Promise<Event[]> => {
  const response = await instance.get("/community/events");
  return response.data;
};
