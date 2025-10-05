"use client"

import { Heart, MessageCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated Background Cards */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedProductCard
          name="Wireless Headphones"
          price={89.99}
          rating={5}
          description="Premium noise-canceling headphones with crystal clear sound..."
          tags={["Audio", "Wireless", "Premium"]}
          inStock={true}
          position={{ top: "10%", left: "5%" }}
          delay={0}
          image="/product-1.jpg"
        />
        <AnimatedProductCard
          name="Smart Watch Pro"
          price={299.99}
          rating={5}
          description="Advanced fitness tracking with heart rate monitor and GPS..."
          tags={["Tech", "Fitness", "Smart"]}
          inStock={false}
          position={{ top: "35%", left: "15%" }}
          delay={2}
          image="/product-2.jpg"
        />
        <AnimatedProductCard
          name="Coffee Maker Deluxe"
          price={149.99}
          rating={5}
          description="Professional-grade coffee maker with programmable settings..."
          tags={["Kitchen", "Coffee", "Home"]}
          inStock={false}
          position={{ top: "60%", left: "8%" }}
          delay={4}
          image="/product-3.jpg"
        />
        <AnimatedProductCard
          name="Leather Backpack"
          price={129.99}
          rating={5}
          description="Handcrafted genuine leather backpack with laptop compartment..."
          tags={["Fashion", "Travel", "Leather"]}
          inStock={true}
          position={{ top: "15%", right: "10%" }}
          delay={1}
          image="/product-4.jpg"
        />
        <AnimatedProductCard
          name="Yoga Mat Premium"
          price={49.99}
          rating={5}
          description="Extra thick non-slip yoga mat for ultimate comfort..."
          tags={["Fitness", "Yoga", "Health"]}
          inStock={false}
          position={{ top: "45%", right: "5%" }}
          delay={3}
          image="/product-5.jpg"
        />
        <AnimatedProductCard
          name="Reading Lamp LED"
          price={39.99}
          rating={5}
          description="Adjustable LED reading lamp with multiple brightness levels..."
          tags={["Home", "Lighting", "Reading"]}
          inStock={true}
          position={{ top: "70%", right: "15%" }}
          delay={5}
          image="/product-6.jpg"
        />
        <AnimatedProductCard
          name="Running Shoes Elite"
          price={159.99}
          rating={5}
          description="Professional running shoes with advanced cushioning technology..."
          tags={["Sports", "Running", "Fitness"]}
          inStock={true}
          position={{ top: "25%", left: "40%" }}
          delay={6}
          image="/product-7.jpg"
        />
        <AnimatedProductCard
          name="Skincare Set Luxury"
          price={199.99}
          rating={5}
          description="Complete luxury skincare routine with natural ingredients..."
          tags={["Beauty", "Skincare", "Luxury"]}
          inStock={false}
          position={{ top: "50%", left: "60%" }}
          delay={7}
          image="/product-8.jpg"
        />
        <AnimatedProductCard
          name="Business Briefcase"
          price={249.99}
          rating={5}
          description="Executive leather briefcase with organized compartments..."
          tags={["Business", "Leather", "Professional"]}
          inStock={true}
          position={{ top: "5%", left: "70%" }}
          delay={8}
          image="/product-9.jpg"
        />
        <AnimatedProductCard
          name="Beach Towel Set"
          price={59.99}
          rating={5}
          description="Ultra-soft microfiber beach towels, quick-dry and sand-resistant..."
          tags={["Beach", "Summer", "Travel"]}
          inStock={false}
          position={{ top: "80%", left: "30%" }}
          delay={9}
          image="/product-10.jpg"
        />
        <AnimatedProductCard
          name="Camera Lens Kit"
          price={399.99}
          rating={5}
          description="Professional camera lens kit for stunning photography..."
          tags={["Photography", "Camera", "Professional"]}
          inStock={true}
          position={{ top: "40%", right: "35%" }}
          delay={10}
          image="/product-11.jpg"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/40 via-[#0a0a0f]/60 to-[#0a0a0f]/85" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center p-6">
        <div className="flex items-center gap-2">
          <Image src="/amazon-jobs-logo.png" alt="Amazon Jobs" width={180} height={60} className="h-12 w-auto" />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 text-balance leading-tight">
          Create an Account
        </h2>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <Link href="/signup">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white text-lg font-semibold py-6 rounded-full shadow-lg shadow-orange-400/30"
            >
              Sign Up
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-black text-lg font-semibold py-6 rounded-full"
            >
              Log In
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-sm text-gray-400">© 2025 LLC, All rights reserved.</footer>
    </div>
  )
}

interface AnimatedProductCardProps {
  name: string
  price: number
  rating: number
  description: string
  tags: string[]
  inStock: boolean
  position: { top?: string; bottom?: string; left?: string; right?: string }
  delay: number
  image: string
}

function AnimatedProductCard({
  name,
  price,
  rating,
  description,
  tags,
  inStock,
  position,
  delay,
  image,
}: AnimatedProductCardProps) {
  return (
    <div
      className="absolute w-72 animate-float opacity-70 hover:opacity-90 transition-opacity"
      style={{
        ...position,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 shadow-xl">
        {/* Stock Badge */}
        {inStock && (
          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full" />
            In Stock
          </div>
        )}

        {/* Product Image */}
        <div className="w-full h-64 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-xl mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
            ))}
            <span className="text-sm text-gray-400 ml-1">({rating}.0)</span>
          </div>
          <p className="text-lg font-semibold text-orange-400">${price.toFixed(2)}</p>
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-orange-400/20 hover:bg-orange-400/30 text-orange-400 rounded-full p-3 flex items-center justify-center transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="flex-1 bg-orange-600/20 hover:bg-orange-600/30 text-orange-500 rounded-full p-3 flex items-center justify-center transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
