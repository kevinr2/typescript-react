import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VideosList from "./components/Videos/VideosList";
import FromVideo from "./components/Videos/FromVideo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootswatch/dist/pulse/bootstrap.min.css";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={VideosList} />
          <Route path="/new-video" component={FromVideo} />
          <Route path="/update-video/:id" component={FromVideo} />
        </Switch>
        <ToastContainer />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
