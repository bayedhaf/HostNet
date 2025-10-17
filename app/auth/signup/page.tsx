"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [language, setLanguage] = useState("Oromo")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert(language === "Oromo" ? "Jecha iccitii wal hin gahu" : "Passwords do not match")
      return
    }
    console.log({ name, phone, password })
    router.push("/dashboard")
    // TODO: send to your backend API for registration
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
       
        <div className="flex flex-col items-center space-y-2">
          <span className="text-gray-700 font-medium">
            {language === "Oromo" ? "Afaan filadhuu?" : "Choose language?"}
          </span>
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

        
        <Card className="w-full shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="bg-cyan-500 text-white  text-center py-4">
            <CardTitle className="text-2xl font-bold">
              {language === "Oromo" ? "Galmee Haaraa" : "Sign Up"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder={language === "Oromo" ? "Maqaa guutu galcha..." : "Enter full name..."}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="number"
                placeholder={language === "Oromo" ? "Lakk bilbila galcha..." : "Enter phone number..."}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder={language === "Oromo" ? "Jecha iccitii haaraa galcha..." : "Enter new password..."}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder={language === "Oromo" ? "Jecha iccitii mirkaneessi..." : "Confirm password..."}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-cyan-500 text-white hover:bg-cyan-600  font-semibold">
                {language === "Oromo" ? "Account Uumi" : "Create Account"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-500">
             <Link href='/auth/login'>
              {language === "Oromo" ? (
                <>Fuula kana duraa yoo qabatan ? <span className="text-purple-500 cursor-pointer">Seeni</span></>
              ) : (
                <>Already have an account? <span className="text-purple-500 cursor-pointer">Login</span></>
              )}
             </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
