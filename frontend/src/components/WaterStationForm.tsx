"use client";
import { useState } from "react";
import TextBox from "./TextBox";
import Button from "./Button";
import Checkbox from "./Checkbox";
import TagAdder from "./TagAdder";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { grey } from "@mui/material/colors";
import Link from "next/link";

interface WaterStationFormProps {
    isEdit?: boolean;
}

export default function WaterStationForm({
    isEdit = false
}: WaterStationFormProps) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [isFree, setIsFree] = useState(true);
    const [permission, setPermission] = useState<string[]>([]);
    const [maintenanceDetails, setMaintenanceDetails] = useState("");
    const [isHot, setIsHot] = useState(false);
    const [isCold, setIsCold] = useState(false);
    const [isRoomTemperature, setIsRoomTemperature] = useState(false);

    const convertWaterTemperature = (): string[] => {
        return [
            ...(isHot ? ["hot"] : []),
            ...(isCold ? ["cold"] : []),
            ...(isRoomTemperature ? ["room temperature"] : [])
        ];
    }

    const register = () => {
        alert(name + address + latitude + longitude + convertWaterTemperature() + isFree + permission + maintenanceDetails);
    };

    const edit = () => {
        alert(name + address + latitude + longitude + convertWaterTemperature() + isFree + permission + maintenanceDetails);
    };

    return (
        <div className="flex w-full flex-col items-center justify-start gap-7 rounded-xl bg-white p-8 border border-gray-300">
            <TextBox
                setInputValue={setName}
                title="ชื่อสถานีเติมน้ำ"
                placeholder="กรุณากรอกชื่อสถานีเติมน้ำ"
            />

            <TextBox
                setInputValue={setAddress}
                title="ที่อยู่"
                placeholder="กรุณากรอกที่อยู่"
                isTextArea={true}
            />

            {/* Latitute and Longitude */}
            <div className="grid grid-cols-7 gap-8 w-full">
                <div className="flex gap-2 items-start">
                    <h6 className="text-lg font-normal text-black">ตำแหน่งในแผนที่</h6>
                    <LocationOnIcon style={{ color: grey[500] }} />
                </div>
                <div className="grid col-span-3">
                    <TextBox
                        setInputValue={setLatitude}
                        title="ละติจูด"
                        placeholder="กรุณากรอกละติจูด"
                    />
                </div>
                <div className="grid col-span-3">
                    <TextBox
                        setInputValue={setLongitude}
                        title="ลองจิจูด"
                        placeholder="กรุณากรอกลองจิจูด"
                    />
                </div>
            </div>

            {/* Water Temperature */}
            <div className="flex gap-12 w-full">
                <h6 className="text-lg font-normal text-black">อุณหภูมิของน้ำ</h6>
                <Checkbox
                    label="ร้อน"
                    value={isHot}
                    setInputValue={setIsHot}
                />
                <Checkbox
                    label="เย็น"
                    value={isCold}
                    setInputValue={setIsCold}
                />
                <Checkbox
                    label="อุณหภูมิห้อง"
                    value={isRoomTemperature}
                    setInputValue={setIsRoomTemperature}
                />
            </div>

            {/* Price */}
            <div className="flex gap-12 w-full">
                <h6 className="text-lg font-normal text-black">ราคา</h6>
                <div className="inline-flex items-center gap-2">
                    <label className="relative flex items-center cursor-pointer">
                        <input name="price" type="radio" className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all" id="free" onClick={() => setIsFree(true)} />
                        <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        </span>
                    </label>
                    <h6 className="text-lg font-normal text-black">ฟรี</h6>
                </div>
                <div className="inline-flex items-center gap-2">
                    <label className="relative flex items-center cursor-pointer">
                        <input name="price" type="radio" className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all" id="paid" onClick={() => setIsFree(false)} />
                        <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        </span>
                    </label>
                    <h6 className="text-lg font-normal text-black">มีค่าใช้จ่าย</h6>
                </div>
            </div>

            <TagAdder tags={permission} setTags={setPermission} title="ผู้ที่ได้รับอนุญาต" placeholder="กรุณากรอกผู้ที่ได้รับอนุญาต" />

            <TextBox
                setInputValue={setMaintenanceDetails}
                title="รายละเอียดการบำรุงรักษา"
                placeholder="กรุณากรอกรายละเอียดการบำรุงรักษา"
                isTextArea={true}
            />

            <div className="flex gap-4 w-full">
                <Link href="/dashboard" className="w-full">
                    <Button
                        color="gray"
                        label={isEdit ? "ยกเลิก" : "ย้อนกลับ"}
                        onClick={() => { }}
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