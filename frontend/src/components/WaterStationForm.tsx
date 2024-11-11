"use client";
import { useEffect, useState } from "react";
import TextBox from "./TextBox";
import Button from "./Button";
import TagAdder from "./TagAdder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { WaterStationService } from "@/app/water-station/services/WaterStaionService";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import MiltiCheckbox from "./MultiCheckbox";
import { useSession } from "next-auth/react";

interface WaterStationFormProps {
  isEdit?: boolean;
  waterStationId?: string | null;
  router: AppRouterInstance;
}

export default function WaterStationForm({
  isEdit = false,
  waterStationId,
  router,
}: WaterStationFormProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isFree, setIsFree] = useState<boolean | null>(null);
  const [permission, setPermission] = useState<string[]>([]);
  const [maintenanceDetails, setMaintenanceDetails] = useState("");
  const [isHot, setIsHot] = useState(false);
  const [isCold, setIsCold] = useState(false);
  const [isRoomTemperature, setIsRoomTemperature] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchWaterStation = async () => {
      if (!waterStationId) {
        console.error("No water station id");
        return;
      }
      const response = await WaterStationService.getWaterStationById(
        session?.user.token as string,
        waterStationId,
      );
      if (response == null) {
        return;
      }
      if (response.isSuccess) {
        setName(response.message.name);
        setAddress(response.message.address);
        setLatitude(response.message.location.coordinates[1]);
        setLongitude(response.message.location.coordinates[0]);
        setIsFree(response.message.isFree);
        setPermission(response.message.permission);
        setMaintenanceDetails(response.message.maintenanceDetails);
        setIsHot(response.message.waterTemperature.includes("ร้อน"));
        setIsCold(response.message.waterTemperature.includes("เย็น"));
        setIsRoomTemperature(
          response.message.waterTemperature.includes("อุณหภูมิห้อง"),
        );
      } else {
        console.error(response.message);
      }
    };
    if (isEdit) {
      fetchWaterStation();
    }
  }, [isEdit, session?.user.token, waterStationId]);

  const convertWaterTemperature = (): string[] => {
    return [
      ...(isHot ? ["ร้อน"] : []),
      ...(isCold ? ["เย็น"] : []),
      ...(isRoomTemperature ? ["อุณหภูมิห้อง"] : []),
    ];
  };

  const register = async () => {
    const waterTemperature = convertWaterTemperature();
    if (
      !(
        name &&
        address &&
        latitude &&
        longitude &&
        waterTemperature.length &&
        permission.length &&
        maintenanceDetails &&
        isFree !== null
      )
    ) {
      alert("Please fill all required fields");
      return;
    }
    const data: { isSuccess: boolean; message: string } =
      await WaterStationService.createWaterStation(
        session?.user.token as string,
        {
          name,
          address,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          waterTemperature,
          isFree,
          permission,
          maintenanceDetails,
          owner: session?.user?._id || "",
        },
      );
    if (!data.isSuccess) {
      alert("Why??");
      return;
    }
    alert("Successfully registered");
    router.push(`/dashboard/`);
  };

  const edit = async () => {
    const waterTemperature = convertWaterTemperature();
    if (
      !(
        name &&
        address &&
        latitude &&
        longitude &&
        waterTemperature.length &&
        permission.length &&
        maintenanceDetails &&
        isFree !== null
      )
    ) {
      alert("Please fill all required fields");
      return;
    }
    if (!waterStationId) {
      return;
    }
    await WaterStationService.updateWaterStation(
      session?.user.token as string,
      waterStationId,
      {
        name,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        waterTemperature,
        isFree,
        permission,
        maintenanceDetails,
        owner: session?.user?._id || "",
      },
    );
    alert("Successfully updated");
    router.push(`/dashboard/`);
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-7 rounded-xl border border-gray-300 bg-white p-8">
      <TextBox
        setInputValue={setName}
        title="ชื่อสถานีเติมน้ำ"
        placeholder="กรุณากรอกชื่อสถานีเติมน้ำ"
        value={name}
      />

      <TextBox
        setInputValue={setAddress}
        title="ที่อยู่"
        placeholder="กรุณากรอกที่อยู่"
        isTextArea={true}
        value={address}
      />

      {/* Latitute and Longitude */}
      <div className="grid w-full grid-cols-7 gap-8">
        <div className="flex items-start gap-2">
          <h6 className="text-lg font-normal text-black">ตำแหน่งในแผนที่</h6>
          <LocationOnIcon style={{ color: grey[500] }} />
        </div>
        <div className="col-span-3 grid">
          <TextBox
            setInputValue={setLatitude}
            title="ละติจูด"
            placeholder="กรุณากรอกละติจูด"
            isNumber={true}
            numberMin={-90}
            numberMax={90}
            value={latitude}
          />
        </div>
        <div className="col-span-3 grid">
          <TextBox
            setInputValue={setLongitude}
            title="ลองจิจูด"
            placeholder="กรุณากรอกลองจิจูด"
            isNumber={true}
            numberMin={-180}
            numberMax={180}
            value={longitude}
          />
        </div>
      </div>

      {/* Water Temperature */}
      <div className="flex w-full gap-12">
        <h6 className="text-lg font-normal text-black">อุณหภูมิของน้ำ</h6>
        <MiltiCheckbox label="ร้อน" value={isHot} setInputValue={setIsHot} />
        <MiltiCheckbox label="เย็น" value={isCold} setInputValue={setIsCold} />
        <MiltiCheckbox
          label="อุณหภูมิห้อง"
          value={isRoomTemperature}
          setInputValue={setIsRoomTemperature}
        />
      </div>

      {/* Price */}
      <div className="flex w-full gap-12">
        <h6 className="text-lg font-normal text-black">ราคา</h6>
        <div className="inline-flex items-center gap-2">
          <label className="relative flex cursor-pointer items-center">
            <input
              name="price"
              type="radio"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:border-slate-400"
              id="free"
              onClick={() => setIsFree(true)}
              checked={isFree === true}
            />
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-slate-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100"></span>
          </label>
          <h6 className="text-lg font-normal text-black">ฟรี</h6>
        </div>
        <div className="inline-flex items-center gap-2">
          <label className="relative flex cursor-pointer items-center">
            <input
              name="price"
              type="radio"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:border-slate-400"
              id="paid"
              onClick={() => setIsFree(false)}
              checked={isFree === false}
            />
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-slate-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100"></span>
          </label>
          <h6 className="text-lg font-normal text-black">มีค่าใช้จ่าย</h6>
        </div>
      </div>

      <TagAdder
        tags={permission}
        setTags={setPermission}
        title="ผู้ที่ได้รับอนุญาต"
        placeholder="กรุณากรอกผู้ที่ได้รับอนุญาต"
      />

      <TextBox
        setInputValue={setMaintenanceDetails}
        title="รายละเอียดการบำรุงรักษา"
        placeholder="กรุณากรอกรายละเอียดการบำรุงรักษา"
        isTextArea={true}
        value={maintenanceDetails}
      />

      <div className="flex w-full gap-4">
        <Link href="/dashboard" className="w-full">
          <Button
            color="gray"
            label={isEdit ? "ยกเลิก" : "ย้อนกลับ"}
            onClick={() => {}}
          />
        </Link>
        <Button
          color="blue"
          label={isEdit ? "แก้ไข" : "ลงทะเบียน"}
          onClick={isEdit ? edit : register}
        />
      </div>
    </div>
  );
}
