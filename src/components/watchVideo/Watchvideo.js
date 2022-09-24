import React, { useState, useContext } from "react";
import { VideoPlayer } from "@livepeer/react";
import { AppStateContext } from "../../App";
import "../../App.css";

function Watchvideo() {
  const { description } = useContext(AppStateContext);
  return (
    <div className="watchVideo">
      <h1>{description} </h1>
      <div>
        <VideoPlayer playbackId={"ecf3x0iwakn2uif6"} />;
      </div>
    </div>
  );
}

export default Watchvideo;
