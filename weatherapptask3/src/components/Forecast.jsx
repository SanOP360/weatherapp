import React from "react";

function Forecast({ title, items }) {
  return (
    <div>
      <div className="flex items-center justify-start my-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light text-sm">{item.title}</p>
            <img src={item.icon} className="w-12 my-1" alt="weather icon" />
            <p className="font-medium ">{`${item.temp}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
