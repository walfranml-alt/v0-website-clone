"use client"

import { useState } from "react"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
  Clock,
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
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentBalance, setCurrentBalance] = useState(204)
  const [reviewsCompleted, setReviewsCompleted] = useState(0)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [showUpdatedBalanceModal, setShowUpdatedBalanceModal] = useState(false)
  const [lastEarning, setLastEarning] = useState(0)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawEmail, setWithdrawEmail] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [notifications] = useState([
    {
      id: 1,
      title: "Welcome!",
      message: "Welcome to Amazon Reviews! Start completing reviews to earn money.",
      time: "Just now",
      unread: true,
    },
    {
      id: 2,
      title: "Balance Available",
      message: "You have $204 available in your account ready to withdraw!",
      time: "5 mins ago",
      unread: true,
    },
    {
      id: 3,
      title: "Action Required",
      message: "Watch the video to unlock your withdrawal and cash out your earnings.",
      time: "10 mins ago",
      unread: true,
    },
  ])

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
    setActiveView("tabs")
    setActiveTab("dashboard")
  }

  // HomeView Component
  const HomeView = () => (
    <div className="space-y-6">
      {/* VSL Video Section */}
      <section className="relative rounded-lg overflow-hidden bg-gray-900">
        <div className="aspect-video w-full">
          <vturb-smartplayer
            id="vid-68e5bb23787da31935e6c11b"
            style={{ display: "block", margin: "0 auto", width: "100%" }}
          />
        </div>
      </section>

      {/* VSL Scripts */}
      <Script id="vsl-player-script" strategy="afterInteractive">
        {`
          var s=document.createElement("script"); 
          s.src="https://scripts.converteai.net/e4ba7497-8d0b-4111-9783-5566e7473886/players/68e5bb23787da31935e6c11b/v4/player.js";
          s.async=true;
          document.head.appendChild(s);
        `}
      </Script>

      <Script id="vsl-performance" strategy="beforeInteractive">
        {`
          !function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);
        `}
      </Script>

      {/* Step-by-step checklist */}
      <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="space-y-3">
          {/* Step 1 - Completed */}
          <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex-shrink-0">
              1
            </div>
            <p className="text-sm flex-1">Assessments Performed</p>
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-green-500 text-sm font-semibold">Ok</span>
          </div>

          {/* Step 2 - Completed */}
          <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex-shrink-0">
              2
            </div>
            <p className="text-sm flex-1">Registered data</p>
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-green-500 text-sm font-semibold">Ok</span>
          </div>

          {/* Step 3 - Not completed */}
          <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex-shrink-0">
              3
            </div>
            <p className="text-sm flex-1">Watch the video to withdraw your balance</p>
            <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
          </div>
        </div>
      </section>

      {/* Social Proof Testimonials */}
      <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-lg font-bold border-l-4 border-yellow-500 pl-3 mb-4">What Our Users Say</h2>
        <div className="space-y-4">
          {/* Testimonial 1 - Withdrawal released after video */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <img src="/profile-1.png" alt="Jessica M." className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">Jessica M.</h3>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-gray-300">
                  "I watched the video and my withdrawal was released immediately! Got my $204 in my PayPal within
                  hours. This is legit! 🎉"
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 - Paid activation fee, got profits same day */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <img src="/profile-2.png" alt="Michael R." className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">Michael R.</h3>
                  <span className="text-xs text-gray-400">5 hours ago</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-gray-300">
                  "I was skeptical about the activation fee, but I paid it and made profits the same day! Already earned
                  back 3x what I paid. Best decision ever! 💰"
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 - Fast and easy process */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <img src="/profile-3.png" alt="Sarah L." className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">Sarah L.</h3>
                  <span className="text-xs text-gray-400">1 day ago</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-gray-300">
                  "Super easy! Completed 3 reviews in 10 minutes and cashed out. The whole process was smooth and fast.
                  Highly recommend! ⚡"
                </p>
              </div>
            </div>
          </div>
        </div>
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
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{currentProduct.question}</h3>
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Withdraw Funds</h1>

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
              <label className="block text-sm font-medium mb-2 text-white">PayPal Email</label>
              <input
                type="email"
                value={withdrawEmail}
                onChange={(e) => setWithdrawEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Withdraw Amount</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder:text-gray-400"
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
              <p className="text-xl font-bold text-white">${currentBalance.toFixed(2)}</p>
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
              <p className="text-xl font-bold text-white">{reviewsCompleted}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <Card className="bg-gray-900 border-gray-800 p-6">
        <h2 className="text-lg font-bold mb-4 text-white">Quick Actions</h2>
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">System Tutorial</h1>

      <Card className="bg-gray-900 border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4 text-white">How It Works</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">1</span>
            </div>
            <div>
              <h3 className="font-bold mb-1 text-white">Complete Reviews</h3>
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
              <h3 className="font-bold mb-1 text-white">Earn Money</h3>
              <p className="text-gray-400 text-sm">Get paid $35-$55 for each product review you complete.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <h3 className="font-bold mb-1 text-white">Withdraw Funds</h3>
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
            After verification, your full access to the official Amazon Reviews App and your $204 withdrawal will be
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

  // TabsView Component
  const TabsView = () => (
    <div className="space-y-6 pb-24">
      {/* Tab Navigation */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-[73px] z-30 -mx-4 px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex-1 min-w-[100px] py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "dashboard"
                ? "border-yellow-500 text-yellow-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Start Review
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex-1 min-w-[100px] py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "withdraw"
                ? "border-yellow-500 text-yellow-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Withdraw
          </button>
          <button
            onClick={() => setActiveTab("giftcards")}
            className={`flex-1 min-w-[100px] py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "giftcards"
                ? "border-yellow-500 text-yellow-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            GiftCards
          </button>
          <button
            onClick={() => setActiveTab("tutorial")}
            className={`flex-1 min-w-[100px] py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "tutorial"
                ? "border-yellow-500 text-yellow-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            System Tutorial
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "withdraw" && <WithdrawView />}
        {activeTab === "giftcards" && <GiftCardsView />}
        {activeTab === "tutorial" && <TutorialView />}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Preload links for VSL */}
      <link
        rel="preload"
        href="https://scripts.converteai.net/e4ba7497-8d0b-4111-9783-5566e7473886/players/68e5bb23787da31935e6c11b/v4/player.js"
        as="script"
      />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link
        rel="preload"
        href="https://cdn.converteai.net/e4ba7497-8d0b-4111-9783-5566e7473886/68e5bb005efcf3a1ee618643/main.m3u8"
        as="fetch"
      />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://api.vturb.com.br" />

      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-2xl font-bold">
              <span className="text-white">amazon</span>
              <span className="text-orange-500">reviews</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="w-5 h-5" />
                {/* Notification badge */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-bold text-lg">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{notification.title}</h4>
                            <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowSideMenu(true)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {showSideMenu && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowSideMenu(false)} />

          {/* Side Menu Drawer */}
          <div className="fixed top-0 left-0 h-full w-80 bg-gray-900 border-r border-gray-800 z-50 shadow-2xl animate-in slide-in-from-left">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-1 text-xl font-bold">
                <span className="text-white">amazon</span>
                <span className="text-orange-500">reviews</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowSideMenu(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-14 text-base hover:bg-gray-800"
                onClick={() => {
                  setActiveView("tabs")
                  setActiveTab("dashboard")
                  setShowSideMenu(false)
                }}
              >
                <Building2 className="w-5 h-5 text-orange-500" />
                <span className="text-white">Start Review</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-14 text-base hover:bg-gray-800"
                onClick={() => {
                  setActiveView("tabs")
                  setActiveTab("withdraw")
                  setShowSideMenu(false)
                }}
              >
                <Wallet className="w-5 h-5 text-orange-500" />
                <span className="text-white">Withdraw</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-14 text-base hover:bg-gray-800"
                onClick={() => {
                  setActiveView("tabs")
                  setActiveTab("giftcards")
                  setShowSideMenu(false)
                }}
              >
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <span>GiftCards</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-14 text-base hover:bg-gray-800"
                onClick={() => {
                  setActiveView("tabs")
                  setActiveTab("tutorial")
                  setShowSideMenu(false)
                }}
              >
                <GraduationCap className="w-5 h-5 text-orange-500" />
                <span className="text-white">System Tutorial</span>
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Main content */}
      <main className="container mx-auto p-4 max-w-2xl">
        {activeView === "home" && <HomeView />}
        {activeView === "tabs" && <TabsView />}
        {activeView === "review-task" && <ReviewTaskView />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-40">
        <div className="flex items-center justify-around p-2">
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 flex-1 ${
              activeView === "tabs" && activeTab === "dashboard" ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => {
              setActiveView("tabs")
              setActiveTab("dashboard")
            }}
          >
            <Building2 className="w-5 h-5" />
            <span className={`text-xs ${activeView === "tabs" && activeTab === "dashboard" ? "" : "text-white"}`}>
              Start Review
            </span>
          </Button>

          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 flex-1 ${
              activeView === "tabs" && activeTab === "withdraw" ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => {
              setActiveView("tabs")
              setActiveTab("withdraw")
            }}
          >
            <Wallet className="w-5 h-5" />
            <span className={`text-xs ${activeView === "tabs" && activeTab === "withdraw" ? "" : "text-white"}`}>
              Withdraw
            </span>
          </Button>

          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 flex-1 ${
              activeView === "tabs" && activeTab === "giftcards" ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => {
              setActiveView("tabs")
              setActiveTab("giftcards")
            }}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">GiftCards</span>
          </Button>

          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 flex-1 ${
              activeView === "tabs" && activeTab === "tutorial" ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => {
              setActiveView("tabs")
              setActiveTab("tutorial")
            }}
          >
            <GraduationCap className="w-5 h-5" />
            <span className={`text-xs ${activeView === "tabs" && activeTab === "tutorial" ? "" : "text-white"}`}>
              System Tutorial
            </span>
          </Button>
        </div>
      </nav>

      {/* Modals */}
      <UpdatedBalanceModal />
      <VerificationModal />
    </div>
  )
}
