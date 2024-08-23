import React from "react";

function ButtonsatTop({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Mumbai",
    },
    {
      id: 2,
      title: "Delhi",
    },
    {
      id: 3,
      title: "Bengaluru",
    },
    {
      id: 4,
      title: "Chennai",
    },
    {
      id: 5,
      title: "Kolkata",
    },
  ];

  const handleClick = (city) => {
    setQuery({ q: city });
  };

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-xs md:text-lg font-medium"
          onClick={() => handleClick(city.title)} 
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default ButtonsatTop;
