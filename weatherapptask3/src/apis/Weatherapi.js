import axios from "axios";
import { DateTime } from "luxon";

const API_KEY = "9de46e2843ddf44a0d44b201f843a2e0";
const base_URL = "https://api.openweathermap.org/data/2.5";

// Function to fetch weather data based on type and parameters
const getWeathData = async (infoType, searchParams) => {
  const url = new URL(base_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const response = await axios.get(url.toString());
  return response.data;
};

// Function to format current weather data
const currentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    details,
    icon,
    speed,
    timezone,
  };
};

const formatForecastWeather = (secs, offset, data) => {
  // hourly
  const hourly = data
    .filter((f) => f.dt > secs)
    .slice(0, 5)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: getIcon(f.weather[0].icon),
      date: f.dt_txt,
    }));

  // daily
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: getIcon(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};


// Function to fetch and format advanced weather data
const getAdvancedWeatherData = async (searchParams) => {
  const advancedCurrentWeather = await getWeathData("weather", searchParams);
  const formattedCurrentWeather = currentWeather(advancedCurrentWeather);

  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  const forecastData = await getWeathData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  });

  const formattedForecastWeather = formatForecastWeather(
    dt,
    timezone,
    forecastData.list
  );

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

// Function to format time into a local time string
const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy '| Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

// Function to get the weather icon URL
const getIcon = (i) => `http://openweathermap.org/img/wn/${i}@2x.png`;

export default getAdvancedWeatherData;
export { formatToLocalTime, getIcon };
