"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Application {
  id: number | string;
  name: string;
  about: string;
  status: "approved" | "rejected" | "pending" | string;
}

export default function WaiterJobsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/c/fa6c-5a29-4ac1-a859"); ///api/application production API endpoint
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data: Application[] = await res.json();
        setApplications(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An error occurred while fetching applications";
        console.error(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <section className="p-6 bg-linear-to-br from-cyan-50 to-white min-h-screen">
      <Card className="shadow-md border-cyan-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cyan-700 text-center">
            Job <span className="text-cyan-500">Applications</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <p className="text-red-600 text-center mb-4">{error}</p>
          )}

          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading applications...</p>
          ) : (
            <Table>
              <TableCaption>View all job applications and their status.</TableCaption>
              <TableHeader>
                <TableRow className="bg-cyan-100/40">
                  <TableHead className="text-cyan-700 font-semibold">Applicant Name</TableHead>
                  <TableHead className="text-cyan-700 font-semibold">About</TableHead>
                  <TableHead className="text-cyan-700 font-semibold text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <TableRow key={app.id} className="hover:bg-cyan-50 transition">
                      <TableCell className="font-medium">{app.name}</TableCell>
                      <TableCell>{app.about}</TableCell>
                      <TableCell className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          app.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {app.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                      No applications found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          <div className="flex justify-end mt-6">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              View All Applications
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
