'use client'
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserDashboard() {
  const [language,setLanguage]=useState('Oromo');
  const posts = [
    { job: "Hotel Waiter", definition: "Serve guests with hospitality excellence.", image: "/hot2.jpg" },
    { job: "Receptionist", definition: "Greet and assist guests upon arrival.", image: "/hot3.jpg" },
    { job: "Chef Assistant", definition: "Support chefs in kitchen operations.", image: "/hot2.jpg" },
  ];
//this get from api/application

    // Example API call
    // await fetch("/api/application", {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...formData, employerId, employeeId }),
    // });
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
           <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700"
        >
          {language === "Oromo" ? "Afaan Oromo" : "English"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-40 border border-zinc-300 dark:border-zinc-700 shadow-lg"
      >
        <DropdownMenuLabel className="text-xs text-zinc-500">
          Select Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setLanguage("Oromo")}
          className="cursor-pointer"
        >
          Afaan Oromo
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("English")}
          className="cursor-pointer"
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
     </DropdownMenu>
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
        <Input type="search" placeholder={language==="Oromo"?"Hojeeta  barbaadi...":"Search employee by ..."}  className="mb-4" />

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f, idx) => (
            <Button key={idx} variant="outline" className="rounded-full bg-cyan-100 hover:cyan-200 px-4 py-2">
              {f}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p) => (
            <Card key={p.job} className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="relative w-full h-48">
                <Image 
                  src={p.image} 
                  alt={p.job} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <h2 className="font-semibold text-lg">{p.job}</h2>
                <p className="text-cyan-600 text-sm">{p.definition}</p>
                <Button className="mt-2 w-full bg-cyan-500 text-white hover:bg-cyan-600 rounded-full">
                 <Link href="/dashboard/user-application-profile">{language==="Oromo"?"Saffisaan odeeffannoo bal'aa hojjetaa ilaali":"Quicky see employee detail informasion"} </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}