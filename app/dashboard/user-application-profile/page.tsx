"use client";

import { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import { useSearchParams } from "next/navigation";

function UserApplicationProfileContent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { applications } = useApp();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id');
  
  const [user, setUser] = useState({
    id: 90,
    name: "Bontu Gudata",
    avatar: "/ho1.jpg",
    banner: "/hot3.jpg",
    images: ["/ho1.jpg", "/hot3.jpg", "/hot2.jpg", "/hot3.jpg"],
    location: "Adama",
    about: "I am a dedicated professional with 2 years of experience in hotel service, customer handling, and front-desk management. Passionate about providing quality service and creating memorable guest experiences.",
  });

  useEffect(() => {
    if (applicationId) {
      const foundApplication = applications.find(app => app.id === parseInt(applicationId));
      if (foundApplication) {
        setUser({
          id: foundApplication.id,
          name: foundApplication.name,
          avatar: foundApplication.images[0] || "/ho1.jpg",
          banner: foundApplication.images[1] || "/hot3.jpg",
          images: foundApplication.images,
          location: foundApplication.location,
          about: foundApplication.about,
        });
      }
    }
  }, [applicationId, applications]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-100 py-10 px-4 flex justify-center items-center">
      <Card className="min-h-screen overflow-y-auto bg-gradient-to-br from-cyan-50 via-white to-cyan-50 py-10 px-4 flex justify-center items-center">
     
        <div className="relative w-full h-56">
          <Image
            src={user.banner}
            alt="Banner"
            fill
            className="object-cover brightness-90"
          />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={user.avatar}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

       
     <CardHeader className="flex justify-center mt-16">
  <CardTitle className="text-xl font-bold text-cyan-800 flex items-center gap-2">
    <span className="text-cyan-700">Name:</span>
    <span className="text-gray-800">{user.name}</span>
  </CardTitle>
      </CardHeader>


       
        <CardContent className="space-y-8 px-6 pb-10">
        
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {user.images.map((img, index) => (
              <div
                key={index}
                className="relative w-full h-32 rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={`${user.name} photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-white shadow-inner rounded-2xl p-6 space-y-2 border border-cyan-100">
          
            <p className="text-gray-700">
              <span className="font-semibold text-cyan-700">📍 Location:</span>{" "}
              {user.location}
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-cyan-700">💬 About:</span>{" "}
              {user.about}
            </p>
          </div>

      
          <div className="flex justify-center pt-4">
           <Link href={`/dashboard/hire-me?id=${user.id}`}>
            <Button className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold rounded-full shadow-md px-10 py-3 transition-transform hover:scale-105">
              Hire Me
            </Button></Link>
          </div>
        </CardContent>
      </Card>

     
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[90%] md:w-[60%] lg:w-[40%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-cyan-200">
            <Image
              src={selectedImage}
              alt="Full view"
              fill
              className="object-cover"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 bg-white/80 hover:bg-white text-cyan-700 font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserApplicationProfile() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <UserApplicationProfileContent />
    </Suspense>
  );
}
