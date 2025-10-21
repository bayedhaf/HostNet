"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard, Users,  LogOut } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Users", href: "/admin/dashboard/users", icon: <Users size={18} /> },
 
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white/90 backdrop-blur-lg border-r border-cyan-200 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-100">
          <h1 className="text-xl font-semibold text-cyan-700">Admin Panel</h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-cyan-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition"
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="mt-auto p-4 border-t border-cyan-100">
          <Button
            variant="destructive"
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white/80 backdrop-blur border-b border-cyan-100 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-cyan-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </Button>
            <h2 className="text-lg font-semibold text-cyan-700">
              Admin Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-700 font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
