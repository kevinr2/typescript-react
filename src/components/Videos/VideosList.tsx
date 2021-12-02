import React, { useEffect, useState } from "react";
import { Getvideos } from "../assets/VideosService";
import { Video } from "./Video";
import VideoItem from "./VideoItem";

const VideosList = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const loadvideo = async () => {
    const res = await Getvideos();
    setVideos(res);
  };

  useEffect(() => {
    loadvideo();
  }, []);
  return (
    <div className="row">
      {videos.map((item) => (
        <VideoItem key={item._id} video={item} loadVideo={loadvideo} />
      ))}
    </div>
  );
};

export default VideosList;
