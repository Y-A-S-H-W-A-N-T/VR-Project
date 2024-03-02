import React from "react";

function SearchBar() {
  return (
    <div className="relative pr-4">
      <input
        type="text"
        placeholder={"Eg.Land in Kanpur"}
        className="py-2 mt-12 px-4 pr-12 block w-full rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
        onChange={''}
      />
      <button className="absolute inset-y-0 right-0 px-4 bg-amber-950 text-white font-semibold rounded-r-lg hover:bg-amber-500 focus:outline-none focus:bg-blue-600">
        Search
      </button>
    </div>
  );
}

export default SearchBar;