"use client"

import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center sm:justify-end gap-4 text-sm sm:text-base">

      <Link href="#" className="text-gray-700 hover:text-green-600 font-medium transition">
        Find Job
      </Link>
      <Link href="#" className="text-gray-700 hover:text-green-600 font-medium transition">
        Find Staff
      </Link>
      <Link href="#" className="text-gray-700 hover:text-green-600 font-medium transition">
        About Us
      </Link>

   
      <div className="flex items-center gap-2">
        <Link href="/auth/login" passHref>
          <Button 
            variant="outline" 
            className="border-gray-400 text-gray-800 bg-green-100 hover:bg-green-200 hover:text-green transition"
          >
            Login
          </Button>
        </Link>

        <Link href="/auth/signup" passHref>
          <Button className="bg-green-500 text-white hover:bg-green-600 transition">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  )
}
