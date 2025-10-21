"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [language, setLanguage] = useState("Oromo");

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-500 text-black overflow-x-hidden">
    
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <section className="relative  mt-16 w-full flex-1 flex flex-col items-center justify-center text-center pt-[80px]">
       
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hot3.jpg')" }}
        />
       
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/40 via-black/30 to-black/60 " />

    
        <div className="absolute top-6 right-6 z-50 bg-cyan-600">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                {language === "Oromo" ? "Afaan Oromo" : "English"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage("Oromo")}>
                Afaan Oromo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("English")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

     
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-6 text-white min-h-[calc(100vh-80px)]">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
            {language === "Oromo"
              ? "Hojii keessummeessitootaa saffisaan barbaadi!"
              : "Find Hospitality Jobs Fast!"}
          </h1>
          <p className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mb-8 drop-shadow-md">
            {language === "Oromo"
              ? "Hojjettoota olaanoo industirii keessummeessitootaa wajjin wal qunnami — yoo taate tajaajilaa, ogeessa nyaataa, ykn hojjetaa mana nyaataa, StaffLink carraa siif qaba."
              : "Connect with top employers in the hospitality industry. Whether you’re a waiter, chef, or kitchen staff, StaffLink helps you find the right job fast."}
          </p>

      
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <Link href="/auth/login" className="w-full sm:w-auto">
              <Button className="w-full bg-gray-900/90 text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-200">
                {language === "Oromo" ? "Logiini" : "Login"}
              </Button>
            </Link>
            <Link href="/auth/signup" className="w-full sm:w-auto">
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-4 font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                {language === "Oromo" ? "Galmaa’i" : "Sign Up"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

 
    </div>
  );
}
