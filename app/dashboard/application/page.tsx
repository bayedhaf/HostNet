"use client";

import React, { useState } from "react";
import Language from "@/app/language/Language";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UseApplicationForm() {
  const [language, setLanguage] = useState("Oromo");
    // this post to api/application route

    // Example API call
    // await fetch("/api/application", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...formData, employerId, employeeId }),
    // });

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-cyan-50 to-cyan-50 min-h-screen py-8">
      <Card className="w-full max-w-xl shadow-2xl border border-cyan-200 bg-white/80 backdrop-blur-md rounded-2xl p-4 transition-all hover:shadow-cyan-300">
        
       
        <div className="flex justify-end p-2">
          <Language language={language} setLanguage={setLanguage} />
        </div>

        
        <CardHeader className="text-center space-y-2">
          <h1 className="text-red-700 font-semibold text-lg leading-relaxed">
            {language === "Oromo"
              ? "Dursee guutuu ykn dhiyeessuu dura, waliigaltee keenya dubbisuu fi mirkaneessuu qabda!"
              : "Before you fill or apply, you must read and confirm our agreement!"}
          </h1>
          <h2 className="text-cyan-800 font-bold text-2xl">
            {language === "Oromo"
              ? "Foormii Hojjetaa (Employeer Application Form)"
              : "Employeer Application Form"}
          </h2>
        </CardHeader>

  
        <CardContent>
          <form className="space-y-5">
            <h3 className="text-cyan-900 font-semibold border-b border-cyan-200 pb-1">
              {language === "Oromo" ? "Odeeffannoo Dhuunfaa" : "Personal Information"}
            </h3>

        
            <Input
              type="text"
              placeholder={
                language === "Oromo"
                  ? "Maqaa guutuu barreessi..."
                  : "Write your full name..."
              }
              className="border-cyan-300 focus:border-cyan-500 focus:ring-cyan-400 rounded-xl shadow-sm"
            />

    
            <Input
              type="number"
              placeholder={
                language === "Oromo"
                  ? "Lakkobsa bilbila barreessi..."
                  : "Write your phone number..."
              }
              className="border-cyan-300 focus:border-cyan-500 focus:ring-cyan-400 rounded-xl shadow-sm"
            />

            <Input
              type="text"
              placeholder={
                language === "Oromo"
                  ? "Iddoo jireenyaa barreessi..."
                  : "Write your location..."
              }
              className="border-cyan-300 focus:border-cyan-500 focus:ring-cyan-400 rounded-xl shadow-sm"
            />


            <select
              className="w-full p-3 border border-cyan-300 focus:border-cyan-500 focus:ring-cyan-400 rounded-xl text-gray-700 bg-white shadow-sm"
            >
              <option value="">
                {language === "Oromo" ? "Saala kee filadhu" : "Select your gender"}
              </option>
              <option value="female">
                {language === "Oromo" ? "Dubartii" : "Female"}
              </option>
              <option value="male">
                {language === "Oromo" ? "Dhiira" : "Male"}
              </option>
              <option value="other">
                {language === "Oromo" ? "Kan biroo" : "Other"}
              </option>
            </select>

            <textarea
              placeholder={
                language === "Oromo"
                  ? "Waa'ee kee barreessi... Fakkeenyaaf muxannoo hojii kee"
                  : "Write about yourself... for example, your work experience"
              }
              className="w-full h-28 border border-cyan-300 focus:border-cyan-500 focus:ring-cyan-400 rounded-xl p-3 shadow-sm resize-none"
            ></textarea>

        
            <div className="space-y-2">
              <h3 className="text-red-700 font-medium">
                {language === "Oromo"
                  ? "Suuraa guutuu mataa hanga miillaatti galchuu qabda (yoo xiqate afur)."
                  : "You must upload a full image from head to foot (at least four if possible)."}
              </h3>
              <Input
                type="file"
                multiple
                className="border-cyan-300 focus:border-cyan-500 focus:ring-cyan-400 rounded-xl shadow-sm"
              />
            </div>

      
            <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-xl shadow-md transition-all">
              {language === "Oromo" ? "Dhiyeessi" : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
