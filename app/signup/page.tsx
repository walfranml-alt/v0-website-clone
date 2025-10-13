"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [activationCode] = useState(generateActivationCode())

  function generateActivationCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const segments = []
    for (let i = 0; i < 3; i++) {
      let segment = ""
      for (let j = 0; j < 4; j++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      segments.push(segment)
    }
    return segments.join("-")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !password || !acceptTerms) {
      alert("Please fill in all fields and accept the terms")
      return
    }

    // Store registration data
    localStorage.setItem("userRegistered", "true")
    localStorage.setItem("userName", fullName)
    localStorage.setItem("userEmail", email)

    // Redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#131921] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">Amazon</span>
          <span className="text-2xl font-bold text-orange-500">Reviews</span>
        </div>
        <div className="text-sm">
          Balance: <span className="text-green-400 font-bold">$204</span>
        </div>
      </header>

      {/* Success Message */}
      <div className="max-w-2xl mx-auto mt-8 px-4">
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-green-800">
            <span className="font-bold">Congratulations!</span> You've earned $204! Complete your registration to
            withdraw your earnings.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Register for Amazon Reviews</h1>
          <p className="text-center text-gray-600 mb-8">
            Create your account to access the official app and withdraw your earnings
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* App Activation Code */}
            <div>
              <label htmlFor="activationCode" className="block text-sm font-medium text-gray-700 mb-2">
                App Activation Code
              </label>
              <div className="relative">
                <Input
                  id="activationCode"
                  type="text"
                  value={activationCode}
                  readOnly
                  className="w-full bg-green-50 border-green-300 text-green-700 font-bold pr-12"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Your unique activation code has been generated automatically
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                I accept the{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  Amazon Reviews Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 text-lg"
            >
              ACCESS THE APP
            </Button>

            {/* Security Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-blue-800">
                Your information is secure and protected by Amazon Reviews encryption
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
