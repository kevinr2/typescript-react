import React from "react";
import { Video } from "./Video";
import ReactPlayer from "react-player";
import "../assets/css/VideoHover.css";
import { useHistory } from "react-router-dom";
import { DeleteVideo } from "../assets/VideosService";

interface props {
  video: Video;
  loadVideo: () => void;
}

const VideoItem = ({ video, loadVideo }: props) => {
  const history = useHistory();

  const handlerDelete = async (id: string) => {
    await DeleteVideo(id);
    loadVideo();
  };

  return (
    <div className="col-md-4">
      <div className="card card-body video-card">
        <div className="d-flex justify-content-between">
          <h1 onClick={() => history.push(`/update-video/${video._id}`)}>
            {video.title}
          </h1>
          <span
            className="text-danger"
            onClick={() => video._id && handlerDelete(video._id)}
          >
            X
          </span>
        </div>
        <p>{video.description}</p>
        <div className="embed-responsive embed-responsive-16by9">
          <ReactPlayer url={video.url} />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
