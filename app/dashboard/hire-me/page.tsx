"use client";

import React, { useState, useEffect, Suspense } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";

function HireMeContent() {
  const { language, user } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeIdParam = searchParams.get("id");

  type Application = {
    id: number;
    name: string;
    status: string;
    location: string;
  };

  const [employee, setEmployee] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ phone: "", address: "" });

  // Fetch employee data and prefill phone number
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const [resApplications, resUser] = await Promise.all([
          fetch("/api/application"),
          fetch(`/api/register/${user?.id}`) // Fetch logged-in user data
        ]);

        const applicationsData: Application[] = await resApplications.json();
        const employeeData = applicationsData.find(
          (a: Application) => a.id === Number(employeeIdParam)
        );
        if (!employeeData) {
          setError(language === "Oromo" ? "Namichi hin argamne" : "Employee not found");
          setEmployee(null);
        } else {
          setEmployee(employeeData);
        }

        const userData = await resUser.json();
        if (userData?.phone) {
          setFormData((prev) => ({ ...prev, phone: userData.phone })); // Prefill phone
        }
      } catch {
        setError(language === "Oromo" ? "Dogoggora jira" : "Error fetching data");
      }
    };

    fetchEmployee();
  }, [employeeIdParam, user?.id, language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.phone || !formData.address) {
      setError(language === "Oromo" ? "Lakkobsa bilbila fi iddoo barbaachisa" : "Phone number and address are required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/hire-me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employerName: user?.name || "Unknown Employer",
          employerPhone: formData.phone,
          employerAddress: formData.address,
          employeeId: employee?.id,
          employeeName: employee?.name,
          status: "pending",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      alert(language === "Oromo" ? "Gaaffiin hojii ergameera!" : "Hire request submitted!");
      setFormData({ phone: "", address: "" });
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : (language === "Oromo" ? "Dogoggora jira" : "An error occurred");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-cyan-50 via-white to-cyan-100 p-6">
      <Card className="w-full max-w-3xl bg-white/80 backdrop-blur-lg shadow-xl border border-cyan-200 hover:shadow-cyan-200/50 transition-all duration-300 rounded-2xl">
        <CardHeader className="text-center border-b border-cyan-100 pb-4">
          <CardTitle className="text-2xl font-semibold text-cyan-700">
            {language === "Oromo"
              ? "Foormii kana guutuu namicha kana hojjechisuuf"
              : "Fill this form to"}{" "}
            <span className="font-bold text-cyan-600">
              {language === "Oromo" ? "Hojjechisi" : "Hire"}
            </span>{" "}
            {language === "Oromo" ? "namicha kana" : "this person"}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {employee && (
            <div className="overflow-x-auto rounded-lg border border-cyan-100 mb-6">
              <Table>
                <TableCaption className="text-cyan-600">
                  {language === "Oromo" ? "Dhaabbilee Hojii" : "Employee Information Overview"}
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-cyan-50">
                    <TableHead className="min-w-[120px] text-cyan-700">
                      {language === "Oromo" ? "Maqaa Hojjetaa" : "Employee Name"}
                    </TableHead>
                    <TableHead className="text-cyan-700">{language === "Oromo" ? "Haala" : "Status"}</TableHead>
                    <TableHead className="text-cyan-700">{language === "Oromo" ? "Iddoo" : "Location"}</TableHead>
                    <TableHead className="text-right text-cyan-700">Emp_ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-cyan-50 transition-colors">
                    <TableCell className="font-medium text-gray-800">{employee.name}</TableCell>
                    <TableCell className="text-gray-700">{employee.status === "approved" ? "Approved" : "Pending"}</TableCell>
                    <TableCell className="text-gray-700">{employee.location}</TableCell>
                    <TableCell className="text-right text-gray-700">Emp{employee.id}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-semibold text-cyan-700 mb-1 block">
                {language === "Oromo" ? "Lakkobsa Bilbila" : "Phone Number"}
              </label>
              <Input
                type="number"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                disabled={loading}
                className="w-full border-cyan-200 focus-visible:ring-cyan-400"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !employee}
              className="w-full sm:w-auto self-center bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md hover:shadow-cyan-300 transition-all duration-300 mt-4 rounded-xl px-6 py-2"
            >
              {loading
                ? language === "Oromo"
                  ? "Dhiyeessaa jira..."
                  : "Submitting..."
                : language === "Oromo"
                ? "Dhiyeessi"
                : "Submit"}
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
