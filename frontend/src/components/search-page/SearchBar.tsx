"use client";

import SearchIcon from "@mui/icons-material/Search";
import FilterButton from "../FilterButton";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 200);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialQuery = searchParams.get("search") || "";
    setQuery(initialQuery);
  }, [searchParams]);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";

    if (debouncedQuery && debouncedQuery !== currentSearch) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", debouncedQuery);
      router.replace(`?${params.toString()}`);
    }
  }, [debouncedQuery, router, searchParams]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
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
