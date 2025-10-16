"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  MdMenu,
  MdClose,
  MdDashboard,
  MdWork,
  MdPeople,
  MdMessage,
  MdSettings,
  MdLogout,
  MdAddCircle,
} from "react-icons/md";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function SideBar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "#", icon: <MdDashboard className="text-xl" /> },
    { name: "Jobs", href: "#", icon: <MdWork className="text-xl" /> },
    { name: "Applicants", href: "#", icon: <MdPeople className="text-xl" /> },
    { name: "Messages", href: "#", icon: <MdMessage className="text-xl" /> },
    { name: "Settings", href: "#", icon: <MdSettings className="text-xl" /> },
  ];

  // During SSR, render a simplified version without interactive state
  if (!mounted) {
    return (
      <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <MdMenu className="text-2xl" />
        </button>
      </div>
    );
  }

  return (
    <>
      
      <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {open ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
        </button>
      </div>

    
      <div
        className={`
          fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-gray-800 shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-none
        `}
      >
        <div className="flex flex-col justify-between h-full overflow-y-auto">
       
          <div>
            <div className="flex flex-col items-center py-6 border-b border-gray-200 dark:border-gray-700">
              <Avatar className="h-16 w-16 mb-2">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>NC</AvatarFallback>
              </Avatar>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Name</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
            </div>

            <nav className="flex flex-col gap-2 mt-6 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-cyan-50 dark:hover:bg-gray-700 hover:text-cyan-600 transition"
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

         
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-2">
            <Link href="/posts">
              <Button className="w-full bg-cyan-500 text-white hover:bg-cyan-600 flex items-center justify-center gap-2">
                <MdAddCircle className="text-lg" />
                Post a Job
              </Button>
            </Link>

            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-gray-300 text-white bg-red-500 dark:text-gray-100 hover:bg-red-600 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
              >
                <MdLogout className="text-lg" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>

  
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}