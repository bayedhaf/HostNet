"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HireMe() {
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
//this post to api/hire-me
    // Example API call
    // await fetch("/api/hire-me", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...formData, employerId, employeeId }),
    // });

    setTimeout(() => {
      setLoading(false);
      alert("Hire request submitted successfully!");
      setFormData({ phone: "", address: "" });
    }, 1000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-cyan-100 p-6">
      <Card className="w-full max-w-3xl bg-white/80 backdrop-blur-lg shadow-xl border border-cyan-200 hover:shadow-cyan-200/50 transition-all duration-300 rounded-2xl">
        <CardHeader className="text-center border-b border-cyan-100 pb-4">
          <CardTitle className="text-2xl font-semibold text-cyan-700">
            Fill this form to <span className="font-bold text-cyan-600">Hire</span> this person
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="overflow-x-auto rounded-lg border border-cyan-100 mb-6">
            <Table>
              <TableCaption className="text-cyan-600">
                Employer Information Overview
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-cyan-50">
                  <TableHead className="min-w-[120px] text-cyan-700">Employer Name</TableHead>
                  <TableHead className="text-cyan-700">Status</TableHead>
                  <TableHead className="text-cyan-700">Employer Address</TableHead>
                  <TableHead className="text-right text-cyan-700">Emp_ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-cyan-50 transition-colors">
                  <TableCell className="font-medium text-gray-800">Example Name</TableCell>
                  <TableCell className="text-gray-700">Full Time</TableCell>
                  <TableCell className="text-gray-700">By Agreement</TableCell>
                  <TableCell className="text-right text-gray-700">Emp233</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-semibold text-cyan-700 mb-1 block">
                Phone Number
              </label>
              <Input
                type="number"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="w-full border-cyan-200 focus-visible:ring-cyan-400"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-cyan-700 mb-1 block">
                Address
              </label>
              <Input
                type="text"
                placeholder="Write your address..."
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
                className="w-full border-cyan-200 focus-visible:ring-cyan-400"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto self-center bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md hover:shadow-cyan-300 transition-all duration-300 mt-4 rounded-xl px-6 py-2"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
