"use client";

import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";

const FilterButton = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleFilter}
        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-[#01579B]"
      >
        <FilterListIcon />
      </button>

      {isFilterOpen && (
        <div className="absolute right-0 z-10 mt-2 w-64 rounded-lg border bg-white p-4 shadow-lg">
          <h2 className="mb-2 text-sm font-bold">Filter</h2>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              ตำแหน่งใกล้ฉัน
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterButton;
