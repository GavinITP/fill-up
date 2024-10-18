import SearchBar from "@/components/SearchBar";
import CardWithImageHeader from "@/components/CardWithImageHeader";

const Home = () => {
  return (
    <div className="container mx-auto px-12 pt-10">
      <div className="mb-14 mt-4">
        <h1 className="text-center text-5xl font-black text-[#01579B]">
          Fill Up
        </h1>

        <p className="mt-6 text-center text-gray-500">
          {'"'}ค้นหาสถานีเติมน้ำที่สะดวกและใกล้ที่สุดสำหรับคุณ
          เพื่อให้การเข้าถึงน้ำสะอาดเป็นเรื่องง่าย{'"'}
        </p>
      </div>

      <SearchBar />

      <div className="mt-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-3 xl:grid-cols-4">
        <CardWithImageHeader />
        <CardWithImageHeader />
        <CardWithImageHeader />
        <CardWithImageHeader />
        <CardWithImageHeader />
        <CardWithImageHeader />
      </div>
    </div>
  );
};

export default Home;
