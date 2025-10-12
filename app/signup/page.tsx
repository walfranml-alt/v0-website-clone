"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isLoaded, setIsLoaded] = useState(false)
  const [accessCode, setAccessCode] = useState("")

  useEffect(() => {
    const generateAccessCode = () => {
      const timestamp = Date.now().toString(36).toUpperCase()
      const random = Math.random().toString(36).substring(2, 8).toUpperCase()
      return `AMZ-${timestamp}-${random}`
    }

    setAccessCode(generateAccessCode())
  }, [])

  useEffect(() => {
    const savedFormData = localStorage.getItem("signupFormData")
    if (savedFormData) {
      try {
        const parsed = JSON.parse(savedFormData)
        console.log("[v0] Loading saved form data:", parsed)
        setFormData(parsed)
      } catch (error) {
        console.error("[v0] Error loading saved form data:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    if (formData.name || formData.email || formData.password) {
      console.log("[v0] Auto-saving form data:", formData)
      localStorage.setItem("signupFormData", JSON.stringify(formData))
    }
  }, [formData, isLoaded])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)

    localStorage.setItem("userName", formData.name)
    localStorage.setItem("userEmail", formData.email)
    localStorage.setItem("userPayPal", formData.email)
    localStorage.setItem("userAccessCode", accessCode)

    localStorage.removeItem("signupFormData")

    router.push("/dashboard")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    console.log(`[v0] Field changed: ${name} = ${value}`)

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-[#0a0a0f] to-orange-600/10" />

      <header className="relative z-10 flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/amazon-jobs-logo.png" alt="Amazon Jobs" width={180} height={60} className="h-12 w-auto" />
        </Link>
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Create Account</h1>
          <p className="text-gray-400 text-center mb-8">Join us and start earning today</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="accessCode" className="text-white text-sm font-medium">
                Exclusive Access Code
              </Label>
              <Input
                id="accessCode"
                name="accessCode"
                type="text"
                value={accessCode}
                readOnly
                className="bg-gray-900/50 border-gray-700 text-orange-400 font-mono font-semibold focus:border-orange-400 focus:ring-orange-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">(This code is valid for a single registration)</p>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white text-lg font-semibold py-6 rounded-full shadow-lg shadow-orange-400/30"
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/" className="text-orange-400 hover:text-orange-300 font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-sm text-gray-400">© 2025 LLC, All rights reserved.</footer>
    </div>
  )
}
