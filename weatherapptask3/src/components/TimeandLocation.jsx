import React from "react";
import { formatToLocalTime } from "../apis/Weatherapi"; 

function TimeandLocation({ weather }) {
  const { dt, timezone, name, country } = weather;

  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white md:text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-2xl md:text-3xl font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
    </div>
  );
}

export default TimeandLocation;
