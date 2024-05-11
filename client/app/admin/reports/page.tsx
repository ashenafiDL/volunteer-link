"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import { formatDate } from "date-fns";
import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [reports, setReports] = useState<Array<any>>();
  const [stats, setStats] = useState<any>();
  const { addAlert, dismissAlert } = useAlertsContext();

  const resolveReport = async (id: string) => {
    try {
      const res = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reports/${id}/resolve`,
      );

      if (res.status === 201) {
        const id = addAlert({
          message: "Successful resolved a report",
          severity: "success",
        });
        setTimeout(() => {
          dismissAlert(id);
        }, 3000);

        fetchData();
        fetchStats();
      }
    } catch (error: any) {
      const id = addAlert({
        message: error?.response?.data?.message || "Failed to resolve a report",
        severity: "error",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    }
  };

  const fetchData = async () => {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/reports`,
    );

    if (res.status === 200) {
      setReports(res.data);
    }
  };

  const fetchStats = async () => {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/stats/reportStat`,
    );

    if (res.status === 200) {
      setStats(res.data);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStats();
  }, []);

  return (
    <div className="space-y-3 overflow-x-auto">
      <div className="card-title">Reports</div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
        <div className="card card-compact rounded-md bg-gradient-to-tl from-info/50 to-info/25 duration-300 hover:scale-[0.98]">
          <div className="card-body">
            <span className="font-bold">Fake</span>
            <span>{`${stats && stats.fake.active} active, ${stats && stats.fake.resolved} resolved`}</span>
          </div>
        </div>
        <div className="card card-compact rounded-md bg-gradient-to-tl from-info/50 to-info/25 duration-300 hover:scale-[0.98]">
          <div className="card-body">
            <span className="font-bold">Scam</span>
            <span>{`${stats && stats.scam.active} active, ${stats && stats.scam.resolved} resolved`}</span>
          </div>
        </div>
        <div className="card card-compact rounded-md bg-gradient-to-tl from-info/50 to-info/25 duration-300 hover:scale-[0.98]">
          <div className="card-body">
            <span className="font-bold">Inappropriate content</span>
            <span>{`${stats && stats.inappropriate_content.active} active, ${stats && stats.inappropriate_content.resolved} resolved`}</span>
          </div>
        </div>
        <div className="card card-compact rounded-md bg-gradient-to-tl from-info/50 to-info/25 duration-300 hover:scale-[0.98]">
          <div className="card-body">
            <span className="font-bold">Spam</span>
            <span>{`${stats && stats.spam.active} active, ${stats && stats.spam.resolved} resolved`}</span>
          </div>
        </div>
        <div className="card card-compact rounded-md bg-gradient-to-tl from-info/50 to-info/25 duration-300 hover:scale-[0.98]">
          <div className="card-body">
            <span className="font-bold">Impersonation</span>
            <span>{`${stats && stats.impersonation.active} active, ${stats && stats.impersonation.resolved} resolved`}</span>
          </div>
        </div>
        <div className="card card-compact rounded-md bg-gradient-to-tl from-info/50 to-info/25 duration-300 hover:scale-[0.98]">
          <div className="card-body">
            <span className="font-bold">Privacy Violation</span>
            <span>{`${stats && stats.privacy.active} active, ${stats && stats.privacy.resolved} resolved`}</span>
          </div>
        </div>
        <div className="card card-compact rounded-md bg-gradient-to-tl from-info/50 to-info/25 duration-300 hover:scale-[0.98]">
          <div className="card-body">
            <span className="font-bold">Other</span>
            <span>{`${stats && stats.other.active} active, ${stats && stats.other.resolved} resolved`}</span>
          </div>
        </div>
      </div>

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Reporter</th>
            <th>Content Type</th>
            <th>Content Id</th>
            <th>Reason</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reports && reports.length >= 0 && (
            <>
              {reports.map((report, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{`${report.reporter.firstName} ${report.reporter.lastName}`}</td>
                    <td>{report.contentType}</td>
                    <td>{report.contentId}</td>
                    <td>{report.reason}</td>
                    <td>{report.description}</td>
                    <td>
                      {report.status === "RESOLVED" ? (
                        <div className="badge badge-success">Resolved</div>
                      ) : (
                        <button
                          className="btn btn-sm"
                          onClick={() => {
                            resolveReport(report.id);
                          }}
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                    <td>{formatDate(report.createdAt, "MMM dd, yyyy")}</td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
