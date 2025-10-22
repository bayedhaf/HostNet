'use client'
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
// Removed unused dropdown menu imports
import { useApp } from "@/lib/context/AppContext";

export default function UserDashboard() {
  const { language, applications } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All works");

  // Removed unused posts array

  // Filter applications based on search and filter
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "All works" || 
                         app.about.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });
  const filters = [
    "Hotel Waiter",
    "Cafe waiter",
    "Restaunt waiter",
    "Kitchen",
    "All works",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <Link href="/">
          <p className="text-xl font-bold text-cyan-500 sm:float-end">HostNet</p>
        </Link>
        <Link href="/posts" className="w-full sm:w-auto hidden sm:block">
          <Button className="w-full bg-cyan-500 text-white hover:bg-cyan-600 flex items-center justify-center gap-2">
            <MdAddCircle className="text-lg" />
            Post a Job
          </Button>
        </Link>
      </div>

      <Card className="flex-1 overflow-y-auto max-h-[80vh] shadow-lg rounded-3xl border border-gray-200 dark:border-gray-700 p-4">
        <CardTitle className="text-2xl font-bold mb-4">
           {language==="Oromo"?"Hojii Keessummeessituu Itti Aanu Barbaadi":"Find Your Next Hospitality Job"} 
              </CardTitle>
        <Input 
          type="search" 
          placeholder={language==="Oromo"?"Hojeeta  barbaadi...":"Search employee by ..."}  
          className="mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f, idx) => (
            <Button 
              key={idx} 
              variant={selectedFilter === f ? "default" : "outline"} 
              className={`rounded-full px-4 py-2 ${
                selectedFilter === f 
                  ? "bg-cyan-500 text-white" 
                  : "bg-cyan-100 hover:bg-cyan-200"
              }`}
              onClick={() => setSelectedFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <Card key={app.id} className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition">
                <div className="relative w-full h-48">
                  <Image 
                    src={app.images[0] || "/hot2.jpg"} 
                    alt={app.name} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <h2 className="font-semibold text-lg">{app.name}</h2>
                  <p className="text-cyan-600 text-sm">{app.location}</p>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">{app.about}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      app.status === 'approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </span>
                    <Button className="bg-cyan-500 text-white hover:bg-cyan-600 rounded-full text-xs px-3 py-1">
                      <Link href={`/dashboard/user-application-profile?id=${app.id}`}>
                        {language==="Oromo"?"Ilaali":"View Details"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              {language === "Oromo" ? "Hojjettota hin argamne" : "No employees found"}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}