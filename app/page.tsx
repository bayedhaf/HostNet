"use client"

import React, { useState } from "react"
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Home() {
  const [language, setLanguage] = useState("Oromo")

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-50 text-black overflow-x-hidden">
      <Card className="w-full flex flex-col bg-white rounded-none shadow-none">
        
      
        <CardHeader className="bg-zinc-200 flex justify-between p-4 items-center text-black  z-50 border-b border-gray-300 sticky top-0">
          <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
          
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm hover:bg-zinc-300">
                  {language === "Oromo" ? "Afaan Oromo" : "English"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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

         
          

            <Navbar />
          </div>
        </CardHeader>

       
        <CardContent className="relative w-full flex-1 flex flex-col items-center justify-center text-center p-0">
      
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hot3.jpg')" }}
          />

        
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

          
          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4 text-white min-h-[calc(100vh-80px-64px)]">
            
           
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
              {language === "Oromo"
                ? "Hojii keessummeessitootaa saffisaan barbaadi!"
                : "Find Hospitality Jobs Fast!"}
            </h1>

         
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-8 drop-shadow-md">
              {language === "Oromo"
                ? "Hojjettoota olaanoo industirii keessummeessitootaa wajjin wal qunnami — yoo taate tajaajilaa, ogeessa nyaataa, ykn hojjetaa mana nyaataa, StaffLink carraa siif qaba."
                : "Connect with top employers in the hospitality industry. Whether you’re a waiter, chef, or kitchen staff, StaffLink helps you find the right job fast."}
            </p>

           
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
              <Link href="/auth/login" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 text-white shadow-xl border-0 text-base px-8 py-4 font-semibold transform hover:scale-105 transition-all duration-200"
                >
                  {language === "Oromo" ? "Logiini" : "Login"}
                </Button>
              </Link>
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl border-0 text-base px-8 py-4 font-semibold transform hover:scale-105 transition-all duration-200"
                >
                  {language === "Oromo" ? "Galmaa’i" : "Sign Up"}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>

      
        <CardFooter className="bg-gray-100 p-4 flex justify-center items-center border-t border-gray-200 flex-shrink-0">
          <Footer />
        </CardFooter>
      </Card>
    </div>
  )
}
