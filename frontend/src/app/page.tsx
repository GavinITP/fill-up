"use client";

import CardWithImageHeader from "@/components/CardWithImageHeader";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface WaterStation {
  _id: string;
  name: string;
  isFree: boolean;
  address: string;
  permission: string;
  waterTemperature: string;
}

const Home = () => {
  const { data: session } = useSession();
  const [waterStations, setWaterStations] = useState<WaterStation[]>([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const fetchWaterStations = async (query: string) => {
    const token = session?.user.token;
    const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/`;

    try {
      const response = await axios.get(
        `${API_ENDPOINT}?name=${query}&approvalStatus=approved`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setWaterStations(response.data.data || []);
    } catch (error) {
      console.error("Error fetching water stations:", error);
    }
  };

  useEffect(() => {
    fetchWaterStations(searchQuery);
  }, [searchQuery]);

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

      <div className="mt-16 grid grid-cols-1 items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {waterStations.map((station) => (
          <div
            key={station._id}
            onClick={() => {
              router.push(`/water-station/${station._id}`);
            }}
          >
            <CardWithImageHeader
              name={station.name}
              isFree={station.isFree ? "ฟรี" : "เสียเงิน"}
              address={station.address}
              permission={station.permission}
              waterTemperature={station.waterTemperature}
            />
          </div>
        ))}
      </div>

      {waterStations.length === 0 && (
        <Image
          src="/images/waterStationNotFound.png"
          alt="Water station not found"
          className="mx-auto mt-10"
          width={300}
          height={300}
        />
      )}
    </div>
  );
};

export default Home;
