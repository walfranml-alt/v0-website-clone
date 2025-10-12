"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Crown,
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
  ArrowLeft,
  Copy,
  Share2,
  DollarSign,
  Award,
  Zap,
} from "lucide-react"

type ViewType =
  | "home"
  | "dashboard"
  | "withdraw"
  | "giftcards"
  | "tutorial"
  | "reviews"
  | "vip"
  | "invite"
  | "profile"
  | "review-task"

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
  const [activeView, setActiveView] = useState<ViewType>("home")
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [showUpdatedBalanceModal, setShowUpdatedBalanceModal] = useState(false)
  const [lastEarning, setLastEarning] = useState(0)
  const [isProcessingPayout, setIsProcessingPayout] = useState(false)
  const [payoutMessage, setPayoutMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

  const [reviewsCompleted, setReviewsCompleted] = useState(0)
  const [currentBalance, setCurrentBalance] = useState(102)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  const reviewProducts = [
    {
      id: 1,
      name: "Premium Smartphone",
      image: "/modern-smartphone-mobile-phone.jpg",
      reward: 55,
      question: "Would you buy this product?",
    },
    {
      id: 2,
      name: "Smart Speaker Assistant",
      image: "/amazon-echo-alexa-smart-speaker-voice-assistant.jpg",
      reward: 45,
      question: "Would you buy this product?",
    },
    {
      id: 3,
      name: "Kitchen Storage Container Set",
      image: "/kitchen-storage-containers-set.jpg",
      reward: 45,
      question: "Would you buy this product?",
    },
  ]

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
    referralCode: "AMZ-REF-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
  })

  const [selectedProduct, setSelectedProduct] = useState<any>(null)

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
        referralCode:
          localStorage.getItem("referralCode") || "AMZ-REF-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
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

  // CHANGE: Simplified handleStartEvaluation to directly open verification modal without PayPal payout
  const handleStartEvaluation = async () => {
    // Directly open the verification modal without PayPal payout
    setShowVerificationModal(true)
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

  const handleReviewClick = (product: any) => {
    setSelectedProduct(product)
    setActiveView("review-task")
  }

  const handleStartReviewTask = () => {
    setActiveView("review-task")
  }

  const handleReviewSubmit = (answer: "yes" | "no") => {
    const currentProduct = reviewProducts[currentReviewIndex]
    const earning = currentProduct.reward

    // Update balance
    setCurrentBalance((prev) => prev + earning)
    setLastEarning(earning)

    // Show updated balance modal
    setShowUpdatedBalanceModal(true)

    // Increment reviews completed
    setReviewsCompleted((prev) => prev + 1)

    // After 2 seconds, close modal and proceed
    setTimeout(() => {
      setShowUpdatedBalanceModal(false)

      if (reviewsCompleted + 1 >= 3) {
        // After 3rd review, go to withdraw page
        setActiveView("withdraw")
      } else {
        // Move to next review
        setCurrentReviewIndex((prev) => prev + 1)
      }
    }, 2000)
  }

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <DashboardView userData={userData} onStartReview={handleStartReviewTask} isProcessing={isProcessingPayout} />
        )
      case "withdraw":
        return (
          <WithdrawView
            userData={userData}
            currentBalance={currentBalance}
            onVerify={() => setShowVerificationModal(true)}
          />
        )
      case "giftcards":
        return <GiftCardsView onVerify={() => setShowVerificationModal(true)} />
      case "tutorial":
        return <TutorialView onStartEarning={handleStartReviewTask} isProcessing={isProcessingPayout} />
      case "reviews":
        return <ReviewsView availableReviews={availableReviews} onReviewClick={handleStartReviewTask} />
      case "vip":
        return <VIPView onUpgrade={() => setShowVerificationModal(true)} />
      case "invite":
        return <InviteView referralCode={userData.referralCode} />
      case "profile":
        return <ProfileView userData={userData} />
      case "review-task":
        return (
          <ReviewTaskView
            product={reviewProducts[currentReviewIndex]}
            currentBalance={currentBalance}
            onSubmit={handleReviewSubmit}
          />
        )
      default:
        return (
          <HomeView
            productsBanner={productsBanner}
            currentBannerIndex={currentBannerIndex}
            setCurrentBannerIndex={setCurrentBannerIndex}
            availableReviews={availableReviews}
            recentTransactions={recentTransactions}
            handleStartEvaluation={handleStartReviewTask}
            isProcessingPayout={isProcessingPayout}
            setShowVerificationModal={setShowVerificationModal}
            setActiveView={setActiveView}
            onReviewClick={handleStartReviewTask}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            {activeView !== "home" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveView("home")}
                className="text-white hover:bg-white/10 mr-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
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
      <main className="px-4 py-6">{renderView()}</main>

      {/* Payout Message */}
      {payoutMessage && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in duration-200 ${
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

      {showUpdatedBalanceModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-200">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center">
                <DollarSign className="w-12 h-12 text-teal-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white text-center mb-3">Updated balance</h2>
            <p className="text-xl text-white text-center font-semibold">you received + ${lastEarning}</p>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gray-100 rounded-2xl max-w-md w-full p-6 relative animate-in zoom-in-95 duration-200">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-3">Human verification required</h2>
            <p className="text-sm text-gray-600 text-center mb-3">
              Due to the high rate of abuse of the system, a verification fee is required to confirm that you are human.
            </p>
            <p className="text-sm text-gray-600 text-center mb-3">
              This one-time fee helps us maintain the quality of the platform and ensures legitimate reviewers.
            </p>
            <p className="text-sm font-bold text-red-600 text-center mb-3">
              DON'T WORRY, THE FEE IS ONLY FOR SECURITY PURPOSES AND WILL BE REFUNDED WITHIN 1 BUSINESS DAY.
            </p>
            <p className="text-sm text-gray-600 text-center mb-5">
              After verification, your full access to the official Amazon Jobs App and your $247 withdrawal will be
              authorized and credited to your PayPal account.
            </p>
            {/* </CHANGE> */}
            <div className="space-y-3">
              <a
                href="https://pay.hotmart.com/O102095023L?off=tvbvnt76"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 text-base font-semibold">
                  Proceed to verification
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

      {/* Bottom Navigation */}
      {/* CHANGE: Updated bottom navigation to match action buttons: Dashboard, Withdraw, GiftCards, System Tutorial */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40">
        <div className="flex items-center justify-around py-3">
          <Button
            variant="ghost"
            onClick={() => setActiveView("dashboard")}
            className={`flex flex-col items-center gap-1 hover:bg-transparent ${
              activeView === "dashboard" ? "text-yellow-500" : "text-gray-400 hover:text-white"
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveView("withdraw")}
            className={`flex flex-col items-center gap-1 hover:bg-transparent ${
              activeView === "withdraw" ? "text-yellow-500" : "text-gray-400 hover:text-white"
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs">Withdraw</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveView("giftcards")}
            className={`flex flex-col items-center gap-1 hover:bg-transparent ${
              activeView === "giftcards" ? "text-yellow-500" : "text-gray-400 hover:text-white"
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">GiftCards</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveView("tutorial")}
            className={`flex flex-col items-center gap-1 hover:bg-transparent ${
              activeView === "tutorial" ? "text-yellow-500" : "text-gray-400 hover:text-white"
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs">System Tutorial</span>
          </Button>
        </div>
      </nav>
      {/* </CHANGE> */}
    </div>
  )
}

function HomeView({
  productsBanner,
  currentBannerIndex,
  setCurrentBannerIndex,
  availableReviews,
  recentTransactions,
  handleStartEvaluation,
  isProcessingPayout,
  setShowVerificationModal,
  setActiveView,
  onReviewClick,
}: any) {
  return (
    <div className="space-y-6">
      {/* VSL Video Section */}
      <section className="relative rounded-lg overflow-hidden bg-gray-900">
        <div className="aspect-video w-full">
          {/* Replace the src with your actual VSL video URL */}
          {/* For YouTube: https://www.youtube.com/embed/YOUR_VIDEO_ID */}
          {/* For Vimeo: https://player.vimeo.com/video/YOUR_VIDEO_ID */}
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="VSL Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Action Buttons */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          onClick={() => setActiveView("dashboard")}
          className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-900 hover:bg-gray-800 border border-gray-800"
        >
          <Building2 className="w-8 h-8 text-yellow-500" />
          <span className="text-sm text-yellow-500">Dashboard</span>
        </Button>
        <Button
          onClick={() => setActiveView("withdraw")}
          className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-900 hover:bg-gray-800 border border-gray-800"
        >
          <Wallet className="w-8 h-8 text-yellow-500" />
          <span className="text-sm text-yellow-500">Withdraw</span>
        </Button>
        <Button
          onClick={() => setActiveView("giftcards")}
          className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-900 hover:bg-gray-800 border border-gray-800"
        >
          <TrendingUp className="w-8 h-8 text-yellow-500" />
          <span className="text-sm text-yellow-500">GiftCards</span>
        </Button>
        <Button
          onClick={() => setActiveView("tutorial")}
          className="flex flex-col items-center gap-2 h-auto py-6 bg-gray-900 hover:bg-gray-800 border border-gray-800"
        >
          <GraduationCap className="w-8 h-8 text-yellow-500" />
          <span className="text-sm text-yellow-500">System Tutorial</span>
        </Button>
      </section>

      {/* How to Earn Section */}
      <section
        className="bg-gray-900 rounded-lg p-4 border border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors"
        onClick={() => setActiveView("tutorial")}
      >
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
          <Button variant="ghost" size="sm" className="text-gray-400" onClick={() => setActiveView("reviews")}>
            →
          </Button>
        </div>
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition-colors"
          onClick={() => setActiveView("reviews")}
        >
          <CheckCircle2 className="w-6 h-6 text-green-500" />
          <span className="text-sm">Complete tasks and earn rewards</span>
          <Button variant="ghost" size="sm" className="ml-auto text-gray-400">
            →
          </Button>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-lg font-bold border-l-4 border-yellow-500 pl-3 mb-4">Recent Activity</h2>
        <Card className="bg-gray-900 border-gray-800 p-4">
          <div className="space-y-3">
            {recentTransactions.map((transaction: Transaction, index: number) => (
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
    </div>
  )
}

function DashboardView({ userData, onStartReview, isProcessing }: any) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 p-6">
          <div className="flex flex-col gap-2">
            <p className="text-white/80 text-sm">Available Balance</p>
            <p className="text-3xl font-bold text-white">$265.00</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-orange-600 to-orange-700 border-0 p-6">
          <div className="flex flex-col gap-2">
            <p className="text-white/80 text-sm">Pending Reviews</p>
            <p className="text-3xl font-bold text-white">8</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-green-600 to-green-700 border-0 p-6">
          <div className="flex flex-col gap-2">
            <p className="text-white/80 text-sm">Completed Reviews</p>
            <p className="text-3xl font-bold text-white">3</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-0 p-6">
          <div className="flex flex-col gap-2">
            <p className="text-white/80 text-sm">Training Progress</p>
            <p className="text-3xl font-bold text-white">0%</p>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Ready to Earn?</h3>
            <p className="text-white/90">Start reviewing products and earn money now</p>
          </div>
          <Button
            onClick={onStartReview}
            disabled={isProcessing}
            className="bg-white text-green-700 hover:bg-gray-100 font-semibold px-6 py-6"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Star className="w-5 h-5 mr-2" />
                Start Review
              </>
            )}
          </Button>
        </div>
      </Card>

      <Card className="bg-gray-900 border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Account Information</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-300">Name:</span>
            <span className="font-semibold text-white">{userData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Email:</span>
            <span className="font-semibold text-white">{userData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">PayPal:</span>
            <span className="font-semibold text-white">{userData.paypal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Member Since:</span>
            <span className="font-semibold text-white">January 2025</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

function WithdrawView({ userData, currentBalance, onVerify }: any) {
  const [withdrawAmount, setWithdrawAmount] = useState("")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Withdraw Funds</h1>

      <Card className="bg-gray-900 border-gray-800 p-6">
        <div className="text-center mb-6">
          <p className="text-gray-400 mb-2">Available Balance</p>
          <p className="text-4xl font-bold text-green-400">${currentBalance.toFixed(2)}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">PayPal Email</label>
            <input
              type="email"
              defaultValue={userData.paypal}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Withdrawal Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
            />
          </div>

          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-sm text-yellow-400">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Minimum withdrawal amount is $50. Processing time: 1-3 business days.
            </p>
          </div>

          <Button
            onClick={onVerify}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
          >
            <Wallet className="w-5 h-5 mr-2" />
            Request Withdrawal
          </Button>
        </div>
      </Card>
    </div>
  )
}

function GiftCardsView({ onVerify }: any) {
  const giftCards = [
    { id: 1, brand: "Amazon", discount: "10%", value: 50, image: "/generic-online-marketplace.png" },
    { id: 2, brand: "Walmart", discount: "15%", value: 100, image: "/walmart-storefront.png" },
    { id: 3, brand: "Target", discount: "12%", value: 75, image: "/archery-target.png" },
    { id: 4, brand: "Best Buy", discount: "20%", value: 150, image: "/bestbuy.jpg" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Discount Gift Cards</h1>

      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Exclusive Discounts</h2>
        <p className="text-white/90">Purchase gift cards with your earnings and save up to 20%!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {giftCards.map((card) => (
          <Card key={card.id} className="bg-gray-900 border-gray-800 p-6">
            <div className="flex items-center gap-4 mb-4">
              <img src={card.image || "/placeholder.svg"} alt={card.brand} className="w-16 h-16 rounded-lg" />
              <div>
                <h3 className="text-xl font-bold text-white">{card.brand}</h3>
                <Badge className="bg-green-500 text-white border-0">{card.discount} OFF</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Card Value:</span>
                <span className="font-bold text-white">${card.value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Your Price:</span>
                <span className="font-bold text-green-400">
                  ${(card.value * (1 - Number.parseInt(card.discount) / 100)).toFixed(2)}
                </span>
              </div>
              <Button onClick={onVerify} className="w-full bg-orange-600 hover:bg-orange-700">
                Purchase Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TutorialView({ onStartEarning, isProcessing }: any) {
  const steps = [
    {
      title: "Create Your Account",
      description: "Sign up with your email and complete the verification process.",
      icon: User,
    },
    {
      title: "Complete Product Reviews",
      description: "Browse available products and write honest reviews to earn rewards.",
      icon: Star,
    },
    {
      title: "Earn Money",
      description: "Get paid $15-$65 for each completed review directly to your account.",
      icon: DollarSign,
    },
    {
      title: "Withdraw Earnings",
      description: "Request withdrawals to your PayPal account anytime you want.",
      icon: Wallet,
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">How Amazon Jobs Works</h1>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Welcome to Amazon Jobs!</h2>
        <p className="text-white/90">Learn how to maximize your earnings with our platform</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <step.icon className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  Step {index + 1}: {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card
        className="bg-gradient-to-r from-green-600 to-green-700 border-0 p-6 text-white cursor-pointer hover:from-green-700 hover:to-green-800 transition-all"
        onClick={onStartEarning}
      >
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8" />
          <div>
            <h3 className="font-bold text-lg">Start Earning Today!</h3>
            <p className="text-white/90">Complete your first review and get paid within 24 hours</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

function ReviewsView({ availableReviews, onReviewClick }: any) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Available Reviews</h1>

      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Start Reviewing Products</h2>
        <p className="text-white/90">Choose a product below and start earning money today!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableReviews.map((review: any) => (
          <Card key={review.id} className="bg-gray-900 border-gray-800 overflow-hidden">
            <div className="aspect-4/3 relative">
              <img src={review.image || "/placeholder.svg"} alt={review.name} className="w-full h-full object-cover" />
              <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0">Earn ${review.reward}</Badge>
            </div>
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-lg text-white">{review.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Review & Earn</span>
              </div>
              <Button onClick={onReviewClick} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Review Immediately
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ProductReviewView({ product, onStartReview, isProcessing }: any) {
  if (!product) return null

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Product Review</h1>

      <Card className="bg-gray-900 border-gray-800 overflow-hidden">
        <div className="aspect-video relative">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          <Badge className="absolute top-4 right-4 bg-green-500 text-white border-0 text-lg px-4 py-2">
            Earn ${product.reward}
          </Badge>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
            <div className="flex items-center gap-2 text-gray-400">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Product Review Task</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-white">Review Requirements:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Write an honest review about the product</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Minimum 50 words required</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Include product quality and experience details</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Submit within 24 hours</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 text-white">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8" />
              <div>
                <p className="text-sm text-white/80">You will earn</p>
                <p className="text-2xl font-bold">${product.reward}.00</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-sm text-yellow-400">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Payment will be processed immediately after review submission and approval.
            </p>
          </div>

          <Button
            onClick={onStartReview}
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Star className="w-5 h-5 mr-2" />
                Start Review
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}

function VIPView({ onUpgrade }: any) {
  const benefits = [
    "Priority access to high-paying reviews",
    "Exclusive products not available to regular members",
    "Higher earning rates (up to $100 per review)",
    "Faster payment processing",
    "Dedicated VIP support",
    "Monthly bonus rewards",
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">VIP Membership</h1>

      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Crown className="w-10 h-10" />
          <div>
            <h2 className="text-2xl font-bold">Become a VIP Member</h2>
            <p className="text-white/90">Unlock exclusive benefits and earn more</p>
          </div>
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-800 p-6">
        <h3 className="text-xl font-bold mb-4">VIP Benefits</h3>
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">{benefit}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-0 p-8 text-center text-white">
        <Crown className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">VIP Membership</h3>
        <p className="text-4xl font-bold mb-2">$49.99</p>
        <p className="text-white/80 mb-6">One-time payment • Lifetime access</p>
        {/* CHANGE: Added Hotmart payment link to VIP upgrade button */}
        <a
          href="https://pay.hotmart.com/F101935913S?off=adx9i1ez"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full bg-white text-purple-700 hover:bg-gray-100 py-6 text-lg font-semibold rounded-lg transition-colors"
        >
          <Award className="w-5 h-5 mr-2" />
          Upgrade to VIP Now
        </a>
      </Card>
    </div>
  )
}

function InviteView({ referralCode }: any) {
  const [copied, setCopied] = useState(false)

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferralLink = () => {
    const referralLink = "https://ofsignup.vercel.app"

    // Try to use Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: "Join Amazon Jobs",
          text: `Use my referral code ${referralCode} to join Amazon Jobs and start earning!`,
          url: referralLink,
        })
        .catch((error) => {
          console.log("[v0] Error sharing:", error)
          // Fallback: open in new tab
          window.open(referralLink, "_blank", "noopener,noreferrer")
        })
    } else {
      // Fallback: open in new tab
      window.open(referralLink, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Invite Friends</h1>

      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Earn $25 Per Referral</h2>
        <p className="text-white/90">Invite friends and earn bonus rewards for each successful referral</p>
      </div>

      <Card className="bg-gray-900 border-gray-800 p-6">
        <h3 className="text-lg font-bold mb-4">Your Referral Code</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralCode}
            readOnly
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono"
          />
          <Button onClick={copyReferralCode} className="bg-orange-600 hover:bg-orange-700">
            {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </Button>
        </div>
      </Card>

      <Card className="bg-gray-900 border-gray-800 p-6">
        <h3 className="text-lg font-bold mb-4">How It Works</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-500 font-bold">1</span>
            </div>
            <div>
              <p className="font-semibold">Share Your Code</p>
              <p className="text-sm text-gray-400">Send your referral code to friends and family</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-500 font-bold">2</span>
            </div>
            <div>
              <p className="font-semibold">They Sign Up</p>
              <p className="text-sm text-gray-400">Your friend creates an account using your code</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-500 font-bold">3</span>
            </div>
            <div>
              <p className="font-semibold">Earn Rewards</p>
              <p className="text-sm text-gray-400">Get $25 bonus when they complete their first review</p>
            </div>
          </div>
        </div>
      </Card>

      <Button
        onClick={shareReferralLink}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
      >
        <Share2 className="w-5 h-5 mr-2" />
        Share Referral Link
      </Button>
    </div>
  )
}

function ProfileView({ userData }: any) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <Card className="bg-gray-900 border-gray-800 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-2xl font-bold text-white">
            {userData.initials}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-gray-400">{userData.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
            <input
              type="text"
              value={userData.name}
              readOnly
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
            <input
              type="email"
              value={userData.email}
              readOnly
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">PayPal Account</label>
            <input
              type="email"
              value={userData.paypal}
              readOnly
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
            />
          </div>
        </div>
      </Card>

      <Card className="bg-gray-900 border-gray-800 p-6">
        <h3 className="text-lg font-bold mb-4">Account Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Total Earned</p>
            <p className="text-2xl font-bold text-green-400">$265.00</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Reviews Completed</p>
            <p className="text-2xl font-bold text-blue-400">3</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Referrals</p>
            <p className="text-2xl font-bold text-purple-400">0</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Member Since</p>
            <p className="text-2xl font-bold text-orange-400">Jan 2025</p>
          </div>
        </div>
      </Card>

      <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-4">Sign Out</Button>
    </div>
  )
}

function ReviewTaskView({ product, currentBalance, onSubmit }: any) {
  return (
    <div className="space-y-0 -mx-4 -my-6">
      {/* Header with Balance */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-4">
        <p className="text-white text-center text-xl font-bold">BALANCE: ${currentBalance.toFixed(2)}</p>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-orange-500 text-center">RATE AND WIN ${product.reward}.00</h1>

        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white text-center">{product.question}</h2>

          {/* Duplicate question text as shown in the image */}
          <div className="flex items-center gap-2 text-gray-400 justify-center">
            <span className="text-sm">{product.question}</span>
            <span className="text-blue-400">⬇️</span>
          </div>

          {/* Yes/No Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              onClick={() => onSubmit("yes")}
              className="bg-orange-600 hover:bg-orange-700 text-white py-8 text-2xl font-bold rounded-lg"
            >
              Yes
            </Button>
            <Button
              onClick={() => onSubmit("no")}
              className="bg-orange-600 hover:bg-orange-700 text-white py-8 text-2xl font-bold rounded-lg"
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
