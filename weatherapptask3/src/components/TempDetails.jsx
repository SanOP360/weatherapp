import React from "react";
import { FaTemperatureHalf } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { BsSunsetFill, BsFillSunriseFill } from "react-icons/bs";
import {
  FaWind,
  FaTemperatureArrowUp,
  FaTemperatureArrowDown,
} from "react-icons/fa6";
import { getIcon } from "../apis/Weatherapi";

function TempDetails({ weather }) {
  const {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  } = weather;

  const detailItems = [
    {
      id: 1,
      Icon: BsFillSunriseFill,
      title: "Sunrise",
      value: sunrise,
      color: "text-yellow-400",
    },
    {
      id: 2,
      Icon: BsSunsetFill,
      title: "Sunset",
      value: sunset,
      color: "text-orange-500",
    },
    {
      id: 3,
      Icon: FaTemperatureArrowUp,
      title: "High",
      value: `${temp_max}°`,
      color: "text-red-500",
    },
    {
      id: 4,
      Icon: FaTemperatureArrowDown,
      title: "Low",
      value: `${temp_min}°`,
      color: "text-blue-300",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-800 to-teal-400 rounded-lg py-6 px-2 md:px-4 shadow-lg">
      <div className="text-center py-4">
        <p className="text-2xl font-semibold text-teal-100">{details}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between text-white py-5">
        <img
          src={getIcon(icon)}
          alt="weather icon"
          className="w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-0"
        />

        <p className="text-5xl sm:text-6xl font-bold">{`${temp}°`}</p>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center mb-2 sm:mb-0">
            <FaTemperatureHalf className="text-2xl sm:text-3xl text-yellow-400 mr-2" />
            <span className="text-xl sm:text-2xl font-medium">{`${feels_like}°`}</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <IoWaterOutline className="text-2xl sm:text-3xl text-blue-400 mr-2" />
            <span className="text-xl sm:text-2xl font-medium">{`${humidity}%`}</span>
          </div>
          <div className="flex items-center">
            <FaWind className="text-2xl sm:text-3xl text-gray-300 mr-2" />
            <span className="text-xl sm:text-2xl font-medium">{`${speed} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 text-white text-lg">
        {detailItems.map((detail) => (
          <div
            key={detail.id}
            className="flex items-center justify-center space-x-2"
          >
            <detail.Icon className={`text-2xl sm:text-3xl ${detail.color}`} />
            <p className="font-light">
              {detail.title}:{" "}
              <span className="font-semibold ml-1 whitespace-nowrap">
                {detail.value}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TempDetails;
