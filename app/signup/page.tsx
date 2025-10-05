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
    paypalAccount: "",
  })
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (showLoadingModal) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            // Redirect to dashboard when progress reaches 100%
            setTimeout(() => {
              router.push("/dashboard")
            }, 500)
            return 100
          }
          return prev + 2 // Increment by 2% every interval
        })
      }, 50) // Update every 50ms (total ~2.5 seconds to reach 100%)

      return () => clearInterval(interval)
    }
  }, [showLoadingModal, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    localStorage.setItem("userName", formData.name)
    localStorage.setItem("userEmail", formData.email)
    localStorage.setItem("userPayPal", formData.paypalAccount)
    setShowLoadingModal(true)
    setProgress(0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-[#0a0a0f] to-orange-600/10" />

      {/* Header */}
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

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Create Account</h1>
          <p className="text-gray-400 text-center mb-8">Join us and start earning today</p>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* PayPal Account Field */}
            <div className="space-y-2">
              <Label htmlFor="paypalAccount" className="text-white text-sm font-medium">
                PayPal Account
              </Label>
              <Input
                id="paypalAccount"
                name="paypalAccount"
                type="email"
                placeholder="Enter your PayPal email for withdrawals"
                value={formData.paypalAccount}
                onChange={handleChange}
                required
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400"
              />
              <p className="text-xs text-gray-500">This will be used for your earnings withdrawals</p>
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

      {showLoadingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-orange-500/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Customizing account and adding bonus</h2>
              <p className="text-gray-400 text-sm">Please wait...</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Progress</span>
                <span className="font-semibold text-orange-400">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
