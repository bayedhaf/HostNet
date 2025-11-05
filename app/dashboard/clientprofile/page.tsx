"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ClientProfile() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/backend/api";

  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    company: "",
    job: "",
  });

  // ✅ Fetch user data from backend
  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch(`${API_URL}/register?phone=+251900000000`);
        const data = await res.json();
        // Ensure returned data matches the expected shape before setting
        if (data && typeof data === 'object') setFormData((prev) => ({ ...prev, ...(data as Partial<typeof prev>) }));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchUserData();
  }, [API_URL]);

  // ✅ Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image upload (preview only, backend not included)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setProfileImage(event.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Toggle edit mode
  const handleEditToggle = () => setEditMode((prev) => !prev);

  // ✅ Submit updated profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/profile.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) alert("Profile updated successfully!");
      else alert(data.message || "Failed to update profile.");
      setEditMode(false);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
  <div className="min-h-screen flex flex-col items-center gap-8 p-6 bg-linear-to-br from-cyan-50 to-white">

      {/* 🟦 Top Card */}
      <Card className="w-full max-w-xl p-6 text-center shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cyan-700">
            Client Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          <div className="relative group">
            <Image
              src={profileImage}
              alt="Profile Avatar"
              width={130}
              height={130}
              className="rounded-full border-4 border-cyan-400 shadow-md cursor-pointer transition-all hover:scale-105"
              onClick={() => setPreviewImage(profileImage)}
            />
            <label className="absolute bottom-0 right-0 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full p-2 cursor-pointer shadow-md">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </label>
          </div>

          <h2 className="text-xl font-semibold text-gray-800">{formData.fullName || "Loading..."}</h2>
          <p className="text-gray-600">{formData.phone || "Fetching..."}</p>
        </CardContent>

        <CardFooter className="flex justify-center mt-4">
          <Button
            onClick={handleEditToggle}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-full transition-all"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </Button>
        </CardFooter>
      </Card>

      {/* 🟩 Bottom Section */}
      <div className={`w-full max-w-5xl transition-all duration-500 grid ${editMode ? "grid-cols-1 md:grid-cols-2 gap-6" : "grid-cols-1"}`}>

        {/* ✅ Left Card — Personal Info */}
        <motion.div layout>
          <Card className="p-6 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm w-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-cyan-700">
                Personal Information
              </CardTitle>
            </CardHeader>

            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`grid ${editMode ? "grid-cols-1" : "grid-cols-2"} gap-4 text-gray-700`}
              >
                <div>
                  <p><span className="font-semibold">Full Name:</span> {formData.fullName}</p>
                  <p><span className="font-semibold">Phone:</span> {formData.phone}</p>
                  <p><span className="font-semibold">Address:</span> {formData.address}</p>
                </div>
                {!editMode && (
                  <div>
                    <p><span className="font-semibold">Company:</span> {formData.company}</p>
                    <p><span className="font-semibold">Job:</span> {formData.job}</p>
                  </div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ✅ Right Card — Edit Form */}
        <AnimatePresence>
          {editMode && (
            <motion.div
              key="editForm"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm w-full">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-cyan-700">
                    Edit Profile
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
                    <Input placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                    <Input placeholder="Address" name="address" value={formData.address} onChange={handleChange} />
                    <Input placeholder="Company" name="company" value={formData.company} onChange={handleChange} />
                    <Input placeholder="Job" name="job" value={formData.job} onChange={handleChange} />
                    <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-full">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🖼️ Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setPreviewImage(null)}
          >
            <motion.img
              src={previewImage}
              alt="Preview"
              className="max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
