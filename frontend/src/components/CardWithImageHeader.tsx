import Image from "next/image";

const CardWithImageHeader = ({
  name,
  isFree,
  address,
  waterTemperature,
  permission,
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-[1.02]">
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
            {waterTemperature.map((temp) => (
              <span
                key={Math.random()}
                className={`rounded-full ${temp === "เย็น" ? "bg-blue-100" : temp === "ร้อน" ? "bg-red-100" : "bg-green-100"} px-2 py-1 text-xs ${temp === "เย็น" ? "text-blue-500" : temp === "ร้อน" ? "text-red-500" : "text-green-500"}`}
              >
                {temp}
              </span>
            ))}
          </div>

          <p className="text-xs text-[#2196F3]">{isFree}</p>
        </div>

        <div>
          <h2 className="mt-2 text-2xl font-semibold">{name}</h2>
          <p className="mt-2 truncate text-sm text-gray-500">{address}</p>
        </div>

        <div className="mt-4">
          <p className="block text-xs text-gray-500">
            สำหรับ:{" "}
            <span className="rounded-full bg-gray-200 px-2 py-1 text-black">
              {permission}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardWithImageHeader;
