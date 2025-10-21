"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function UserData() {
  const [hireData, setHireData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Example fetch data from backend
  useEffect(() => {
    fetchHireData();
  }, []);

  const fetchHireData = async () => {
    try {
      setLoading(true);
      // Replace with your backend API
      // const res = await fetch("/api/hire-me");
      // const data = await res.json();
      // setHireData(data);

      // Mock data for demo
      setTimeout(() => {
        setHireData([
          {
            _id: "EMP233",
            employerName: "John Doe",
            status: "Full Time",
            address: "Adama, Ethiopia",
            empId: "EMP233",
            hirePhone: "0912345678",
            hireAddress: "Adama, near ASTU",
          },
          {
            _id: "EMP102",
            employerName: "Marta Kebede",
            status: "Part Time",
            address: "Addis Ababa",
            empId: "EMP102",
            hirePhone: "0909876543",
            hireAddress: "Addis Ababa, Bole",
          },
        ]);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    setDeletingId(id);
    try {
      // Replace with your real backend DELETE endpoint
      // await fetch(`/api/hire-me/${id}`, {
      //   method: "DELETE",
      //   headers: { "Content-Type": "application/json" },
      // });

      // Simulate delete
      setTimeout(() => {
        setHireData((prev) => prev.filter((item) => item._id !== id));
        setDeletingId(null);
        alert("Record deleted successfully!");
      }, 600);
    } catch (error) {
      console.error("Delete failed:", error);
      setDeletingId(null);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-100 p-6 md:p-10 flex justify-center">
      <Card className="w-full max-w-6xl bg-white/80 backdrop-blur-lg border border-cyan-200 shadow-md hover:shadow-cyan-200/50 transition-all duration-300 rounded-2xl">
        <CardHeader className="border-b border-cyan-100 pb-4">
          <CardTitle className="text-center text-2xl font-semibold text-cyan-700">
            Admin Dashboard
          </CardTitle>
          <p className="text-center text-sm text-cyan-600">
            Manage all hire requests below
          </p>
        </CardHeader>

        <CardContent className="pt-6 overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading data...</p>
          ) : hireData.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No hiring records found.
            </p>
          ) : (
            <Table className="min-w-full border border-cyan-100 rounded-lg">
              <TableCaption className="text-cyan-600 font-medium">
                Recent Hiring Requests
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-cyan-50">
                  <TableHead className="text-cyan-700 font-semibold">
                    Employer Name
                  </TableHead>
                  <TableHead className="text-cyan-700 font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-cyan-700 font-semibold">
                    Employer Address
                  </TableHead>
                  <TableHead className="text-right text-cyan-700 font-semibold">
                    Emp_ID
                  </TableHead>
                  <TableHead className="text-right text-cyan-700 font-semibold">
                    Hire Phone
                  </TableHead>
                  <TableHead className="text-right text-cyan-700 font-semibold">
                    Hire Address
                  </TableHead>
                  <TableHead className="text-right text-cyan-700 font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {hireData.map((item) => (
                  <TableRow
                    key={item._id}
                    className="hover:bg-cyan-50/70 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-800">
                      {item.employerName}
                    </TableCell>
                    <TableCell className="text-gray-700">{item.status}</TableCell>
                    <TableCell className="text-gray-700">{item.address}</TableCell>
                    <TableCell className="text-right text-gray-700">
                      {item.empId}
                    </TableCell>
                    <TableCell className="text-right text-gray-700">
                      {item.hirePhone}
                    </TableCell>
                    <TableCell className="text-right text-gray-700">
                      {item.hireAddress}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                      >
                        {deletingId === item._id ? "Deleting..." : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
