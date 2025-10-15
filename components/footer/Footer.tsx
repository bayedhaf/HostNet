"use client"

import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 text-center py-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold text-gray-800">HostNet</span>. All rights reserved.
        </p>

    
        <div className="flex gap-4 text-sm">
          <Link href="#" className="hover:text-green-600 transition">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-green-600 transition">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-green-600 transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
