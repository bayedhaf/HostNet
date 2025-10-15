"use client";

import Link from "next/link";
import React, { useState } from "react";
import { MdLineWeight } from "react-icons/md";
import { Button } from "../ui/button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Find Job", href: "#" },
    { name: "Find Staff", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Services", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
  ];

  return (
    <nav className="bg-white shadow px-4 sm:px-6 lg:px-8 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 h-16">
        
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold text-green-600">
            HostNet
          </Link>
        </div>

    
        <div className="hidden sm:flex sm:items-center sm:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-2 ml-4">
            <Link href="/auth/login" passHref>
              <Button
                variant="outline"
                className="border-gray-400 text-gray-800 bg-green-100 hover:bg-green-200 hover:text-green-700 transition"
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
        </div>

      
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <MdLineWeight className="text-2xl text-gray-700" />
          </button>
        </div>
      </div>

 
      {menuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full max-h-[80vh] overflow-y-auto mt-2 px-2 pb-4 space-y-2 bg-white shadow-lg rounded-md z-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-gray-700 hover:text-green-600 font-medium transition px-4 py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col gap-2 mt-2 px-4">
            <Link href="/auth/login" passHref>
              <Button
                variant="outline"
                className="border-gray-400 text-gray-800 bg-green-100 hover:bg-green-200 hover:text-green-700 transition w-full"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/signup" passHref>
              <Button className="bg-green-500 text-white hover:bg-green-600 transition w-full">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
