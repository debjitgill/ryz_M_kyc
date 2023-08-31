import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
const CameraCapture = ({ handleCaptureImage, imageValue, onSave }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [width, setWidth] = useState(320);
  const [height, setHeight] = useState(0);

  const handleCanPlay = () => {
    if (!streaming && videoRef.current) {
      const newHeight =
        videoRef.current.videoHeight / (videoRef.current.videoWidth / width);
      setHeight(isNaN(newHeight) ? width / (4 / 3) : newHeight);
      setStreaming(true);
    }
  };

  useEffect(() => {
    const startup = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.log("An error occurred: " + err);
      }
    };

    startup();

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        const tracks = videoRef.current.srcObject?.getTracks();
        tracks?.forEach((track) => track.stop());
      }
    };
  }, []);
  const handleTakePicture = () => {
    if (canvasRef.current && videoRef && videoRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      const context = canvasRef.current.getContext("2d");
      context?.drawImage(videoRef.current, 0, 0, width, height);

      const data = canvasRef.current.toDataURL("image/png");
      handleCaptureImage(data);
    }
  };
  return (
    <div className="contentarea absolute top-20 right-0 left-[40%] bottom-0 m-auto">
      <div className="camera">
        {imageValue && <img src={imageValue} alt={"image"} />}
        <video
          className={`${imageValue && "hidden"}`}
          width="240"
          height="300"
          ref={videoRef}
          onCanPlay={handleCanPlay}
        >
          Video stream not available.
        </video>
      </div>
      <div></div>
      <div className="mt-4">
        {imageValue ? (
          <div className="flex gap-20">
            <Button
              variant="contained"
              color="error"
              onClick={() => handleCaptureImage("")}
            >
              Retake
            </Button>
            <Button variant="contained" color="success" onClick={onSave}>
              Save
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={handleTakePicture}
          >
            Take Photo
          </Button>
        )}
        <canvas className="hidden" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default CameraCapture;
