import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function GeoLoactionPage() {
  useEffect(() => {}, []);
  return <div></div>;
}

export default GeoLoactionPage;

export const UseGeoLoaction = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not Supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export const LocationFromGoogleApi = () => {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const encodedAddress = encodeURIComponent(address);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=YOUR_API_KEY`
      )
      .then((response) => {
        const { results } = response.data;

        if (results && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          setLatitude(lat);
          setLongitude(lng);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={handleAddressChange}
        />
        <button type="submit" style={{ backgroundColor: "blue" }}>
          Get Latitude and Longitude 
        </button>
      </form>

      {latitude && longitude && (
        <div>
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
        </div>
      )}
    </div>
  );
};
