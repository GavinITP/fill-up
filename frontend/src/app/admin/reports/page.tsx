"use client";

import { adminService } from "@/api/admin-service";
import ReportCard, { ReportCardProps } from "@/components/admin/ReportCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const token = session?.user.token;
  const [reports, setReports] = useState<ReportCardProps[]>([]);

  const fetchReports = async () => {
    try {
      if (!token) {
        throw new Error("No token found");
      }
      const response = await adminService.getReports(token);
      setReports(response.reports || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-start gap-20 px-36 py-16">
      <h1 className="text-lightblue-900 text-3xl font-bold">
        จัดการคำร้องเรียน
      </h1>
      <div className="grid w-full grid-cols-1 gap-12">
        {reports.map((report, index) => (
          !report.completed && <ReportCard key={index} {...report} />
        ))}
      </div>
    </div>
  );
}
