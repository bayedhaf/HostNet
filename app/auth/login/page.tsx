"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [language, setLanguage] = useState("Oromo")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ phone, password, language })
    router.push("/dashboard")
    // TODO: send to your nextjs backend API for authentication
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-4">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        {/* Language Selector */}
        <div className="flex flex-col items-center space-y-2">
          <span className="text-gray-700 font-medium">Select language / Afaan filadhuu?</span>
          <div className="flex space-x-3">
            <Button
              variant={language === "Oromo" ? "default" : "outline"}
              onClick={() => setLanguage("Oromo")}
            >
              Afaan Oromo
            </Button>
            <Button
              variant={language === "English" ? "default" : "outline"}
              onClick={() => setLanguage("English")}
            >
              English
            </Button>
          </div>
        </div>

        {/* Login Card */}
        <Card className="w-full shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="bg-indigo-500 text-white text-center py-4">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="number"
                placeholder={
                  language === "Oromo"
                    ? "Lakkobsa bilbila galchi"
                    : "Enter phone number"
                }
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              <Input
                type="password"
                placeholder={language === "Oromo" ? "Jecha iccitii" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold">
                {language === "Oromo" ? "Seeni" : "Sign In"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-500">
              {language === "Oromo" ? (
                <> Fuula kanaf haaraa yoo tatee ? <span className="text-indigo-500 cursor-pointer">Galmaai</span></>
              ) : (
                <>Don not have an account? <span className="text-indigo-500 cursor-pointer">Sign Up</span></>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
