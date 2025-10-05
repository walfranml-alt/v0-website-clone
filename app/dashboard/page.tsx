"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  GraduationCap,
  Wallet,
  Star,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  Menu,
  X,
  LogOut,
  Gift,
  Award,
  Users,
  Shield,
  AlertCircle,
  Play,
} from "lucide-react"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    paypal: "john@example.com",
    initials: "JD",
  })

  useEffect(() => {
    const savedName = localStorage.getItem("userName")
    const savedEmail = localStorage.getItem("userEmail")
    const savedPayPal = localStorage.getItem("userPayPal")

    if (savedName && savedEmail) {
      const nameParts = savedName.trim().split(" ")
      const initials =
        nameParts.length > 1
          ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
          : savedName.substring(0, 2).toUpperCase()

      setUserData({
        name: savedName,
        email: savedEmail,
        paypal: savedPayPal || savedEmail,
        initials: initials,
      })
    }
  }, [])

  const handleMenuClick = (tab: string) => {
    setActiveTab(tab)
    setShowVerificationModal(true)
  }

  const stats = {
    balance: 265,
    pendingReviews: 8,
    completedReviews: 0,
    trainingProgress: 0,
  }

  const availableProducts = [
    {
      id: 1,
      name: "Wireless Headphones Pro",
      image: "/product-1.jpg",
      reward: 15.0,
      category: "Electronics",
      difficulty: "Easy",
      timeEstimate: "10-15 min",
    },
    {
      id: 2,
      name: "Smart Watch Elite",
      image: "/product-2.jpg",
      reward: 25.0,
      category: "Wearables",
      difficulty: "Medium",
      timeEstimate: "15-20 min",
    },
    {
      id: 3,
      name: "Coffee Maker Deluxe",
      image: "/product-3.jpg",
      reward: 18.0,
      category: "Home",
      difficulty: "Easy",
      timeEstimate: "10-15 min",
    },
    {
      id: 4,
      name: "Leather Backpack Premium",
      image: "/product-4.jpg",
      reward: 20.0,
      category: "Fashion",
      difficulty: "Medium",
      timeEstimate: "15-20 min",
    },
  ]

  const trainingModules = [
    {
      id: 1,
      title: "Product Review Basics",
      description: "Learn the fundamentals of writing effective product reviews",
      duration: "30 min",
      completed: true,
      reward: 10.0,
    },
    {
      id: 2,
      title: "Advanced Photography Tips",
      description: "Master product photography for better reviews",
      duration: "45 min",
      completed: true,
      reward: 15.0,
    },
    {
      id: 3,
      title: "Video Review Creation",
      description: "Create engaging video reviews that convert",
      duration: "60 min",
      completed: false,
      reward: 25.0,
    },
    {
      id: 4,
      title: "SEO for Reviews",
      description: "Optimize your reviews for maximum visibility",
      duration: "40 min",
      completed: false,
      reward: 20.0,
    },
  ]

  const recentTransactions = [
    { id: 1, type: "Review", product: "Luggage evaluation", amount: 45.0, date: "10 minutes", status: "Completed" },
    { id: 2, type: "Review", product: "Jordan Sneakers", amount: 55.0, date: "11 minutes", status: "Completed" },
    { id: 3, type: "Review", product: "Fire TV", amount: 65.0, date: "11 minutes", status: "Completed" },
    {
      id: 4,
      type: "Withdrawal",
      product: "PayPal Transfer",
      amount: 265.0,
      date: "15 minutes",
      status: "Pending activation",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <Image src="/amazon-jobs-logo.png" alt="Amazon Jobs" width={140} height={40} className="h-10 w-auto" />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <Button
              variant={activeTab === "overview" ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                activeTab === "overview"
                  ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleMenuClick("overview")}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Overview
            </Button>
            <Button
              variant={activeTab === "products" ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                activeTab === "products"
                  ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleMenuClick("products")}
            >
              <Package className="w-5 h-5 mr-3" />
              Available Products
            </Button>
            <Button
              variant={activeTab === "training" ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                activeTab === "training"
                  ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleMenuClick("training")}
            >
              <GraduationCap className="w-5 h-5 mr-3" />
              Training
            </Button>
            <Button
              variant={activeTab === "wallet" ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                activeTab === "wallet"
                  ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleMenuClick("wallet")}
            >
              <Wallet className="w-5 h-5 mr-3" />
              Wallet & Withdrawals
            </Button>

            {/* Bonus Features */}
            <div className="pt-4 mt-4 border-t border-gray-700">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Bonus Features</p>
              <Button
                variant={activeTab === "giftcards" ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === "giftcards"
                    ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
                onClick={() => handleMenuClick("giftcards")}
              >
                <Gift className="w-5 h-5 mr-3" />
                Generate Gift Cards
              </Button>
              <Button
                variant={activeTab === "brands" ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === "brands"
                    ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
                onClick={() => handleMenuClick("brands")}
              >
                <Award className="w-5 h-5 mr-3" />
                Top Brands List
              </Button>
              <Button
                variant={activeTab === "family" ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === "family"
                    ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
                onClick={() => handleMenuClick("family")}
              >
                <Users className="w-5 h-5 mr-3" />
                Family Registration
              </Button>
            </div>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-bold">
                {userData.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{userData.name}</p>
                <p className="text-xs text-gray-400">{userData.email}</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "products" && "Available Products"}
              {activeTab === "training" && "Training Modules"}
              {activeTab === "wallet" && "Wallet & Withdrawals"}
              {activeTab === "giftcards" && "Generate Discount Gift Cards"}
              {activeTab === "brands" && "Secret List of Top Brands"}
              {activeTab === "family" && "Register Family Members"}
            </h1>
            <div className="w-10" />
          </div>
          {activeTab === "overview" && (
            <div className="flex justify-center pb-4">
              <Image src="/amazon-jobs-logo.png" alt="Amazon Jobs" width={180} height={60} className="h-12 w-auto" />
            </div>
          )}
        </header>

        {/* Content Area */}
        <main className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30 p-6 bg-opacity-80">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-8 h-8 text-orange-400" />
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">${stats.balance.toFixed(2)}</p>
                  <p className="text-sm text-white">Available Balance</p>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 p-6 bg-opacity-80">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.pendingReviews}</p>
                  <p className="text-sm text-white">Pending Reviews</p>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 p-6 bg-opacity-80">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.completedReviews}</p>
                  <p className="text-sm text-white">Completed Reviews</p>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 p-6 bg-opacity-80">
                  <div className="flex items-center justify-between mb-2">
                    <GraduationCap className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.trainingProgress}%</p>
                  <p className="text-sm text-white font-medium">Training Progress</p>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-gray-900/50 border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-4 text-white">Recent Activity</h2>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "Review"
                              ? "bg-orange-500/20 text-orange-400"
                              : transaction.type === "Training"
                                ? "bg-purple-500/20 text-purple-400"
                                : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {transaction.type === "Review" ? (
                            <Star className="w-5 h-5" />
                          ) : transaction.type === "Training" ? (
                            <GraduationCap className="w-5 h-5" />
                          ) : (
                            <Wallet className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{transaction.product}</p>
                          <p className="text-sm text-gray-300">{transaction.date}</p>
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

              {/* Start Evaluation Button After Recent Activity */}
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowVerificationModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3"
                >
                  <Play className="w-6 h-6" />
                  Start Evaluation
                </Button>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <p className="text-gray-400">
                Choose products to review and earn rewards. Complete detailed reviews to maximize your earnings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {availableProducts.map((product) => (
                  <Card key={product.id} className="bg-gray-900/50 border-gray-800 overflow-hidden group">
                    <div className="relative h-48 bg-gradient-to-br from-orange-400/20 to-orange-600/20">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-orange-500 text-white border-0">
                        ${product.reward.toFixed(2)}
                      </Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-400">{product.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                          {product.difficulty}
                        </Badge>
                        <span className="text-xs text-gray-400">{product.timeEstimate}</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700">
                        Start Review
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Training Tab */}
          {activeTab === "training" && (
            <div className="space-y-6">
              <p className="text-gray-400">Complete training modules to improve your skills and earn bonus rewards.</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trainingModules.map((module) => (
                  <Card key={module.id} className="bg-gray-900/50 border-gray-800 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            module.completed ? "bg-green-500/20 text-green-400" : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {module.completed ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <GraduationCap className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{module.title}</h3>
                          <p className="text-sm text-gray-400">{module.duration}</p>
                        </div>
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        ${module.reward.toFixed(2)}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-4">{module.description}</p>
                    <Button
                      className={`w-full ${
                        module.completed
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                      }`}
                      disabled={module.completed}
                    >
                      {module.completed ? "Completed" : "Start Training"}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Wallet Tab */}
          {activeTab === "wallet" && (
            <div className="space-y-6">
              {/* Balance Card */}
              <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 mb-2">Available Balance</p>
                    <p className="text-5xl font-bold text-white">${stats.balance.toFixed(2)}</p>
                    <p className="text-sm text-gray-400 mt-2">PayPal: {userData.paypal}</p>
                  </div>
                  <Wallet className="w-20 h-20 text-orange-400 opacity-50" />
                </div>
                <div className="mt-6 flex gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700">
                    Withdraw Funds
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-400 text-orange-400 hover:bg-orange-400/10 bg-transparent"
                  >
                    View History
                  </Button>
                </div>
              </Card>

              {/* Withdrawal Info */}
              <Card className="bg-gray-900/50 border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-4">Withdrawal Information</h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-semibold">Minimum Withdrawal: $50.00</p>
                      <p className="text-sm text-gray-400">You can withdraw once you reach the minimum balance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-semibold">Processing Time: 1-3 Business Days</p>
                      <p className="text-sm text-gray-400">Funds are typically transferred within 72 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-semibold">No Fees</p>
                      <p className="text-sm text-gray-400">We don't charge any withdrawal fees</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Transaction History */}
              <Card className="bg-gray-900/50 border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.amount > 0 ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {transaction.amount > 0 ? <TrendingUp className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-semibold">{transaction.product}</p>
                          <p className="text-sm text-gray-400">
                            {transaction.type} • {transaction.date}
                          </p>
                        </div>
                      </div>
                      <p className={`font-bold text-lg ${transaction.amount > 0 ? "text-green-400" : "text-blue-400"}`}>
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Gift Cards Tab */}
          {activeTab === "giftcards" && (
            <div className="space-y-6">
              <p className="text-gray-400">
                Generate discount gift cards for popular retailers and earn additional rewards.
              </p>
              <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Gift className="w-12 h-12 text-orange-400" />
                  <div>
                    <h2 className="text-2xl font-bold">Gift Card Generator</h2>
                    <p className="text-gray-300">Unlock exclusive discounts on gift cards</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["Amazon", "Walmart", "Target", "Best Buy", "Starbucks", "iTunes"].map((brand) => (
                    <Card
                      key={brand}
                      className="bg-gray-900/50 border-gray-800 p-4 hover:border-orange-500/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">{brand}</h3>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">5% OFF</Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">Available denominations: $25, $50, $100</p>
                      <Button className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700">
                        Generate Card
                      </Button>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Top Brands Tab */}
          {activeTab === "brands" && (
            <div className="space-y-6">
              <p className="text-gray-400">
                Access our exclusive list of top brands with special review opportunities and higher rewards.
              </p>
              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Award className="w-12 h-12 text-purple-400" />
                  <div>
                    <h2 className="text-2xl font-bold">Premium Brand Partners</h2>
                    <p className="text-gray-300">Exclusive access to top-tier brands</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Apple", category: "Electronics", reward: 50, reviews: 12 },
                    { name: "Nike", category: "Fashion", reward: 45, reviews: 8 },
                    { name: "Sony", category: "Electronics", reward: 40, reviews: 15 },
                    { name: "Samsung", category: "Electronics", reward: 48, reviews: 10 },
                    { name: "Adidas", category: "Fashion", reward: 42, reviews: 6 },
                  ].map((brand) => (
                    <Card
                      key={brand.name}
                      className="bg-gray-900/50 border-gray-800 p-6 hover:border-purple-500/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                            <Award className="w-8 h-8 text-purple-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl">{brand.name}</h3>
                            <p className="text-sm text-gray-400">{brand.category}</p>
                            <p className="text-xs text-gray-500 mt-1">{brand.reviews} products available</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-2">
                            Up to ${brand.reward}
                          </Badge>
                          <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                            View Products
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Family Registration Tab */}
          {activeTab === "family" && (
            <div className="space-y-6">
              <p className="text-gray-400">
                Register your family members for Amazon Career opportunities and earn referral bonuses.
              </p>
              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Users className="w-12 h-12 text-blue-400" />
                  <div>
                    <h2 className="text-2xl font-bold">Amazon Career Registration</h2>
                    <p className="text-gray-300">Help your family join Amazon's workforce</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gray-900/50 border-gray-800 p-6">
                    <h3 className="font-bold text-lg mb-4">Registration Form</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Family Member Name</label>
                        <input
                          type="text"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Email Address</label>
                        <input
                          type="email"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                          placeholder="Enter email"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Relationship</label>
                        <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none">
                          <option>Select relationship</option>
                          <option>Spouse</option>
                          <option>Parent</option>
                          <option>Sibling</option>
                          <option>Child</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                        Submit Registration
                      </Button>
                    </div>
                  </Card>
                  <Card className="bg-gray-900/50 border-gray-800 p-6">
                    <h3 className="font-bold text-lg mb-4">Referral Benefits</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <p className="font-semibold">$100 Referral Bonus</p>
                          <p className="text-sm text-gray-400">Earn when your referral gets hired</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <p className="font-semibold">Priority Application Review</p>
                          <p className="text-sm text-gray-400">Your referrals get faster processing</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <p className="font-semibold">Career Support</p>
                          <p className="text-sm text-gray-400">Access to exclusive training resources</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <p className="font-semibold">Unlimited Referrals</p>
                          <p className="text-sm text-gray-400">No limit on family members you can refer</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-sm text-blue-300">
                        <strong>Note:</strong> All referrals must meet Amazon's standard hiring requirements and pass
                        background checks.
                      </p>
                    </div>
                  </Card>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gray-100 rounded-2xl max-w-md w-full p-6 relative animate-in zoom-in-95 duration-200">
            {/* Shield Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 text-center mb-3">Human Verification Required</h2>

            {/* Description */}
            <p className="text-xs text-gray-600 text-center mb-4">
              Due to the high rate of system abuse, a verification fee is required to confirm you are human.
            </p>

            {/* Info Box */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">
                This one-time fee helps us maintain platform quality and ensures legitimate evaluators.
              </p>
            </div>

            {/* Additional Info */}
            <p className="text-sm text-gray-600 text-center mb-5">
              It will give you full access to the official Amazon Jobs platform with its bonuses. After payment, your
              $265 transfer is validated and credited to your registered account.
            </p>

            {/* Buttons */}
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

            {/* Terms */}
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
