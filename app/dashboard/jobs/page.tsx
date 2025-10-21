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

export default function WaiterJobsTable() {
//get from api/application
    // Example API call
    // await fetch("/api/application", {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...formData, employerId, employeeId }),
    // });
  const waiterJobs = [
    {
      title: "Restaurant Waiter / Waitress",
      description: "Serve food and drinks, take orders, and ensure guest satisfaction.",
      type: "Full-time / Part-time",
    },
    {
      title: "Hotel Waiter",
      description: "Provide table or room service in hotel dining areas.",
      type: "Full-time",
    },
    {
      title: "Banquet Server",
      description: "Serve food and beverages during weddings or events.",
      type: "Contract / Temporary",
    },
    {
      title: "Café Attendant",
      description: "Take customer orders and serve light meals or coffee.",
      type: "Part-time",
    },
    {
      title: "Bar Waiter / Waitress",
      description: "Serve beverages and maintain tables in bars or lounges.",
      type: "Shift / Full-time",
    },
    {
      title: "Room Service Attendant",
      description: "Deliver meals to hotel rooms and ensure guest satisfaction.",
      type: "Full-time",
    },
    {
      title: "Buffet Attendant",
      description: "Assist guests and restock food at buffet stations.",
      type: "Part-time",
    },
    {
      title: "Catering Assistant",
      description: "Support event catering teams with setup and service.",
      type: "Contract",
    },
    {
      title: "Fine Dining Server",
      description: "Deliver exceptional service in high-end restaurants.",
      type: "Full-time",
    },
    {
      title: "Barista",
      description: "Prepare and serve coffee and specialty beverages.",
      type: "Part-time / Full-time",
    },
  ];

  return (
    <section className="p-6 bg-gradient-to-br from-cyan-50 to-white min-h-screen">
      <Card className="shadow-md border-cyan-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cyan-700 text-center">
            Jobs Around <span className="text-cyan-500">Waiters</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableCaption>Explore related hospitality and waiter jobs.</TableCaption>
            <TableHeader>
              <TableRow className="bg-cyan-100/40">
                <TableHead className="text-cyan-700 font-semibold">Job Title</TableHead>
                <TableHead className="text-cyan-700 font-semibold">Description</TableHead>
                <TableHead className="text-cyan-700 font-semibold text-right">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {waiterJobs.map((job, index) => (
                <TableRow key={index} className="hover:bg-cyan-50 transition">
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.description}</TableCell>
                  <TableCell className="text-right text-cyan-700 font-semibold">
                    {job.type}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end mt-6">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              View More Jobs
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
