"use client";

import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function Message() {
  return (
  <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-cyan-700 via-teal-500 to-emerald-400">
      <Card className="w-full max-w-lg text-center shadow-2xl border border-white/20 rounded-3xl bg-white/10 backdrop-blur-xl hover:scale-105 transform transition-all duration-500">
        <CardContent className="py-16 px-10">
          <h2 className="text-5xl font-extrabold bg-linear-to-r from-red-500 via-pink-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
            🌐 Coming Soon
          </h2>

          <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed">
            We’re crafting something <span className="text-cyan-300 font-semibold">refreshingly new</span>. 
            <br />
            Stay tuned for <span className="text-emerald-300 font-bold">exciting updates</span>!
          </p>

          <div className="mt-12 flex justify-center space-x-4">
            <div className="w-4 h-4 bg-cyan-300 rounded-full animate-bounce delay-75 shadow-lg shadow-cyan-400/50" />
            <div className="w-4 h-4 bg-teal-300 rounded-full animate-bounce delay-150 shadow-lg shadow-teal-400/50" />
            <div className="w-4 h-4 bg-emerald-300 rounded-full animate-bounce delay-300 shadow-lg shadow-emerald-400/50" />
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <button className="px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg transition duration-300 hover:scale-105">
              Notify Me
            </button>
            <button className="px-6 py-2 rounded-full bg-transparent border border-white/50 hover:bg-white/20 text-white font-semibold transition duration-300 hover:scale-105">
              Learn More
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
