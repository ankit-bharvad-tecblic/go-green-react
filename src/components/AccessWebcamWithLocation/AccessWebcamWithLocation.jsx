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

    if ("geolocation" in navigator) {
      var options = {
        enableHighAccuracy: true, // Request high accuracy
        timeout: 5000, // Set a timeout (in milliseconds) for the request
        maximumAge: 0, // Force the device to get a fresh location
      };

      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          console.log("Latitude --->: " + latitude);
          console.log("Longitude ----> : " + longitude);
        },
        function (error) {
          console.log("Error retrieving location: " + error.message);
        },
        options
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    test();
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Captured image:", imageSrc);
  };

  const test = async () => {
    const apiKey = "AIzaSyAdl093xeazg-eo-HUhrWroyO0TkD88QTI";
    // const apiKey = "AIzaSyB1Qeha39Kgfr4kxZJ9uu4t0B_UL3E0Mkg";
    // //
    // let x = await fetch(
    //   `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // const { location } = x;
    // const latitude = location.lat;
    // const longitude = location.lng;

    fetch(
      `https://maps.googleapis.com/maps/api/geolocation/json?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const { location } = data;
        const latitude = location.lat;
        const longitude = location.lng;
        // Handle the accurate location data
        console.log("############ data -> ", data);
      })
      .catch((error) => {
        // Handle error
        console.log("error -> ", error);
      });
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

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       // Handle the accurate location data
//     },
//     (error) => {
//       // Handle error
//     },
//     { enableHighAccuracy: true }
//   );
// }

// import React from "react";
// import { useGeolocated } from "react-geolocated";

// const AccessWebcamWithLocation = () => {
//   const { coords, isGeolocationAvailable, isGeolocationEnabled } =
//     useGeolocated({
//       positionOptions: {
//         enableHighAccuracy: false,
//       },
//       userDecisionTimeout: 5000,
//     });

//   return !isGeolocationAvailable ? (
//     <div>Your browser does not support Geolocation</div>
//   ) : !isGeolocationEnabled ? (
//     <div>Geolocation is not enabled</div>
//   ) : coords ? (
//     <table>
//       <tbody>
//         <tr>
//           <td>latitude</td>
//           <td>{coords.latitude}</td>
//         </tr>
//         <tr>
//           <td>longitude</td>
//           <td>{coords.longitude}</td>
//         </tr>
//         <tr>
//           <td>altitude</td>
//           <td>{coords.altitude}</td>
//         </tr>
//         <tr>
//           <td>heading</td>
//           <td>{coords.heading}</td>
//         </tr>
//         <tr>
//           <td>speed</td>
//           <td>{coords.speed}</td>
//         </tr>
//       </tbody>
//     </table>
//   ) : (
//     <div>Getting the location data&hellip; </div>
//   );
// };

// export default AccessWebcamWithLocation;

// --------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";

// const AccessWebcamWithLocation = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.log("Error retrieving location:", error);
//         }
//       );
//     } else {
//       console.log("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   return (
//     <div>
//       {location ? (
//         <p>
//           Latitude: {location.lat}, Longitude: {location.lng}
//         </p>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default AccessWebcamWithLocation;

// import React, { useState, useEffect } from "react";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// const AccessWebcamWithLocation = ({ google }) => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.log("Error retrieving location:", error);
//         }
//       );
//     } else {
//       console.log("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   return (
//     <Map
//       google={google}
//       zoom={14}
//       center={location} // Set the center of the map to the user's location
//     >
//       {location && <Marker position={location} />}
//     </Map>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAdl093xeazg-eo-HUhrWroyO0TkD88QTI",
// })(AccessWebcamWithLocation);
