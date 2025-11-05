"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/context/AppContext";
import { useRouter } from "next/navigation";

export default function UseApplicationForm() {
  const { language } = useApp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    gender: "",
    about: "",
    images: null as FileList | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, images: e.target.files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.name || !formData.phone || !formData.location || !formData.gender || !formData.about) {
      setError(language === "Oromo" ? "Odeeffannoo hundi barbaachisa" : "All fields are required");
      setLoading(false);
      return;
    }

    if (!formData.images || formData.images.length === 0) {
      setError(language === "Oromo" ? "Suuraa galchuu qabda" : "Please upload at least one image");
      setLoading(false);
      return;
    }

    try {
      // Prepare FormData for POST
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("phone", formData.phone);
      payload.append("location", formData.location);
      payload.append("gender", formData.gender);
      payload.append("about", formData.about);

      if (formData.images) {
        Array.from(formData.images).forEach((file) => {
          payload.append("images[]", file, file.name);
        });
      }

      // POST request to backend
      const res = await fetch("/api/application", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      // Reset form and navigate
      setFormData({ name: "", phone: "", location: "", gender: "", about: "", images: null });
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : (language === "Oromo" ? "Dogoggora ta'e jira" : "An error occurred");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-linear-to-b from-cyan-50 to-cyan-50 min-h-screen py-8">
      <Card className="w-full max-w-xl shadow-2xl border border-cyan-200 bg-white/80 backdrop-blur-md rounded-2xl p-4 transition-all hover:shadow-cyan-300">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-red-700 font-semibold text-lg leading-relaxed">
            {language === "Oromo"
              ? "Dursee guutuu ykn dhiyeessuu dura, waliigaltee keenya dubbisuu fi mirkaneessuu qabda!"
              : "Before you fill or apply, you must read and confirm our agreement!"}
          </h1>
          <h2 className="text-cyan-800 font-bold text-2xl">
            {language === "Oromo" ? "Foormii Hojjetaa (Employeer Application Form)" : "Employeer Application Form"}
          </h2>
        </CardHeader>

        <CardContent>
          {error && <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-cyan-900 font-semibold border-b border-cyan-200 pb-1">
              {language === "Oromo" ? "Odeeffannoo Dhuunfaa" : "Personal Information"}
            </h3>

            <Input type="text" name="name" placeholder={language === "Oromo" ? "Maqaa guutuu barreessi..." : "Write your full name..."} value={formData.name} onChange={handleInputChange} required disabled={loading} />

            <Input type="number" name="phone" placeholder={language === "Oromo" ? "Lakkobsa bilbila barreessi..." : "Write your phone number..."} value={formData.phone} onChange={handleInputChange} required disabled={loading} />

            <Input type="text" name="location" placeholder={language === "Oromo" ? "Iddoo jireenyaa barreessi..." : "Write your location..."} value={formData.location} onChange={handleInputChange} required disabled={loading} />

            <select name="gender" value={formData.gender} onChange={handleInputChange} required disabled={loading} className="w-full p-3 border border-cyan-300 focus:border-cyan-500 focus:ring-cyan-400 rounded-xl text-gray-700 bg-white shadow-sm">
              <option value="">{language === "Oromo" ? "Saala kee filadhu" : "Select your gender"}</option>
              <option value="female">{language === "Oromo" ? "Dubartii" : "Female"}</option>
              <option value="male">{language === "Oromo" ? "Dhiira" : "Male"}</option>
              <option value="other">{language === "Oromo" ? "Kan biroo" : "Other"}</option>
            </select>

            <textarea name="about" placeholder={language === "Oromo" ? "Waa'ee kee barreessi... Fakkeenyaaf muxannoo hojii kee" : "Write about yourself... for example, your work experience"} value={formData.about} onChange={handleInputChange} required disabled={loading} className="w-full h-28 border border-cyan-300 focus:border-cyan-500 focus:ring-cyan-400 rounded-xl p-3 shadow-sm resize-none" />

            <div className="space-y-2">
              <h3 className="text-red-700 font-medium">{language === "Oromo" ? "Suuraa guutuu mataa hanga miillaatti galchuu qabda (yoo xiqate afur)." : "You must upload a full image from head to foot (at least four if possible)."}</h3>
              <Input type="file" name="images" multiple onChange={handleFileChange} required disabled={loading} />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-xl shadow-md transition-all">
              {loading ? (language === "Oromo" ? "Dhiyeessaa jira..." : "Submitting...") : (language === "Oromo" ? "Dhiyeessi" : "Submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
