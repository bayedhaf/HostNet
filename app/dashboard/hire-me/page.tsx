"use client";

import React, { useState, Suspense } from "react";
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
import { useApp } from "@/lib/context/AppContext";
import { useRouter, useSearchParams } from "next/navigation";

function HireMeContent() {
  const { addHireRequest, user, applications, language } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeIdParam = searchParams.get('id');
  const employee = applications.find(a => a.id === Number(employeeIdParam)) || null;
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.phone || !formData.address) {
      setError("Phone number and address are required");
      setLoading(false);
      return;
    }

    try {
      if (!employee) {
        setError("Employee not found");
        setLoading(false);
        return;
      }

      // Add hire request to context (first fetch employee by id, then post)
      addHireRequest({
        employerName: user?.name || "Unknown Employer",
        employerPhone: formData.phone,
        employerAddress: formData.address,
        employeeId: employee.id,
        employeeName: employee.name,
        status: "pending"
      });

      alert("Hire request submitted successfully!");
      setFormData({ phone: "", address: "" });
      router.push("/dashboard");

    } catch {
      setError("An error occurred while submitting the request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-cyan-100 p-6">
      <Card className="w-full max-w-3xl bg-white/80 backdrop-blur-lg shadow-xl border border-cyan-200 hover:shadow-cyan-200/50 transition-all duration-300 rounded-2xl">
        <CardHeader className="text-center border-b border-cyan-100 pb-4">
          <CardTitle className="text-2xl font-semibold text-cyan-700">
            {language === "Oromo" 
              ? "Foormii kana guutuu namicha kana hojjechisuuf" 
              : "Fill this form to"
            } <span className="font-bold text-cyan-600">
              {language === "Oromo" ? "Hojjechisi" : "Hire"}
            </span> {language === "Oromo" ? "namicha kana" : "this person"}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
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
                  <TableCell className="font-medium text-gray-800">{employee?.name || "Unknown"}</TableCell>
                  <TableCell className="text-gray-700">{employee ? (employee.status === 'approved' ? 'Approved' : 'Pending') : '-'}</TableCell>
                  <TableCell className="text-gray-700">{employee?.location || '-'}</TableCell>
                  <TableCell className="text-right text-gray-700">Emp{employee?.id ?? '-'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-semibold text-cyan-700 mb-1 block">
                {language === "Oromo" ? "Lakkobsa Bilbila" : "Phone Number"}
              </label>
              <Input
                type="number"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                disabled={loading}
                className="w-full border-cyan-200 focus-visible:ring-cyan-400"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-cyan-700 mb-1 block">
                {language === "Oromo" ? "Iddoo" : "Address"}
              </label>
              <Input
                type="text"
                placeholder="Write your address..."
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
                disabled={loading}
                className="w-full border-cyan-200 focus-visible:ring-cyan-400"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto self-center bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md hover:shadow-cyan-300 transition-all duration-300 mt-4 rounded-xl px-6 py-2"
            >
              {loading 
                ? (language === "Oromo" ? "Dhiyeessaa jira..." : "Submitting...") 
                : (language === "Oromo" ? "Dhiyeessi" : "Submit")
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default function HireMe() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HireMeContent />
    </Suspense>
  );
}
