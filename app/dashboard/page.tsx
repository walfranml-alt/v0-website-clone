"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, CheckCircle2, Wallet, DollarSign, X, Clock } from "lucide-react"

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

const DownloadAppView = ({ setShowVideoRequiredModal }: { setShowVideoRequiredModal: (show: boolean) => void }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Download App</h1>
    <Card className="bg-gray-900 border-gray-800 p-6">
      <div className="text-center py-10">
        <h2 className="text-xl font-bold text-white mb-6">Download Our Mobile App</h2>
        <p className="text-gray-400 mb-8">Get the best experience with our mobile app</p>

        {/* App Store Buttons Image - Clickable */}
        <div
          onClick={() => setShowVideoRequiredModal(true)}
          className="cursor-pointer inline-block hover:opacity-80 transition-opacity"
        >
          <img
            src="/app-store-buttons.png"
            alt="Download on App Store and Google Play"
            className="w-full max-w-xs mx-auto"
          />
        </div>
      </div>
    </Card>
  </div>
)

export default function Dashboard() {
  const router = useRouter()

  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<
    "dashboard" | "withdraw" | "giftcards" | "tutorial" | "download" | null
  >(null)
  const [currentBalance, setCurrentBalance] = useState(204)
  const [reviewsCompleted, setReviewsCompleted] = useState(0)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [showUpdatedBalanceModal, setShowUpdatedBalanceModal] = useState(false)
  const [showVideoRequiredModal, setShowVideoRequiredModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [lastEarning, setLastEarning] = useState(0)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawEmail, setWithdrawEmail] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [showWatchProgress, setShowWatchProgress] = useState(false)
  const [showBonusBlock, setShowBonusBlock] = useState(false)
  const [showInitialBlocks, setShowInitialBlocks] = useState(true)
  const [shouldShowEarningsNotifications, setShouldShowEarningsNotifications] = useState(true)

  const [toastNotifications, setToastNotifications] = useState<ToastNotification[]>([])
  const [notificationCount, setNotificationCount] = useState(0)

  const [currentCheckoutLink, setCurrentCheckoutLink] = useState("")
  const [lastCheckoutIndex, setLastCheckoutIndex] = useState<number | null>(null)

  const emailInputRef = useRef<HTMLInputElement>(null)
  const amountInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    if (!shouldShowEarningsNotifications) return
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
  const openModal = (content: "dashboard" | "withdraw" | "giftcards" | "tutorial" | "download") => {
    // Added "download" type
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

          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">PayPal account</label>
            <input
              type="email"
              value={withdrawEmail || userEmail}
              onChange={(e) => setWithdrawEmail(e.target.value)}
              placeholder="Enter your PayPal email"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">Withdrawal Amount</label>
            <input
              type="number"
              value={withdrawAmount || "204.00"}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter amount to withdraw"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
              step="0.01"
              min="0"
              max={currentBalance}
            />
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
              <p className="text-xs md:text-sm text-gray-400">Use at Target stores & online</p>
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

  // Main Dashboard Component
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50">
        {showNotifications && (
          <div className="space-y-2">
            {toastNotifications.map((notification) => (
              <ToastNotificationComponent key={notification.id} notification={notification} />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {modalContent === "download" ? (
          <DownloadAppView setShowVideoRequiredModal={setShowVideoRequiredModal} />
        ) : modalContent === "withdraw" ? (
          <WithdrawView />
        ) : modalContent === "giftcards" ? (
          <GiftCardsView />
        ) : modalContent === "tutorial" ? (
          <TutorialView />
        ) : (
          <HomeView />
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
              <Button onClick={closeModal} className="absolute top-4 right-4 text-white">
                <X className="w-5 h-5" />
              </Button>

              {modalContent === "download" && <DownloadAppView setShowVideoRequiredModal={setShowVideoRequiredModal} />}
              {modalContent === "withdraw" && <WithdrawView />}
              {modalContent === "giftcards" && <GiftCardsView />}
              {modalContent === "tutorial" && <TutorialView />}
              {modalContent === "dashboard" && <DashboardView />}
            </div>
          </div>
        )}

        {/* Video Required Modal */}
        {showVideoRequiredModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
              <Button onClick={() => setShowVideoRequiredModal(false)} className="absolute top-4 right-4 text-white">
                <X className="w-5 h-5" />
              </Button>

              <h2 className="text-2xl font-bold mb-4">Watch Video to Unlock</h2>
              <p className="text-gray-400 mb-6">Please watch the video to unlock this feature.</p>
              <Button
                onClick={() => setShowVideoRequiredModal(false)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Video Watched
              </Button>
            </div>
          </div>
        )}

        {/* Updated Balance Modal */}
        {showUpdatedBalanceModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
              <Button onClick={() => setShowUpdatedBalanceModal(false)} className="absolute top-4 right-4 text-white">
                <X className="w-5 h-5" />
              </Button>

              <h2 className="text-2xl font-bold mb-4">Balance Updated</h2>
              <p className="text-gray-400 mb-6">Your balance has been updated by ${lastEarning.toFixed(2)}.</p>
              <Button
                onClick={() => setShowUpdatedBalanceModal(false)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
