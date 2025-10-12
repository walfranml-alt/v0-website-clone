"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  CheckCircle2,
  Wallet,
  Building2,
  TrendingUp,
  GraduationCap,
  Bell,
  Menu,
  Gift,
  DollarSign,
  Shield,
  X,
  ChevronLeft,
} from "lucide-react"

// Transaction interface
interface Transaction {
  id: number
  userName: string
  product: string
  amount: number
  date: string
  status: string
  type: string
}

export default function Dashboard() {
  const [activeView, setActiveView] = useState("home")
  const [currentBalance, setCurrentBalance] = useState(102)
  const [reviewsCompleted, setReviewsCompleted] = useState(0)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [showUpdatedBalanceModal, setShowUpdatedBalanceModal] = useState(false)
  const [lastEarning, setLastEarning] = useState(0)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawEmail, setWithdrawEmail] = useState("")

  // Review products data
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

  // Recent transactions data
  const recentTransactions: Transaction[] = [
    {
      id: 1,
      userName: "Sarah M.",
      product: "Wireless Headphones Review",
      amount: 45,
      date: "2 mins",
      status: "Completed",
      type: "Review",
    },
    {
      id: 2,
      userName: "John D.",
      product: "Smart Watch Review",
      amount: 55,
      date: "5 mins",
      status: "Completed",
      type: "Review",
    },
    {
      id: 3,
      userName: "Emma W.",
      product: "Laptop Stand Review",
      amount: 35,
      date: "8 mins",
      status: "Pending",
      type: "Review",
    },
  ]

  // Handle review answer
  const handleReviewAnswer = (answer: "yes" | "no") => {
    const currentProduct = reviewProducts[currentReviewIndex]
    const earning = currentProduct.reward

    // Update balance and show modal
    setLastEarning(earning)
    setCurrentBalance((prev) => prev + earning)
    setReviewsCompleted((prev) => prev + 1)
    setShowUpdatedBalanceModal(true)

    // After modal closes, move to next review or withdraw page
    setTimeout(() => {
      setShowUpdatedBalanceModal(false)
      if (reviewsCompleted + 1 >= 3) {
        // After 3 reviews, go to withdraw page
        setActiveView("withdraw")
      } else {
        // Move to next review
        setCurrentReviewIndex((prev) => prev + 1)
      }
    }, 3000)
  }

  // Handle withdraw
  const handleWithdraw = () => {
    if (!withdrawEmail || !withdrawAmount) {
      alert("Please fill in all fields")
      return
    }
    // Show verification modal
    setShowVerificationModal(true)
  }

  // Start review task
  const handleStartReview = () => {
    setCurrentReviewIndex(0)
    setReviewsCompleted(0)
    setActiveView("review-task")
  }

  // HomeView Component
  const HomeView = () => (
    <div className="space-y-6">
      {/* VSL Video Section */}
      <section className="relative rounded-lg overflow-hidden bg-gray-900">
        <div className="aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="VSL Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
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
          <Button variant="ghost" size="sm" className="text-gray-400" onClick={handleStartReview}>
            →
          </Button>
        </div>
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition-colors"
          onClick={handleStartReview}
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
            {recentTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all"
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

  // ReviewTaskView Component
  const ReviewTaskView = () => {
    const currentProduct = reviewProducts[currentReviewIndex]
    if (!currentProduct) return null

    return (
      <div className="space-y-6 pb-24">
        {/* Header with balance */}
        <div className="bg-orange-500 text-white py-4 px-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold">BALANCE: ${currentBalance.toFixed(2)}</h2>
        </div>

        {/* Review card */}
        <Card className="bg-white text-black p-6">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
            RATE AND WIN ${currentProduct.reward.toFixed(2)}
          </h2>

          {/* Product image */}
          <div className="mb-6">
            <img
              src={currentProduct.image || "/placeholder.svg"}
              alt={currentProduct.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Question */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">{currentProduct.question}</h3>
            <p className="text-gray-600 flex items-center gap-2">
              {currentProduct.question} <span className="text-blue-500">⬇️</span>
            </p>
          </div>

          {/* Answer buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleReviewAnswer("yes")}
              className="bg-orange-500 hover:bg-orange-600 text-white py-8 text-xl font-bold"
            >
              Yes
            </Button>
            <Button
              onClick={() => handleReviewAnswer("no")}
              className="bg-orange-500 hover:bg-orange-600 text-white py-8 text-xl font-bold"
            >
              No
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // WithdrawView Component
  const WithdrawView = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setActiveView("home")}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold">Withdraw Funds</h1>
      </div>

      <Card className="bg-gray-900 border-gray-800 p-6">
        <div className="space-y-6">
          {/* Current balance */}
          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <p className="text-gray-400 mb-2">Available Balance</p>
            <p className="text-4xl font-bold text-green-400">${currentBalance.toFixed(2)}</p>
          </div>

          {/* Withdraw form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">PayPal Email</label>
              <input
                type="email"
                value={withdrawEmail}
                onChange={(e) => setWithdrawEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Withdraw Amount</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <Button
              onClick={handleWithdraw}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Withdraw Now
            </Button>
          </div>

          {/* Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-400">
              💡 Withdrawals are processed within 24-48 hours to your PayPal account.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )

  // DashboardView Component
  const DashboardView = () => (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gray-900 border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Balance</p>
              <p className="text-xl font-bold">${currentBalance.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Reviews</p>
              <p className="text-xl font-bold">{reviewsCompleted}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <Card className="bg-gray-900 border-gray-800 p-6">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <Button onClick={handleStartReview} className="w-full bg-orange-500 hover:bg-orange-600 justify-start">
            <Star className="w-5 h-5 mr-2" />
            Start Review
          </Button>
          <Button
            onClick={() => setActiveView("withdraw")}
            className="w-full bg-green-600 hover:bg-green-700 justify-start"
          >
            <Wallet className="w-5 h-5 mr-2" />
            Withdraw Funds
          </Button>
        </div>
      </Card>
    </div>
  )

  // TutorialView Component
  const TutorialView = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setActiveView("home")}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold">System Tutorial</h1>
      </div>

      <Card className="bg-gray-900 border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">How It Works</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">1</span>
            </div>
            <div>
              <h3 className="font-bold mb-1">Complete Reviews</h3>
              <p className="text-gray-400 text-sm">
                Answer simple questions about products and earn rewards for each review.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">2</span>
            </div>
            <div>
              <h3 className="font-bold mb-1">Earn Money</h3>
              <p className="text-gray-400 text-sm">Get paid $35-$55 for each product review you complete.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <h3 className="font-bold mb-1">Withdraw Funds</h3>
              <p className="text-gray-400 text-sm">Cash out your earnings to PayPal within 24-48 hours.</p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleStartReview}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold"
        >
          Start Earning Today!
        </Button>
      </Card>
    </div>
  )

  // GiftCardsView Component
  const GiftCardsView = () => (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-bold">Gift Cards</h1>
      <Card className="bg-gray-900 border-gray-800 p-6">
        <div className="text-center py-12">
          <Gift className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">Gift cards coming soon!</p>
        </div>
      </Card>
    </div>
  )

  // UpdatedBalanceModal Component
  const UpdatedBalanceModal = () => {
    if (!showUpdatedBalanceModal) return null

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-teal-500 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-10 h-10 text-teal-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Updated balance</h2>
          <p className="text-2xl text-white">you received + ${lastEarning}</p>
        </div>
      </div>
    )
  }

  // VerificationModal Component
  const VerificationModal = () => {
    if (!showVerificationModal) return null

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-100 rounded-2xl p-8 max-w-md w-full relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => setShowVerificationModal(false)}
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-yellow-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Human verification required</h2>

          <p className="text-gray-700 text-center mb-4">
            Due to the high rate of abuse of the system, a verification fee is required to confirm that you are human.
          </p>

          <p className="text-gray-700 text-center mb-4">
            This one-time fee helps us maintain the quality of the platform and ensures legitimate reviewers.
          </p>

          <p className="text-red-600 font-bold text-center mb-4">
            DON'T WORRY, THE FEE IS ONLY FOR SECURITY PURPOSES AND WILL BE REFUNDED WITHIN 1 BUSINESS DAY.
          </p>

          <p className="text-gray-700 text-center mb-6">
            After verification, your full access to the official Amazon Jobs App and your $247 withdrawal will be
            authorized and credited to your PayPal account.
          </p>

          <Button
            onClick={() => window.open("https://pay.hotmart.com/S96367551A", "_blank")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
          >
            Proceed to verification
          </Button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By proceeding, you agree to our{" "}
            <a href="#" className="text-blue-600">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img src="/amazon-logo.png" alt="Amazon Jobs" className="h-8" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4 max-w-2xl">
        {activeView === "home" && <HomeView />}
        {activeView === "dashboard" && <DashboardView />}
        {activeView === "review-task" && <ReviewTaskView />}
        {activeView === "withdraw" && <WithdrawView />}
        {activeView === "tutorial" && <TutorialView />}
        {activeView === "giftcards" && <GiftCardsView />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-40">
        <div className="flex items-center justify-around p-2">
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 flex-1 ${
              activeView === "dashboard" ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("dashboard")}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-xs">Start Review</span>
          </Button>

          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 flex-1 ${
              activeView === "withdraw" ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("withdraw")}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs">Withdraw</span>
          </Button>

          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 flex-1 ${
              activeView === "giftcards" ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("giftcards")}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">GiftCards</span>
          </Button>

          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 flex-1 ${
              activeView === "tutorial" ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("tutorial")}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs">System Tutorial</span>
          </Button>
        </div>
      </nav>

      {/* Modals */}
      <UpdatedBalanceModal />
      <VerificationModal />
    </div>
  )
}
