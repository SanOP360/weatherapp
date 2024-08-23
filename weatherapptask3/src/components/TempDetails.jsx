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

  console.log(icon);

  const detailItems = [
    {
      id: 1,
      Icon: BsFillSunriseFill,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: BsSunsetFill,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: FaTemperatureArrowUp,
      title: "High",
      value: `${temp_max}°`,
    },
    {
      id: 4,
      Icon: FaTemperatureArrowDown,
      title: "Low",
      value: `${temp_min}°`,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-teal-200">
        <p>{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={getIcon(icon)} alt="weather icon" className="w-20" />

        <p className="text-5xl">{`${temp}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <FaTemperatureHalf className="text-lg mr-3" />
            <span className="font-medium ml-1">{`${feels_like}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <IoWaterOutline className="text-lg mr-3" />
            <span className="font-medium ml-1">{`${humidity}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <FaWind className="text-lg mr-3" />
            <span className="font-medium ml-1">{`${speed} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-2 md:gap-6 sm:space-x-2 space-y-3 sm:space-y-0 text-white text-sm py-3">
        {detailItems.map((detail) => (
          <div key={detail.id}>
            <div className="flex items-center justify-center">
              <detail.Icon className="text-lg mr-3" />
              <p className="font-light text-sm md:text-lg whitespace-nowrap">
                {detail.title}:{" "}
                <span className="font-medium ml-1 text-sm md:text-lg">
                  {detail.value}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TempDetails;
