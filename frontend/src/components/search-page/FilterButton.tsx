"use client";

import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useRouter, useSearchParams } from "next/navigation";

const FilterButton = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const [waterTemperature, setWaterTemperature] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [sort, setSort] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (waterTemperature) {
      params.set("waterTemperature", waterTemperature);
    } else {
      params.delete("waterTemperature");
    }

    if (isFree) {
      params.set("isFree", isFree.toString());
    } else {
      params.delete("isFree");
    }

    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    router.replace(`?${params.toString()}`);
    setIsFilterOpen(false);
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
          <h2 className="text-md mb-2 font-bold">Filter</h2>
          <div className="flex flex-col space-y-2">
            {/* Is Free filter */}
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                className="mr-2"
              />
              ฟรี
            </label>

            {/* Water Temperature filter */}
            <label className="flex flex-col text-sm">
              <span className="text-gray-500">อุณหภูมิน้ำ</span>
              <select
                value={waterTemperature}
                onChange={(e) => setWaterTemperature(e.target.value)}
              >
                <option value="">-</option>
                <option value="ร้อน">ร้อน</option>
                <option value="เย็น">เย็น</option>
                <option value="อุณหภูมิห้อง">อุณหภูมิห้อง</option>
              </select>
            </label>

            {/* Sort filter */}
            <label className="flex flex-col text-sm">
              <span className="text-gray-500">เรียงตาม:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">-</option>
                <option value="name">ชื่อ</option>
                <option value="-createdAt">อายุ (ใหม่ - เก่า)</option>
              </select>
            </label>

            {/* Apply Filters button */}
            <button
              onClick={applyFilters}
              className="mt-4 rounded bg-[#01579B] p-2 text-sm text-white"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterButton;
