"use client";

import { adminService } from "@/api/admin";
import UserCard, { UserCardProps } from "@/components/admin/UserCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const token = session?.user.token;
  const [newOwners, setNewOwners] = useState<UserCardProps[]>([]);

  const fetchOwnerRequests = async () => {
    try {
      if (!token) {
        throw new Error("No token found");
      }
      const response = await adminService.getOwnerRequests(token);
      setNewOwners(response.owners || []);
    } catch (error) {
      console.error("Error fetching new owners:", error);
    }
  };

  useEffect(() => {
    fetchOwnerRequests();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-start gap-20 px-36 py-16">
      <h1 className="text-lightblue-900 text-3xl font-bold">
        รับรองเจ้าของสถานีเติมน้ำ
      </h1>
      <div className="grid w-full grid-cols-1 gap-12 xl:grid-cols-2">
        {newOwners.map((user, index) => (
          <UserCard key={index} {...user} />
        ))}
      </div>
    </div>
  );
}
