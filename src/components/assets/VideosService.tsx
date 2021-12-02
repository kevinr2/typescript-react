import axios from "axios";
import { Video } from "../Videos/Video";

const API = "http://localhost:4000/video";

export const Getvideos = async () => {
  const res = await axios.get<Video[]>(API);
  const dataForm = res.data
    .map((video) => {
      return {
        ...video,
        createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
        updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
      };
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return dataForm;
};

export const PostVideo = async (video: Video) => {
  return await axios.post(API, video);
};

export const GetVideo = async (id: string) => {
  return await axios.get(`${API}/${id}`);
};
export const UpdateVideo = async (id: string, video: Video) => {
  return await axios.put(`${API}/${id}`, video);
};
export const DeleteVideo = async (id: string) => {
  return await axios.delete(`${API}/${id}`);
};
