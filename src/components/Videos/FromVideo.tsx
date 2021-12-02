import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { GetVideo, PostVideo, UpdateVideo } from "../assets/VideosService";
import { Video } from "./Video";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

type inputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const FromVideo = () => {
  interface Params {
    id: string;
  }
  const history = useHistory();
  const params = useParams<Params>();
  console.log(params);
  const initial = {
    title: "",
    description: "",
    url: "",
  };
  const [video, setvideo] = useState<Video>(initial);
  const handlerChange = (e: inputChange) => {
    setvideo({ ...video, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await PostVideo(video);
      toast.success("New Video added");
      setvideo(initial);
    } else {
      await UpdateVideo(params.id, video);
      toast.success("Updated video");
    }
    history.push("/");
  };

  useEffect(() => {
    if (params.id)
      (async () => {
        const res = await GetVideo(params.id);
        const { title, description, url } = res.data;
        setvideo({ title, description, url });
      })();
  }, [params.id]);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>{params.id ? "Update Video" : "New Video"}</h3>

            <form onSubmit={handlerSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="new Title"
                  className="form-control"
                  onChange={handlerChange}
                  autoFocus
                  value={video.title}
                />
              </div>
              <div className="form-group mt-2">
                <input
                  type="text"
                  name="url"
                  placeholder="example https://somepage.com/f4f"
                  className="form-control"
                  onChange={handlerChange}
                  value={video.url}
                />
              </div>
              <div className="form-group mt-2 mb-2">
                <textarea
                  name="description"
                  placeholder="write a description"
                  rows={3}
                  className="form-control"
                  onChange={handlerChange}
                  value={video.description}
                ></textarea>
              </div>
              <button className="btn btn-primary">
                {params.id ? "Update Video" : "Create Video"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromVideo;
