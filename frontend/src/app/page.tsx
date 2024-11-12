"use client";

import CardWithImageHeader from "@/components/search-page/CardWithImageHeader";
import SearchBar from "@/components/search-page/SearchBar";
import { WaterStationService } from "@/api/water-station-service";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import SkeletonCard from "@/components/search-page/SkeletonCard";

interface WaterStation {
  _id: string;
  name: string;
  isFree: boolean;
  address: string;
  waterTemperature: string[];
  permission: string[];
}

interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string | null;
}

const Home = () => {
  const { data: session } = useSession();

  const token = (session?.user as SessionUser)?.token || "";
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const filters = {
    permission: searchParams.get("permission") || "",
    waterTemperature: searchParams.get("waterTemperature") || "",
    isFree: searchParams.get("isFree") === "true",
    sort: searchParams.get("sort") || "",
  };

  const {
    data: waterStations = [],
    isError,
    isLoading,
    isFetched,
  } = useQuery({
    queryFn: () =>
      WaterStationService.getWaterStations(searchQuery, token, filters),
    queryKey: ["water-stations", searchQuery],
  });

  return (
    <div className="xl:max-w-screen mx-auto px-12 pt-10">
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

      {isFetched && (
        <p className="mt-4 text-sm text-gray-500">
          {waterStations.length} results found{" "}
        </p>
      )}

      <div className="mt-16 grid grid-cols-1 items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {isLoading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {waterStations.map((station: WaterStation) => (
          <Link key={station._id} href={`/water-station/${station._id}`}>
            <CardWithImageHeader
              name={station.name}
              isFree={station.isFree ? "ฟรี" : "เสียเงิน"}
              address={station.address}
              permission={station.permission}
              waterTemperature={station.waterTemperature}
            />
          </Link>
        ))}
      </div>

      {isFetched && waterStations.length === 0 && (
        <Image
          src="/images/waterStationNotFound.png"
          alt="Water station not found"
          className="mx-auto mt-10"
          width={300}
          height={300}
        />
      )}

      {isError && (
        <p className="text-center text-red-500">Something went wrong!</p>
      )}
    </div>
  );
};

export default Home;
