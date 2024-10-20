import SearchIcon from "@mui/icons-material/Search";
import FilterButton from "./FilterButton";

const SearchBar = () => {
  return (
    <div className="relative mx-auto w-full">
      <input
        type="text"
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
