"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useApp } from "@/lib/context/AppContext"

export default function LoginPage() {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { language, login } = useApp()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const success = await login(phone, password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError(language === "Oromo" ? "Lakkobsa bilbila ykn jecha iccitii dogoggora" : "Invalid phone number or password")
      }
    } catch {
      setError(language === "Oromo" ? "Dogoggora ta'e jira" : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-4">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">

      
        <Card className="w-full shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="bg-cyan-500 text-white  text-center py-4">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
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
                disabled={loading}
              />
              <Input
                type="password"
                placeholder={language === "Oromo" ? "Jecha iccitii" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                required
                disabled={loading}
              />
              <Button 
                type="submit" 
                className="w-full bg-cyan-500 text-white hover:bg-cyan-600 font-semibold"
                disabled={loading}
              >
                {loading 
                  ? (language === "Oromo" ? "Seenaa jira..." : "Signing in...") 
                  : (language === "Oromo" ? "Seeni" : "Sign In")
                }
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-500">
            <Link href='/auth/signup'>  {language === "Oromo" ? (
                <> Fuula kanaf haaraa yoo tatee ? <span className="text-green-500 cursor-pointer">Galmaai</span></>
              ) : (
                <>Don not have an account? <span className="text-green-500 cursor-pointer">Sign Up</span></>
              )}</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
