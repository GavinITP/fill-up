import Image from "next/image";

const CardWithImageHeader = () => {
  return (
    <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-[1.02]">
      <Image
        className="h-40 w-full object-cover"
        src="/images/default.png"
        alt="Default card image"
        width={300}
        height={300}
      />

      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
              เย็น
            </span>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
              ปกติ
            </span>
            <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
              ร้อน
            </span>
          </div>

          <p className="text-xs text-[#2196F3]">ฟรี</p>
        </div>

        <div>
          <h2 className="mt-2 text-2xl font-semibold">Station Name</h2>
          <p className="mt-2 truncate text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, aut.
          </p>
        </div>

        <div className="mt-4">
          <p className="block text-xs text-gray-500">
            สำหรับ:{" "}
            <span className="rounded-full bg-gray-200 px-2 py-1 text-black">
              ทุกคน
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardWithImageHeader;
