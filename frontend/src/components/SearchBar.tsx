"use client";

import SearchIcon from "@mui/icons-material/Search";
import FilterButton from "./FilterButton";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = ({ search }: { search: (query: string) => void }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setQuery(initialQuery);
  }, [searchParams]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    search(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    router.replace(`?${params.toString()}`);
  }

  return (
    <div className="relative mx-auto w-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full rounded-2xl border px-4 py-2 pr-20 shadow-sm focus:border-[#0288D1] focus:outline-none focus:ring-1 focus:ring-[#0288D1]"
        placeholder="ค้นหาสถานีเติมน้ำ"
      />

      <button
        type="submit"
        className="absolute right-12 top-1/2 -translate-y-1/2 transform text-[#01579B]"
      >
        <SearchIcon />
      </button>

      <FilterButton />
    </div>
  );
};

export default SearchBar;
