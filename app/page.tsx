"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Star, DollarSign, Users, Shield, CheckCircle2, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-[#0a0a0f] to-orange-600/10" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <Image src="/amazon-jobs-logo.png" alt="Amazon Jobs" width={180} height={60} className="h-12 w-auto" />
        <Link href="/signup">
          <Button
            variant="outline"
            className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white bg-transparent"
          >
            Sign Up
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Earn Money Reviewing Products
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Join Amazon's official product review program and start earning rewards today
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white text-lg font-semibold px-8 py-6 rounded-full shadow-lg shadow-orange-400/30"
              >
                Get Started Now
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-6 rounded-full bg-transparent"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-gray-900/50 border-gray-800 p-6">
              <div className="flex flex-col items-center space-y-2">
                <Users className="w-10 h-10 text-orange-400" />
                <p className="text-3xl font-bold text-white">50,000+</p>
                <p className="text-sm text-gray-400">Active Reviewers</p>
              </div>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800 p-6">
              <div className="flex flex-col items-center space-y-2">
                <DollarSign className="w-10 h-10 text-green-400" />
                <p className="text-3xl font-bold text-white">$2.5M+</p>
                <p className="text-sm text-gray-400">Paid to Reviewers</p>
              </div>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800 p-6">
              <div className="flex flex-col items-center space-y-2">
                <Star className="w-10 h-10 text-yellow-400" />
                <p className="text-3xl font-bold text-white">1M+</p>
                <p className="text-sm text-gray-400">Reviews Completed</p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Join Our Program?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-800 p-6 hover:border-orange-500/50 transition-colors">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold">Earn Real Money</h3>
                <p className="text-gray-400">
                  Get paid for every product review you complete. Withdraw anytime via PayPal.
                </p>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 p-6 hover:border-orange-500/50 transition-colors">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">100% Legitimate</h3>
                <p className="text-gray-400">Official Amazon partner program with verified payment system.</p>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 p-6 hover:border-orange-500/50 transition-colors">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold">Easy to Start</h3>
                <p className="text-gray-400">Simple signup process. Start reviewing products within minutes.</p>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 p-6 hover:border-orange-500/50 transition-colors">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Star className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Premium Products</h3>
                <p className="text-gray-400">Review top brands and latest products from leading manufacturers.</p>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 p-6 hover:border-orange-500/50 transition-colors">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold">Flexible Schedule</h3>
                <p className="text-gray-400">
                  Work on your own time. Review products whenever it's convenient for you.
                </p>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 p-6 hover:border-orange-500/50 transition-colors">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Users className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold">Community Support</h3>
                <p className="text-gray-400">Join thousands of reviewers and get help from our support team.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30 p-12">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of reviewers already earning money with Amazon Jobs
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white text-lg font-semibold px-12 py-6 rounded-full shadow-lg shadow-orange-400/30"
              >
                Create Free Account
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-sm text-gray-400 border-t border-gray-800">
        <p>© 2025 LLC, All rights reserved.</p>
      </footer>
    </div>
  )
}
