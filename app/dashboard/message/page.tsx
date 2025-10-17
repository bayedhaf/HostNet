import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function Message() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-600 via-teal-500 to-emerald-400">
      <Card className="w-full max-w-md text-center shadow-2xl border border-cyan-300/30 rounded-3xl bg-white/10 backdrop-blur-lg">
        <CardContent className="py-12 px-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 via-red-400 to-red-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            🌐 Coming Soon
          </h2>

          <p className="text-orange-500 mt-3 text-lg">
            We’re building something <span className="text-emerald-200 font-semibold">refreshingly new</span>. Stay tuned!
          </p>

          <div className="mt-8 flex justify-center space-x-3">
            <div className="w-3 h-3 bg-cyan-300 rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-teal-300 rounded-full animate-bounce delay-150" />
            <div className="w-3 h-3 bg-emerald-300 rounded-full animate-bounce delay-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
