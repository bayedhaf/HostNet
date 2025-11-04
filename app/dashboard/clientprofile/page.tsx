"use client";

import React, { useState } from "react";
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

  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    phone: "+251 900 000 000",
    address: "",
    company: "",
    job: "",
  });

  const [editMode, setEditMode] = useState(false);

 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleEditToggle = () => setEditMode((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
  };

  return (
    <div className="min-h-screen  flex justify-center items-center p-4">
      <Card className="w-full max-w-2xl p-6 shadow-xl rounded-2xl bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-cyan-800">
            Client Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
        
          <div className="relative group">
            <Image
              src={profileImage}
              alt="Profile Avatar"
              width={120}
              height={120}
              className="rounded-full border-4 border-cyan-400 shadow-md cursor-pointer transition-all hover:scale-105"
              onClick={() => setPreviewImage(profileImage)}
            />
            
            <label className="absolute bottom-0 right-0 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full p-2 cursor-pointer shadow-md">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </label>
          </div>

          {/* Profile info display */}
          {!editMode && (
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {formData.fullName}
              </h2>
              <p className="text-gray-700">{formData.phone}</p>
              {formData.address && (
                <p className="text-gray-600">Address: {formData.address}</p>
              )}
              {formData.company && (
                <p className="text-gray-600">Company: {formData.company}</p>
              )}
              {formData.job && (
                <p className="text-gray-600">Job: {formData.job}</p>
              )}
            </div>
          )}

      
          <AnimatePresence>
            {editMode && (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full space-y-4"
              >
                <Input
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border-cyan-300 focus:ring-cyan-400"
                />
                <Input
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-cyan-300 focus:ring-cyan-400"
                />
                <Input
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border-cyan-300 focus:ring-cyan-400"
                />
                <Input
                  placeholder="Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="border-cyan-300 focus:ring-cyan-400"
                />
                <Input
                  placeholder="Job Title"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  className="border-cyan-300 focus:ring-cyan-400"
                />
                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-full transition-all"
                >
                  Save Changes
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-center mt-4">
          <Button
            onClick={handleEditToggle}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-2 rounded-full transition-all"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </Button>
        </CardFooter>
      </Card>


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
