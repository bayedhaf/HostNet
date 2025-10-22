"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Clock, CheckCircle } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function AdminDashboard() {
  const { applications, hireRequests } = useApp();
  
  const stats = [
    { 
      title: "Total Applications", 
      value: applications.length.toString(), 
      icon: <Users className="text-cyan-600" size={28} /> 
    },
    { 
      title: "Approved Applications", 
      value: applications.filter(app => app.status === 'approved').length.toString(), 
      icon: <CheckCircle className="text-green-600" size={28} /> 
    },
    { 
      title: "Pending Applications", 
      value: applications.filter(app => app.status === 'pending').length.toString(), 
      icon: <Clock className="text-yellow-600" size={28} /> 
    },
    { 
      title: "Hire Requests", 
      value: hireRequests.length.toString(), 
      icon: <UserCheck className="text-blue-600" size={28} /> 
    },
  ];

  const recentHires = applications.slice(0, 5).map(app => ({
    name: app.name,
    phone: app.phone,
    status: app.status === 'approved' ? 'approved' : 'pending',
    address: app.location,
    date: new Date(app.createdAt).toLocaleDateString(),
    emp_id: `emp${app.id}`
  }));

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
          <CardTitle className="text-xl font-semibold text-cyan-700">Recent Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>phone</TableHead>
                <TableHead>Status</TableHead>
                 <TableHead>Address</TableHead>
                <TableHead>Date</TableHead>
                 <TableHead>Emp_Id</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentHires.map((hire, index) => (
                <TableRow key={index} className="hover:bg-cyan-50 transition">
                  <TableCell className="font-medium">{hire.name}</TableCell>
                  <TableCell>{hire.phone}</TableCell>
                  <TableCell
                    className={`font-semibold ${
                      hire.status === "full time" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {hire.status}
                  </TableCell>
                     <TableCell>{hire.address}</TableCell>
                    
                  <TableCell>{hire.date}</TableCell>
                    <TableCell>{hire.emp_id}</TableCell>
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
