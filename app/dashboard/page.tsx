"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Home,
  Gift,
  Crown,
  Users,
  User,
  Bell,
  Smartphone,
  Grid3x3,
  Building2,
  Wallet,
  TrendingUp,
  GraduationCap,
  Shield,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Star,
} from "lucide-react"

interface Transaction {
  id: string
  type: "Review" | "Withdrawal"
  product: string
  amount: number
  date: string
  status: "Completed" | "Pending activation"
  userName: string
}

export default function DashboardPage() {
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [isProcessingPayout, setIsProcessingPayout] = useState(false)
  const [payoutMessage, setPayoutMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "Review",
      product: "Luggage evaluation",
      amount: 45.0,
      date: "10 minutes",
      status: "Completed",
      userName: "Sarah M.",
    },
    {
      id: "2",
      type: "Review",
      product: "Jordan Sneakers",
      amount: 55.0,
      date: "11 minutes",
      status: "Completed",
      userName: "Michael R.",
    },
    {
      id: "3",
      type: "Review",
      product: "Fire TV",
      amount: 65.0,
      date: "11 minutes",
      status: "Completed",
      userName: "Jessica L.",
    },
    {
      id: "4",
      type: "Withdrawal",
      product: "PayPal Transfer",
      amount: 265.0,
      date: "15 minutes",
      status: "Pending activation",
      userName: "David K.",
    },
  ])

  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    paypal: "john@example.com",
    initials: "JD",
  })

  const userNames = [
    "Sarah M.",
    "Michael R.",
    "Jessica L.",
    "David K.",
    "Emily W.",
    "James T.",
    "Amanda S.",
    "Robert H.",
    "Lisa P.",
    "Christopher B.",
    "Jennifer M.",
    "Daniel F.",
    "Michelle C.",
    "Matthew G.",
    "Ashley N.",
    "Joshua D.",
    "Stephanie R.",
    "Andrew W.",
    "Nicole K.",
    "Ryan L.",
    "Lauren B.",
    "Kevin S.",
    "Rachel T.",
    "Brandon M.",
    "Melissa H.",
    "Tyler J.",
    "Amber P.",
    "Justin C.",
    "Brittany F.",
    "Eric G.",
  ]

  const products = [
    "Wireless Headphones",
    "Smart Watch",
    "Coffee Maker",
    "Leather Backpack",
    "Bluetooth Speaker",
    "Fitness Tracker",
    "Laptop Stand",
    "Desk Lamp",
    "Premium Luggage",
    "Jordan Sneakers",
    "Fire TV 4K",
    "Echo Dot",
    "Kindle Paperwhite",
    "Ring Doorbell",
    "AirPods Pro",
    "iPad Air",
    "Gaming Mouse",
    "Mechanical Keyboard",
    "Webcam HD",
    "USB-C Hub",
    "Portable Charger",
    "Phone Case",
    "Screen Protector",
    "Wireless Charger",
  ]

  useEffect(() => {
    const savedName = localStorage.getItem("userName")
    const savedEmail = localStorage.getItem("userEmail")

    if (savedName && savedEmail) {
      const nameParts = savedName.trim().split(" ")
      const initials =
        nameParts.length > 1
          ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
          : savedName.substring(0, 2).toUpperCase()

      setUserData({
        name: savedName,
        email: savedEmail,
        paypal: savedEmail,
        initials: initials,
      })
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % productsBanner.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const generateRandomTransaction = () => {
      const randomUser = userNames[Math.floor(Math.random() * userNames.length)]
      const randomProduct = products[Math.floor(Math.random() * products.length)]
      const randomAmount = Math.floor(Math.random() * (65 - 15 + 1)) + 15
      const randomMinutes = Math.floor(Math.random() * 5) + 1

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: "Review",
        product: `${randomProduct} evaluation`,
        amount: randomAmount,
        date: `${randomMinutes} minute${randomMinutes > 1 ? "s" : ""}`,
        status: "Completed",
        userName: randomUser,
      }

      setRecentTransactions((prev) => {
        const updated = [newTransaction, ...prev]
        return updated.slice(0, 10) // Keep only last 10 transactions
      })
    }

    // Generate first transaction after 3 seconds
    const initialTimeout = setTimeout(generateRandomTransaction, 3000)

    // Then generate new transactions every 3-5 seconds
    const interval = setInterval(() => {
      const randomDelay = Math.floor(Math.random() * 2000) + 3000 // 3-5 seconds
      setTimeout(generateRandomTransaction, randomDelay)
    }, 5000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  const handleStartEvaluation = async () => {
    setIsProcessingPayout(true)
    setPayoutMessage(null)

    try {
      const response = await fetch("/api/paypal-payout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paypalEmail: userData.paypal,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setPayoutMessage({
          type: "success",
          text: "Payment of $0.01 sent successfully to your PayPal!",
        })
        setTimeout(() => {
          setShowVerificationModal(true)
          setPayoutMessage(null)
        }, 2000)
      } else {
        setPayoutMessage({
          type: "error",
          text: data.error || "Failed to send payment. Please try again.",
        })
      }
    } catch (error) {
      console.error("[v0] Error processing payout:", error)
      setPayoutMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      })
    } finally {
      setIsProcessingPayout(false)
    }
  }

  const productsBanner = [
    { id: 1, name: "Wireless Headphones", image: "/wireless-headphones.png", reward: 15 },
    { id: 2, name: "Smart Watch", image: "/smartwatch-lifestyle.png", reward: 25 },
    { id: 3, name: "Coffee Maker", image: "/modern-coffee-maker.png", reward: 18 },
    { id: 4, name: "Leather Backpack", image: "/brown-leather-backpack.png", reward: 20 },
    { id: 5, name: "Bluetooth Speaker", image: "/bluetooth-speaker.jpg", reward: 22 },
    { id: 6, name: "Fitness Tracker", image: "/fitness-tracker-lifestyle.png", reward: 16 },
    { id: 7, name: "Laptop Stand", image: "/laptop-stand.png", reward: 12 },
    { id: 8, name: "Desk Lamp", image: "/modern-desk-lamp.png", reward: 14 },
  ]

  const availableReviews = [
    { id: 1, name: "Premium Luggage Set", image: "/assorted-luggage.png", reward: 45 },
    { id: 2, name: "Jordan Sneakers Limited", image: "/jordan-sneakers.jpg", reward: 55 },
    { id: 3, name: "Fire TV 4K Streaming", image: "/fire-tv.jpg", reward: 35 },
    { id: 4, name: "Echo Dot Smart Speaker", image: "/echo-dot.jpg", reward: 28 },
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image src="/amazon-jobs-logo.png" alt="Amazon Jobs" width={180} height={50} className="h-12 w-auto" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Smartphone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Grid3x3 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Product Grid - Netflix Style */}
        <section className="relative h-48 rounded-lg overflow-hidden">
          <img
            src={productsBanner[currentBannerIndex].image || "/placeholder.svg"}
            alt={productsBanner[currentBannerIndex].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold mb-1">{productsBanner[currentBannerIndex].name}</h3>
            <Badge className="bg-orange-500 text-white border-0">
              Earn ${productsBanner[currentBannerIndex].reward}
            </Badge>
          </div>
          {/* Banner indicators */}
          <div className="absolute bottom-4 right-4 flex gap-1">
            {productsBanner.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentBannerIndex ? "bg-white w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => setShowVerificationModal(true)}
            className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-900 hover:bg-gray-800 border border-gray-800"
          >
            <Building2 className="w-8 h-8 text-yellow-500" />
            <span className="text-sm text-yellow-500">Recharge</span>
          </Button>
          <Button
            onClick={() => setShowVerificationModal(true)}
            className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-900 hover:bg-gray-800 border border-gray-800"
          >
            <Wallet className="w-8 h-8 text-yellow-500" />
            <span className="text-sm text-yellow-500">Withdraw</span>
          </Button>
          <Button
            onClick={() => setShowVerificationModal(true)}
            className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-900 hover:bg-gray-800 border border-gray-800"
          >
            <TrendingUp className="w-8 h-8 text-yellow-500" />
            <span className="text-sm text-yellow-500">InvestPlus</span>
          </Button>
          <Button
            onClick={() => setShowVerificationModal(true)}
            className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-900 hover:bg-gray-800 border border-gray-800"
          >
            <GraduationCap className="w-8 h-8 text-yellow-500" />
            <span className="text-sm text-yellow-500">System Tutorial</span>
          </Button>
        </section>

        {/* How to Earn Section */}
        <section className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold">How to earn with Amazon Jobs 2025</h3>
              <p className="text-sm text-gray-400">Complete product reviews and earn rewards</p>
            </div>
          </div>
        </section>

        {/* Task Center */}
        <section className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold border-l-4 border-yellow-500 pl-3">Task Center</h2>
            <Button variant="ghost" size="sm" className="text-gray-400">
              →
            </Button>
          </div>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition-colors">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span className="text-sm">Complete tasks and earn rewards</span>
            <Button variant="ghost" size="sm" className="ml-auto text-gray-400">
              →
            </Button>
          </div>
        </section>

        {/* Available Reviews */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold border-l-4 border-yellow-500 pl-3">Reviews available for you</h2>
            <Button variant="ghost" size="sm" className="text-gray-400">
              →
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableReviews.map((review) => (
              <Card key={review.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="aspect-[2/3] relative">
                  <img
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Image src="/amazon-jobs-logo.png" alt="Amazon" width={40} height={40} className="h-8 w-auto" />
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <h3 className="font-semibold text-sm line-clamp-2 text-white">{review.name}</h3>
                  <Button
                    onClick={handleStartEvaluation}
                    disabled={isProcessingPayout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
                  >
                    {isProcessingPayout ? <Loader2 className="w-4 h-4 animate-spin" /> : "Review Immediately"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Payout Message */}
        {payoutMessage && (
          <div
            className={`flex justify-center animate-in fade-in duration-200 ${
              payoutMessage.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            <div
              className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                payoutMessage.type === "success"
                  ? "bg-green-500/20 border border-green-500/30"
                  : "bg-red-500/20 border border-red-500/30"
              }`}
            >
              {payoutMessage.type === "success" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <p className="font-semibold">{payoutMessage.text}</p>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg font-bold border-l-4 border-yellow-500 pl-3 mb-4">Recent Activity</h2>
          <Card className="bg-gray-900 border-gray-800 p-4">
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all animate-in slide-in-from-top duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "Review"
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {transaction.type === "Review" ? <Star className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{transaction.userName}</p>
                      <p className="text-sm text-gray-400">{transaction.product}</p>
                      <p className="text-xs text-gray-500">{transaction.date} ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">+${transaction.amount.toFixed(2)}</p>
                    <Badge
                      variant="secondary"
                      className={
                        transaction.status === "Completed"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-yellow-500 hover:bg-transparent">
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-gray-400 hover:bg-transparent hover:text-white"
          >
            <Gift className="w-5 h-5" />
            <span className="text-xs">Promotion</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-gray-400 hover:bg-transparent hover:text-white"
          >
            <Crown className="w-5 h-5" />
            <span className="text-xs">VIP</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-gray-400 hover:bg-transparent hover:text-white"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Invite Friends</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-gray-400 hover:bg-transparent hover:text-white"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">My</span>
          </Button>
        </div>
      </nav>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gray-100 rounded-2xl max-w-md w-full p-6 relative animate-in zoom-in-95 duration-200">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-3">Human Verification Required</h2>
            <p className="text-xs text-gray-600 text-center mb-4">
              Due to the high rate of system abuse, a verification fee is required to confirm you are human.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">
                This one-time fee helps us maintain platform quality and ensures legitimate evaluators.
              </p>
            </div>
            <p className="text-sm text-gray-600 text-center mb-5">
              It will give you full access to the official Amazon Jobs platform with its bonuses. After payment, your
              $265 transfer is validated and credited to your registered account.
            </p>
            <div className="space-y-3">
              <a
                href="https://pay.hotmart.com/O102095023L?off=tvbvnt76"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 text-base font-semibold">
                  Proceed to Verification
                </Button>
              </a>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              By proceeding, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
