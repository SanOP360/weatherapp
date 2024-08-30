import React, { useState } from "react";
import { GoLocation } from "react-icons/go";
import { BiSearch } from "react-icons/bi";

function Input({ setQuery, setUnit }) {
  const [city, setCity] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("metric");

  const handleSearch = () => {
    if (city) {
      setQuery({ q: city });
      setCity("");
    }
  };

  const handleUnitChange = (unit) => {
    setUnit(unit); 
    setSelectedUnit(unit);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude,longitude)
          setQuery({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex flex-col items-center my-6 space-y-4">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          className="md:text-xl font-light p-2 px-5 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-full text-gray-600"
          placeholder="Search for city..."
        />
        <BiSearch
          onClick={handleSearch}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          size={25}
        />
        <GoLocation
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          size={25}
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center space-x-2">
        <button
          className={`md:text-xl text-sm px-2 py-2 rounded-lg transition ease-out  ${
            selectedUnit === "metric"
              ? "bg-transparent border border-white text-white shadow-lg  "
              : "bg-gray-600 text-white p-4 text-lg font-bold border border-white"
          }`}
          onClick={() => handleUnitChange("metric")}
        >
          °C
        </button>

        <button
          className={`md:text-xl text-sm px-2 py-2 rounded-lg transition ease-out ${
            selectedUnit === "imperial"
              ? "bg-transparent text-white  shadow-lg border border-white "
              : "bg-gray-600 text-white p-4 text-lg font-bold border border-white"
          }`}
          onClick={() => handleUnitChange("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Input;
