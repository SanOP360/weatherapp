import React, { useEffect, useState } from "react";
import ButtonsatTop from "./components/ButtonsatTop";
import Input from "./components/Input";
import TimeandLocation from "./components/TimeandLocation";
import TempDetails from "./components/TempDetails";
import Forecast from "./components/Forecast";
import getAdvancedWeatherData from "./apis/Weatherapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WiDaySunny } from "react-icons/wi"; 

// Color mappings for different weather conditions
const weatherColors = {
  clear: "bg-gradient-to-br from-lime-700 to-green-500",
  clouds: "bg-gradient-to-br from-blue-300 to-gray-700",
  thunderstorm: "bg-gradient-to-br from-gray-600 to-stone-500",
  drizzle: "bg-gradient-to-br from-blue-500 to-blue-700",
  snow: "bg-gradient-to-br from-blue-600 to-sky-200",
  rain: "bg-gradient-to-br from-gray-500 to-gray-800",
  haze: "bg-gradient-to-br from-sky-300 to-gray-400",
  mist: "bg-gradient-to-br from-gray-500 to-teal-800",
};

export default function App() {
  const [query, setQuery] = useState({ q: "Almora" });
  const [unit, setUnit] = useState("metric");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const message = query.q ? query.q : "current location";
      toast.info(`Fetching weather data for ${message}`);
      const data = await getAdvancedWeatherData({ ...query, units: unit });
      setWeather(data);
    } catch (error) {
      toast.error("Error fetching weather data. Please try again.");
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    // Fetch weather data when query or unit changes
    getWeather();
  }, [query, unit]);

  useEffect(() => {
    // Fetch the user's location on component mount
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setQuery({ lat: latitude, lon: longitude });
          },
          (error) => {
            toast.error(
              "Error getting location. Please enable location services."
            );
            console.error("Error getting location: ", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        toast.error("Geolocation is not supported by this browser.");
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, []);

  // Determine background color based on weather condition
  const backgroundColor = weather
    ? weather.details.toLowerCase() in weatherColors
      ? weatherColors[weather.details.toLowerCase()]
      : "bg-gradient-to-br from-gray-500 to-purple-300"
    : "bg-gradient-to-br from-gray-500 to-purple-400";

  return (
    <div
      className={`mx-auto max-w-screen-md md:my-4 py-5 px-4 md:px-20 lg:px-32 ${backgroundColor} h-fit shadow-xl shadow-gray-400`}
    >
      <div className="flex  items-center justify-between mb-6">
        <WiDaySunny className="w-14 h-14 text-orange-500" />
        <h1 className="text-4xl text-slate-200 font-bold mb-2">SkyScout</h1>
        <WiDaySunny className="w-14 h-14 text-orange-500" />
      </div>
      <hr />
      <ButtonsatTop setQuery={setQuery} setUnit={setUnit} />
      <Input setQuery={setQuery} setUnit={setUnit} />
      {weather && (
        <>
          <TimeandLocation weather={weather} />
          <TempDetails weather={weather} />
          <Forecast title="Hourly forecast" items={weather.hourly} />
          <Forecast title="Daily forecast" items={weather.daily} />
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
}
