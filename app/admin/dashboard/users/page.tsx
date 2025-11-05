'use client';

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

interface HireItem {
  id: string;
  name: string;
  phone: string;
  address: string;
  status: string;
  date: string;
  emp_id: string;
}

export default function UserData() {
  const [hireData, setHireData] = useState<HireItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  // Fetch data from API
  useEffect(() => {
    fetchHireData();
  }, []);

  const fetchHireData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://dummyjson.com/c/06ad-f5e2-46b6-b0f4/api/hire-me"); ///api/hire-me <-- Replace with production endpoint
      if (!res.ok) throw new Error("Failed to fetch hire data");

      const data: HireItem[] = await res.json();
      setHireData(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching hire requests.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a record
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/hire-me/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Delete failed");

      setHireData((prev) => prev.filter((item) => item.id !== id));
      alert("Record deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete the record.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-cyan-50 via-white to-cyan-100 p-6 md:p-10 flex justify-center">
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
          ) : error ? (
            <p className="text-center text-red-600 py-10">{error}</p>
          ) : hireData.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No hiring records found.</p>
          ) : (
            <Table className="min-w-full border border-cyan-100 rounded-lg">
              <TableCaption className="text-cyan-600 font-medium">
                Recent Hiring Requests
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-cyan-50">
                  <TableHead className="text-cyan-700 font-semibold">Employer Name</TableHead>
                  <TableHead className="text-cyan-700 font-semibold">Status</TableHead>
                  <TableHead className="text-cyan-700 font-semibold">Employer Address</TableHead>
                  <TableHead className="text-right text-cyan-700 font-semibold">Emp_ID</TableHead>
                  <TableHead className="text-right text-cyan-700 font-semibold">Hire Phone</TableHead>
                  <TableHead className="text-right text-cyan-700 font-semibold">Hire Date</TableHead>
                  <TableHead className="text-right text-cyan-700 font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {hireData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-cyan-50/70 transition-colors">
                    <TableCell className="font-medium text-gray-800">{item.name}</TableCell>
                    <TableCell className="text-gray-700">{item.status}</TableCell>
                    <TableCell className="text-gray-700">{item.address}</TableCell>
                    <TableCell className="text-right text-gray-700">{item.emp_id}</TableCell>
                    <TableCell className="text-right text-gray-700">{item.phone}</TableCell>
                    <TableCell className="text-right text-gray-700">{item.date}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                      >
                        {deletingId === item.id ? "Deleting..." : "Delete"}
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
