"use client";

import React from "react";
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
import { useApp } from "@/lib/context/AppContext";

export default function WaiterJobsTable() {
  const { applications } = useApp();
  // Removed unused waiterJobs array

  return (
    <section className="p-6 bg-gradient-to-br from-cyan-50 to-white min-h-screen">
      <Card className="shadow-md border-cyan-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cyan-700 text-center">
            Job <span className="text-cyan-500">Applications</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
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
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
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
