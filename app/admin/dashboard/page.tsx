"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Employers", value: "124", icon: <Users className="text-cyan-600" size={28} /> },
  
  ];
  //from get from back end api/application

    // Example API call
    // await fetch("/api/application", {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...formData, employerId, employeeId }),
    // });

  const recentHires = [
    { name: "Bayisa Balcha", position: "Web Developer", status: "Hired", date: "Oct 15, 2025" },
    { name: "Sami Teshome", position: "Graphic Designer", status: "Pending", date: "Oct 14, 2025" },
    { name: "Muna Daba", position: "Waitress", status: "Hired", date: "Oct 13, 2025" },
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-cyan-50 to-white min-h-screen rounded-xl">
      {/* Header */}
      <h1 className="text-3xl font-bold text-cyan-700 mb-4 text-center md:text-left">
        Admin Dashboard
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-cyan-100">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-700">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-cyan-700">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Hires Table */}
      <Card className="shadow-md border-cyan-100">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-cyan-700">Recent Hires</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentHires.map((hire, index) => (
                <TableRow key={index} className="hover:bg-cyan-50 transition">
                  <TableCell className="font-medium">{hire.name}</TableCell>
                  <TableCell>{hire.position}</TableCell>
                  <TableCell
                    className={`font-semibold ${
                      hire.status === "Hired" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {hire.status}
                  </TableCell>
                  <TableCell>{hire.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end mt-4">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">View All</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
