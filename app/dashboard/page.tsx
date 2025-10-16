"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Star,
  CheckCircle2,
  Wallet,
  Bell,
  DollarSign,
  Shield,
  X,
  Clock,
  Menu,
  Building2,
  TrendingUp,
  GraduationCap,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react"

interface ToastNotification {
  id: number
  name: string
  message: string
  time: string
}

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
  const router = useRouter()

  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<"dashboard" | "withdraw" | "giftcards" | "tutorial" | null>(null)
  const [currentBalance, setCurrentBalance] = useState(204)
  const [reviewsCompleted, setReviewsCompleted] = useState(0) // Changed from 3 to 0
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [showUpdatedBalanceModal, setShowUpdatedBalanceModal] = useState(false)
  const [showVideoRequiredModal, setShowVideoRequiredModal] = useState(false)
  const [lastEarning, setLastEarning] = useState(0)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawEmail, setWithdrawEmail] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [showWatchProgress, setShowWatchProgress] = useState(true)
  const [showBonusBlock, setShowBonusBlock] = useState(false)
  const [showInitialBlocks, setShowInitialBlocks] = useState(true)
  const [showTestimonialVideos, setShowTestimonialVideos] = useState(false)

  const [toastNotifications, setToastNotifications] = useState<ToastNotification[]>([])
  const [notificationCount, setNotificationCount] = useState(0)

  const emailInputRef = useRef<HTMLInputElement>(null)
  const amountInputRef = useRef<HTMLInputElement>(null)

  const randomNames = [
    "Sarah Johnson",
    "Michael Chen",
    "Emma Williams",
    "James Rodriguez",
    "Olivia Martinez",
    "David Kim",
    "Sophia Anderson",
    "Daniel Brown",
    "Isabella Garcia",
    "Matthew Wilson",
    "Ava Taylor",
    "Christopher Lee",
    "Mia Thompson",
    "Andrew Davis",
    "Charlotte Moore",
    "Joshua Jackson",
    "Amelia White",
    "Ryan Harris",
    "Harper Clark",
    "Nicholas Lewis",
    "Evelyn Walker",
    "Brandon Hall",
    "Abigail Allen",
    "Tyler Young",
    "Emily King",
    "Kevin Wright",
    "Madison Scott",
    "Jason Green",
    "Elizabeth Adams",
    "Justin Baker",
  ]

  const getRandomName = () => {
    return randomNames[Math.floor(Math.random() * randomNames.length)]
  }

  const getRandomReviewCount = () => {
    return Math.floor(Math.random() * (100 - 50 + 1)) + 50 // 50-100
  }

  const calculateEarnings = (reviewCount: number) => {
    // Calculate earnings proportional to review count
    // 50 reviews = $300, 100 reviews = $500
    const minEarnings = 300
    const maxEarnings = 500
    const minReviews = 50
    const maxReviews = 100

    const earnings =
      minEarnings + ((reviewCount - minReviews) / (maxReviews - minReviews)) * (maxEarnings - minEarnings)
    return Math.round(earnings)
  }

  const generateNotificationMessage = () => {
    const name = getRandomName()
    const reviewCount = getRandomReviewCount()
    const earnings = calculateEarnings(reviewCount)

    const templates = [
      `${name} completed ${reviewCount} reviews and earned $${earnings}.`,
      `${name} withdrew $${earnings} for completing ${reviewCount} reviews.`,
      `${name} received $${earnings} in their account for completing ${reviewCount} reviews.`,
    ]

    const template = templates[Math.floor(Math.random() * templates.length)]

    return {
      name,
      message: template,
      time: "Just now",
    }
  }

  const addToastNotification = () => {
    if (notificationCount >= 30) return // Stop after 30 notifications

    const notification = generateNotificationMessage()
    const newNotification: ToastNotification = {
      id: Date.now(),
      ...notification,
    }

    setToastNotifications((prev) => [...prev, newNotification])
    setNotificationCount((prev) => prev + 1)

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setToastNotifications((prev) => prev.filter((n) => n.id !== newNotification.id))
    }, 5000)
  }

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
        setModalContent("withdraw")
        setShowModal(true)
      } else {
        // Move to next review
        setCurrentReviewIndex((prev) => prev + 1)
      }
    }, 3000)
  }

  const handleWithdraw = () => {
    setShowVideoRequiredModal(true)
  }

  // Start review task
  const handleStartReview = () => {
    // Show popup requiring video watch
    setShowVideoRequiredModal(true)
  }

  // Open modal function
  const openModal = (content: "dashboard" | "withdraw" | "giftcards" | "tutorial") => {
    setShowNotifications(false) // Close notifications when opening modal
    setModalContent(content)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalContent(null)
  }

  const ToastNotificationComponent = ({ notification }: { notification: ToastNotification }) => (
    <div
      className="bg-white text-black rounded-lg shadow-2xl p-3 mb-2 animate-in slide-in-from-top duration-300 border-l-4 border-green-500"
      style={{ minWidth: "280px", maxWidth: "320px" }}
    >
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
          <img src="/amazon-icon.png" alt="Amazon" className="w-8 h-8 object-contain" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h4 className="font-bold text-xs">Amazon Reviews</h4>
            <span className="text-[10px] text-gray-500">{notification.time}</span>
          </div>
          <p className="text-xs text-gray-700 leading-tight">{notification.message}</p>
        </div>
      </div>
    </div>
  )

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

      {/* Step-by-step checklist */}
      <section className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Unlock All App Features</h2>
          <p className="text-sm text-gray-400">
            Complete the final step to unlock full access to withdrawals and all app functionalities
          </p>
        </div>

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

          {/* PayPal Account Label */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">PayPal account</label>

            {/* Email field - auto-filled with user's email */}
            <div className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white">
              {userEmail || "email@example.com"}
            </div>
          </div>

          {/* Withdrawal Amount field - auto-filled with $204.00 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">Withdrawal Amount</label>
            <div className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white">$204.00</div>
          </div>

          <Button
            onClick={handleWithdraw}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
          >
            <Wallet className="w-5 h-5 mr-2" />
            Withdraw Now
          </Button>

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
    <div className="space-y-6">
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
            onClick={() => openModal("withdraw")}
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
              <h3 className="font-bold mb-1 text-white">Watch the Video</h3>
              <p className="text-gray-400 text-sm">
                Watch the entire video on the home page to unlock the rest of the features: complete reviews, earn
                money, and withdraw.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">2</span>
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
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <h3 className="font-bold mb-1 text-white">Earn Money</h3>
              <p className="text-gray-400 text-sm">Get paid $35-$55 for each product review you complete.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">4</span>
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

      <div className="space-y-4">
        {/* Amazon Gift Card - $450 */}
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-24 md:w-32 h-20 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-lg flex flex-col items-center justify-center flex-shrink-0 shadow-lg border-2 border-orange-300">
              <span className="text-white font-bold text-2xl md:text-3xl mb-1">$450</span>
              <span className="text-white text-xs font-semibold">AMAZON</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Amazon</h3>
              <p className="text-xl md:text-2xl font-bold text-green-400">$450</p>
              <p className="text-xs md:text-sm text-gray-400">Redeem for Amazon purchases</p>
            </div>
            <Button
              onClick={() => setShowVideoRequiredModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >
              Redeem
            </Button>
          </div>
        </Card>

        {/* Walmart Gift Card */}
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-24 md:w-32 h-20 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg flex flex-col items-center justify-center flex-shrink-0 shadow-lg border-2 border-blue-300">
              <span className="text-white font-bold text-2xl md:text-3xl mb-1">$300</span>
              <span className="text-white text-xs font-semibold">WALMART</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Walmart</h3>
              <p className="text-xl md:text-2xl font-bold text-green-400">$300</p>
              <p className="text-xs md:text-sm text-gray-400">Use at Walmart stores & online</p>
            </div>
            <Button
              onClick={() => setShowVideoRequiredModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >
              Redeem
            </Button>
          </div>
        </Card>

        {/* Target Gift Card */}
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-24 md:w-32 h-20 bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-lg flex flex-col items-center justify-center flex-shrink-0 shadow-lg border-2 border-red-300">
              <span className="text-white font-bold text-2xl md:text-3xl mb-1">$250</span>
              <span className="text-white text-xs font-semibold">TARGET</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Target</h3>
              <p className="text-xl md:text-2xl font-bold text-green-400">$250</p>
              <p className="text-xs md:text-sm text-gray-400">Shop at Target stores & online</p>
            </div>
            <Button
              onClick={() => setShowVideoRequiredModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >
              Redeem
            </Button>
          </div>
        </Card>

        {/* Best Buy Gift Card */}
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-24 md:w-32 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg flex flex-col items-center justify-center flex-shrink-0 shadow-lg border-2 border-yellow-300">
              <span className="text-white font-bold text-2xl md:text-3xl mb-1">$350</span>
              <span className="text-white text-xs font-semibold">BEST BUY</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Best Buy</h3>
              <p className="text-xl md:text-2xl font-bold text-green-400">$350</p>
              <p className="text-xs md:text-sm text-gray-400">Electronics & tech products</p>
            </div>
            <Button
              onClick={() => setShowVideoRequiredModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >
              Redeem
            </Button>
          </div>
        </Card>

        {/* Starbucks Gift Card */}
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-24 md:w-32 h-20 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-lg flex flex-col items-center justify-center flex-shrink-0 shadow-lg border-2 border-green-300">
              <span className="text-white font-bold text-2xl md:text-3xl mb-1">$100</span>
              <span className="text-white text-xs font-semibold">STARBUCKS</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Starbucks</h3>
              <p className="text-xl md:text-2xl font-bold text-green-400">$100</p>
              <p className="text-xs md:text-sm text-gray-400">Coffee & beverages</p>
            </div>
            <Button
              onClick={() => setShowVideoRequiredModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >
              Redeem
            </Button>
          </div>
        </Card>

        {/* Apple Gift Card */}
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-24 md:w-32 h-20 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-lg flex flex-col items-center justify-center flex-shrink-0 shadow-lg border-2 border-gray-600">
              <span className="text-white font-bold text-2xl md:text-3xl mb-1">$400</span>
              <span className="text-white text-xs font-semibold">APPLE</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Apple</h3>
              <p className="text-xl md:text-2xl font-bold text-green-400">$400</p>
              <p className="text-xs md:text-sm text-gray-400">App Store, iTunes & Apple products</p>
            </div>
            <Button
              onClick={() => setShowVideoRequiredModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >
              Redeem
            </Button>
          </div>
        </Card>
      </div>
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
            onClick={() => window.open("https://pay.hotmart.com/O102095023L?off=tvbvnt76", "_blank")}
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

  // ContentModal Component
  const ContentModal = () => {
    if (!showModal || !modalContent) return null

    return (
      <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
        <div className="min-h-screen p-4">
          {/* Close button */}
          <div className="sticky top-0 z-10 flex justify-end mb-4">
            <Button
              onClick={closeModal}
              variant="ghost"
              size="icon"
              className="bg-gray-900 hover:bg-gray-800 rounded-full w-12 h-12"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Modal content */}
          <div className="max-w-2xl mx-auto">
            {modalContent === "dashboard" && <DashboardView />}
            {modalContent === "withdraw" && <WithdrawView />}
            {modalContent === "giftcards" && <GiftCardsView />}
            {modalContent === "tutorial" && <TutorialView />}
          </div>
        </div>
      </div>
    )
  }

  // VideoRequiredModal Component
  const VideoRequiredModal = () => {
    if (!showVideoRequiredModal) return null

    const handleGoToVideo = () => {
      setShowVideoRequiredModal(false)
      // Close any open modals
      setShowModal(false)
      setModalContent(null)
      // Scroll to top where video is located
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 border border-orange-500 rounded-2xl p-8 max-w-md w-full relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 hover:bg-gray-800"
            onClick={() => setShowVideoRequiredModal(false)}
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-orange-500" />
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-4">Access Locked</h2>

          <p className="text-gray-300 text-center mb-4">
            Reviews and withdrawals are only unlocked after watching the video on the home page.
          </p>

          <p className="text-orange-400 font-semibold text-center mb-6">
            Watch the video first to unlock all app functionalities including reviews, withdrawals, and exclusive Amazon
            platform discounts.
          </p>

          <Button
            onClick={handleGoToVideo}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold"
          >
            Got it! I'll watch the video
          </Button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    const registered = localStorage.getItem("userRegistered")
    if (!registered) {
      router.push("/signup")
      return
    }

    const name = localStorage.getItem("userName")
    const email = localStorage.getItem("userEmail")
    if (name) setUserName(name)
    if (email) setUserEmail(email)
  }, [router])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWatchProgress(false)
      setShowBonusBlock(true)
      setShowInitialBlocks(false)
      // This is where the change is applied:
      setShowTestimonialVideos(true)
    }, 720000) // 720 seconds = 720,000 milliseconds (12 minutes exactly)

    return () => {
      clearTimeout(timer)
    }
  }, []) // Empty dependency array - only runs once on mount

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      addToastNotification()
    }, 50000) // 50 seconds

    return () => {
      clearInterval(notificationInterval)
    }
  }, [notificationCount]) // Depends on notificationCount to stop after 30 notifications

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] pointer-events-none">
        <div className="flex flex-col items-center pointer-events-auto">
          {toastNotifications.map((notification) => (
            <ToastNotificationComponent key={notification.id} notification={notification} />
          ))}
        </div>
      </div>

      {/* VSL player scripts */}
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
      <link
        rel="preload"
        href="https://scripts.converteai.net/e4ba7497-8d0b-4111-9783-5566e7473886/players/68f03359d6d30b2b96ddf6db/v4/player.js"
        as="script"
      />
      <link
        rel="preload"
        href="https://cdn.converteai.net/e4ba7497-8d0b-4111-9783-5566e7473886/68f0334e968c4bcb4b23cfec/main.m3u8"
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
            <img src="/amazon-reviews-logo.png" alt="Amazon Reviews" className="h-8 w-auto object-contain" />
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
                  <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <h3 className="font-bold text-lg">Notifications</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowNotifications(false)}
                      className="h-8 w-8 hover:bg-gray-800"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[
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
                    ].map((notification) => (
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

      {/* Side Menu Drawer */}
      {showSideMenu && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowSideMenu(false)} />

          {/* Side Menu Drawer */}
          <div className="fixed top-0 left-0 h-full w-80 bg-gray-900 border-r border-gray-800 z-50 shadow-2xl animate-in slide-in-from-left">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <img src="/amazon-reviews-logo.png" alt="Amazon Reviews" className="h-6 w-auto object-contain" />
              <Button variant="ghost" size="icon" onClick={() => setShowSideMenu(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                {/* User Avatar */}
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl font-bold">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg truncate">{userName || "User"}</h3>
                  <p className="text-sm text-gray-400 truncate">{userEmail || "user@email.com"}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-500">${currentBalance.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-14 text-base hover:bg-gray-800"
                onClick={() => {
                  setShowNotifications(false) // Close notifications
                  openModal("dashboard")
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
                  setShowNotifications(false) // Close notifications
                  openModal("withdraw")
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
                  setShowNotifications(false) // Close notifications
                  openModal("giftcards")
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
                  setShowNotifications(false) // Close notifications
                  openModal("tutorial")
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
        <div className="mb-4 text-center">
          <h1 className="text-lg md:text-xl font-bold text-white leading-tight">
            Watch the video to learn how to earn <span className="text-orange-500">$300 to $500 per day</span> with
            reviews on the Amazon Reviews app.
          </h1>
        </div>

        {/* VSL Video Section */}
        <section className="relative rounded-lg overflow-hidden bg-gray-900 mb-2">
          <div className="aspect-video w-full">
            <vturb-smartplayer
              id="vid-68e5bb23787da31935e6c11b"
              style={{ display: "block", margin: "0 auto", width: "100%" }}
            />
          </div>
        </section>

        {showWatchProgress && (
          <div className="flex justify-center mb-6">
            <div className="bg-gray-800 text-gray-500 px-6 py-3 rounded-full text-sm font-medium opacity-70 border border-gray-700">
              Watch 73% to unlock the app
            </div>
          </div>
        )}

        {showInitialBlocks && (
          <>
            {/* Step-by-step checklist */}
            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
              <div className="mb-4 text-center">
                <h2 className="text-xl font-bold text-white mb-2">Unlock All App Features</h2>
                <p className="text-sm text-gray-400">
                  Complete the final step to unlock full access to withdrawals and all app functionalities
                </p>
              </div>

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
            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
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
                        "I was skeptical about the activation fee, but I paid it and made profits the same day! Already
                        earned back 3x what I paid. Best decision ever! 💰"
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
                        "Super easy! Completed 3 reviews in 10 minutes and cashed out. The whole process was smooth and
                        fast. Highly recommend! ⚡"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {showBonusBlock && (
          <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-2 border-orange-500 rounded-2xl p-6 mb-6">
            <h2 className="text-base md:text-xl lg:text-2xl font-bold text-center text-white mb-6 leading-tight px-2">
              🎁 Pay the APP activation fee and receive all the bonuses below 🎁
            </h2>

            <div className="space-y-4">
              {/* Bonus 1 */}
              <div className="bg-gray-900/80 rounded-lg p-4 border border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-2">
                  🎁 BONUS 1 – Secret List of Brands That Pay the Most
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Receive an updated list of companies and brands that hire the most reviewers and pay in dollars, every
                  week.
                </p>
                <p className="text-white text-sm font-semibold">
                  Find out which brands are hiring now and pay up to $40 per review.
                </p>
              </div>

              {/* Bonus 2 */}
              <div className="bg-gray-900/80 rounded-lg p-4 border border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-2">
                  💬 BONUS 2 – Closed Group for Real Opportunities
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Join the private group where members share new opportunities daily, payment screenshots, and open
                  positions.
                </p>
                <p className="text-white text-sm font-semibold">Stay on top of new openings before everyone else.</p>
              </div>

              {/* Bonus 3 */}
              <div className="bg-gray-900/80 rounded-lg p-4 border border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-2">💵 BONUS 3 – $204 Welcome Bonus</h3>
                <p className="text-gray-300 text-sm mb-2">
                  When you activate your access, you unlock a $204 starting balance within the system, which can be used
                  to test products or withdraw.
                </p>
                <p className="text-white text-sm font-semibold">
                  Activate your access and receive $204 to get started.
                </p>
              </div>

              {/* Bonus 4 */}
              <div className="bg-gray-900/80 rounded-lg p-4 border border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-2">
                  🔒 BONUS 4 – Online Fraud Protection Guarantee
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Learn how to identify fake websites and fake hiring scams, ensuring that you only work with verified
                  companies.
                </p>
                <p className="text-white text-sm font-semibold">
                  Avoid falling for scams — know which websites actually pay.
                </p>
              </div>

              {/* Bonus 5 */}
              <div className="bg-gray-900/80 rounded-lg p-4 border border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-2">
                  🛒 BONUS 5 – Special Discounts on Amazon Products
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Get access to coupons and exclusive offers of up to 50% OFF on real Amazon products.
                </p>
                <p className="text-white text-sm font-semibold">
                  Save up to 50% on products that you can review and keep.
                </p>
              </div>

              {/* Bonus 6 */}
              <div className="bg-gray-900/80 rounded-lg p-4 border border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-2">👨‍💻 BONUS 6 – 1-on-1 VIP Support</h3>
                <p className="text-gray-300 text-sm mb-2">
                  Individual support via chat to help you set everything up and start reviewing on the same day.
                </p>
                <p className="text-white text-sm font-semibold">
                  Our team will accompany you until you receive your first payment.
                </p>
              </div>
            </div>
          </div>
        )}

        {showTestimonialVideos && (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
            <h2 className="text-xl font-bold text-center text-white mb-6">Watch What Our Users Are Saying</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Video 1 - Jessica M. */}
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative">
                <div className="aspect-[9/16] bg-black flex items-center justify-center relative">
                  <vturb-smartplayer
                    id="vid-68f03359d6d30b2b96ddf6db"
                    style={{ display: "block", margin: "0 auto", width: "100%", height: "100%" }}
                  />

                  {/* Bottom left - Profile and username */}
                  <div className="absolute bottom-4 left-3 flex items-center gap-2 z-20">
                    <img
                      src="/testimonial-profile-1.png"
                      alt="Jessica M."
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <span className="text-white text-xs font-semibold drop-shadow-lg">@jessica_m</span>
                  </div>

                  {/* Right side - Interaction buttons */}
                  <div className="absolute bottom-4 right-3 flex flex-col gap-4 z-20">
                    <div className="flex flex-col items-center">
                      <Heart className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">2.4K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">89</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Send className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">45</span>
                    </div>
                    <Bookmark className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Video 2 - Michael R. */}
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative">
                <div className="aspect-[9/16] bg-black flex items-center justify-center relative">
                  <vturb-smartplayer
                    id="vid-68f0316818eb30d1915ea476"
                    style={{ display: "block", margin: "0 auto", width: "100%", height: "100%" }}
                  />

                  {/* Bottom left - Profile and username */}
                  <div className="absolute bottom-4 left-3 flex items-center gap-2 z-20">
                    <img
                      src="/testimonial-profile-2.png"
                      alt="Michael R."
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <span className="text-white text-xs font-semibold drop-shadow-lg">@michael_r</span>
                  </div>

                  {/* Right side - Interaction buttons */}
                  <div className="absolute bottom-4 right-3 flex flex-col gap-4 z-20">
                    <div className="flex flex-col items-center">
                      <Heart className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">3.1K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">124</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Send className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">67</span>
                    </div>
                    <Bookmark className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Video 3 - Sarah L. */}
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative">
                <div className="aspect-[9/16] bg-black flex items-center justify-center relative">
                  <vturb-smartplayer
                    id="vid-68f03158d48459a22e5db457"
                    style={{ display: "block", margin: "0 auto", width: "100%", height: "100%" }}
                  />

                  {/* Bottom left - Profile and username */}
                  <div className="absolute bottom-4 left-3 flex items-center gap-2 z-20">
                    <img
                      src="/testimonial-profile-3.png"
                      alt="Sarah L."
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <span className="text-white text-xs font-semibold drop-shadow-lg">@sarah_l</span>
                  </div>

                  {/* Right side - Interaction buttons */}
                  <div className="absolute bottom-4 right-3 flex flex-col gap-4 z-20">
                    <div className="flex flex-col items-center">
                      <Heart className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">1.8K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">56</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Send className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">32</span>
                    </div>
                    <Bookmark className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Video 4 Placeholder */}
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative">
                <div className="aspect-[9/16] bg-black flex items-center justify-center relative">
                  <vturb-smartplayer
                    id="vid-68f0338418eb30d1915ea6f9"
                    style={{ display: "block", margin: "0 auto", width: "100%", height: "100%" }}
                  />

                  {/* Bottom left - Profile and username */}
                  <div className="absolute bottom-4 left-3 flex items-center gap-2 z-20">
                    <img
                      src="/testimonial-profile-4.png"
                      alt="David K."
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <span className="text-white text-xs font-semibold drop-shadow-lg">@david_k</span>
                  </div>

                  {/* Right side - Interaction buttons */}
                  <div className="absolute bottom-4 right-3 flex flex-col gap-4 z-20">
                    <div className="flex flex-col items-center">
                      <Heart className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">2.9K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">103</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Send className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">58</span>
                    </div>
                    <Bookmark className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Video 5 Placeholder */}
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative">
                <div className="aspect-[9/16] bg-black flex items-center justify-center relative">
                  <vturb-smartplayer
                    id="vid-68f033776a26dc6be25cd15d"
                    style={{ display: "block", margin: "0 auto", width: "100%", height: "100%" }}
                  />

                  {/* Bottom left - Profile and username */}
                  <div className="absolute bottom-4 left-3 flex items-center gap-2 z-20">
                    <img
                      src="/testimonial-profile-5.png"
                      alt="Ryan H."
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <span className="text-white text-xs font-semibold drop-shadow-lg">@ryan_h</span>
                  </div>

                  {/* Right side - Interaction buttons */}
                  <div className="absolute bottom-4 right-3 flex flex-col gap-4 z-20">
                    <div className="flex flex-col items-center">
                      <Heart className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">4.2K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">187</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Send className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">92</span>
                    </div>
                    <Bookmark className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Video 6 - James R. */}
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative">
                <div className="aspect-[9/16] bg-black flex items-center justify-center relative">
                  <vturb-smartplayer
                    id="vid-68f0336881e93bf7cd487b8c"
                    style={{ display: "block", margin: "0 auto", width: "100%", height: "100%" }}
                  />

                  {/* Bottom left - Profile and username */}
                  <div className="absolute bottom-4 left-3 flex items-center gap-2 z-20">
                    <img
                      src="/testimonial-profile-6.png"
                      alt="James R."
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <span className="text-white text-xs font-semibold drop-shadow-lg">@james_r</span>
                  </div>

                  {/* Right side - Interaction buttons */}
                  <div className="absolute bottom-4 right-3 flex flex-col gap-4 z-20">
                    <div className="flex flex-col items-center">
                      <Heart className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">3.5K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">142</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Send className="w-6 h-6 text-white drop-shadow-lg" />
                      <span className="text-white text-xs font-semibold drop-shadow-lg">78</span>
                    </div>
                    <Bookmark className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-40">
        <div className="flex items-center justify-around p-2">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 flex-1 text-gray-400"
            onClick={() => {
              setShowNotifications(false) // Close notifications
              openModal("dashboard")
            }}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-xs text-white">Start Review</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 flex-1 text-gray-400"
            onClick={() => {
              setShowNotifications(false) // Close notifications
              openModal("withdraw")
            }}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs text-white">Withdraw</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 flex-1 text-gray-400"
            onClick={() => {
              setShowNotifications(false) // Close notifications
              openModal("giftcards")
            }}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">GiftCards</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 flex-1 text-gray-400"
            onClick={() => {
              setShowNotifications(false) // Close notifications
              openModal("tutorial")
            }}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs text-white">System Tutorial</span>
          </Button>
        </div>
      </nav>

      {/* Content Modal */}
      <ContentModal />

      {/* Modals */}
      <UpdatedBalanceModal />
      <VerificationModal />
      <VideoRequiredModal />
    </div>
  )
}
