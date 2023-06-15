import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";

const AccessWebcamWithLocation = () => {
  const webcamRef = useRef(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const watchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    watchLocation();
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Captured image:", imageSrc);
  };

  return (
    <div>
      <h1>Webcam Location App</h1>
      {location ? (
        <div>
          <Webcam audio={false} ref={webcamRef} />
          <p>
            Current Location: {location.latitude}, {location.longitude}
          </p>
          <button onClick={capture}>Capture</button>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default AccessWebcamWithLocation;
