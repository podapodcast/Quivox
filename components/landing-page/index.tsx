/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Award,
  Download,
  Wallet,
  ArrowUpDown,
  Star,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import TradingViewMarketList from "./trading-view";

export default function LandingPage({ user }: { user: any }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState<"video" | "text">("video");

  const cryptoLogos = [
    { name: "Bitcoin", image: "/btc.png" },
    { name: "Ethereum", image: "/eth.png" },
    { name: "Toncoin", image: "/ton.png" },
    { name: "USDT", image: "/usdt.png" },
    { name: "Chainlink", image: "/link.png" },
    { name: "Litecoin", image: "/ltc.png" },
    { name: "Stellar", image: "/xlm.png" },
    { name: "Dogecoin", image: "/doge.png" },
    { name: "Solana", image: "/sol.png" },
    { name: "Avalanche", image: "/avax.png" },
    { name: "Polygon", image: "/matic.png" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Crypto Investor",
      content:
        "Quivox has transformed my trading experience. The platform is intuitive and the returns are incredible.",
      rating: 5,
      avatar: "/professional-woman.png",
    },
    {
      name: "Michael Chen",
      role: "DeFi Enthusiast",
      content:
        "Best crypto platform I've used. Simple, secure, and profitable. Highly recommend to anyone starting their crypto journey.",
      rating: 5,
      avatar: "/professional-man.png",
    },
    {
      name: "Emma Rodriguez",
      role: "Blockchain Developer",
      content:
        "The security features and user experience are top-notch. I trust Quivox with my crypto investments completely.",
      rating: 5,
      avatar: "/woman-developer.png",
    },
  ];

  const videoTestimonials = [
    {
      src: "/videos/testimonial1.mp4",
      caption: "David Joshua, Small Business Owner",
    },
    {
      src: "/videos/testimonial2.mp4",
      caption: "Mark Perry, Contractor",
    },
  ];

  const blogPosts = [
    {
      title: "The Future of Cryptocurrency in 2024",
      excerpt:
        "Explore the latest trends and predictions for the crypto market this year.",
      date: "Dec 15, 2024",
      author: "Alex Thompson",
      image: "/cryptocurrency-future.jpg",
    },
    {
      title: "DeFi vs Traditional Banking: A Complete Guide",
      excerpt:
        "Understanding the key differences and advantages of decentralized finance.",
      date: "Dec 12, 2024",
      author: "Maria Garcia",
      image: "/defi-banking.jpg",
    },
    {
      title: "Security Best Practices for Crypto Wallets",
      excerpt: "Essential tips to keep your digital assets safe and secure.",
      date: "Dec 10, 2024",
      author: "David Kim",
      image: "/crypto-security-abstract.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                <span className="text-black font-bold text-base">Q</span>
              </div>
              <span className="text-2xl font-bold text-white">Quivox</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-slate-300 hover:text-white">
                About
              </a>
              <a href="#benefits" className="text-slate-300 hover:text-white">
                Benefits
              </a>
              <a
                href="#testimonials"
                className="text-slate-300 hover:text-white"
              >
                Reviews
              </a>
              <a href="#blog" className="text-slate-300 hover:text-white">
                Blog
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <Button
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      window.location.href = "/signup";
                    }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 lg:py-48">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
            Grow Your Wealth with{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Crypto Investments
            </span>
          </h1>
          <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            Deposit your funds securely and watch them grow through smart
            cryptocurrency investments.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-lg px-8 py-6"
                onClick={() => {
                  window.location.href = "/dashboard/invest";
                }}
              >
                Start Investing Today
              </Button>
            ) : (
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-lg px-8 py-6"
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Start Investing Today
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Crypto Logo Scroll */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/50">
        <div className="overflow-hidden">
          <div className="flex animate-scroll">
            {[...cryptoLogos, ...cryptoLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 flex items-center gap-3"
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="w-8 h-8 rounded-full object-contain"
                />
                <span className="text-slate-300 font-medium whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
              <span className="text-orange-400 text-sm font-medium">
                How it Works
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Get Started Today with Quivox
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Simple Steps to Grow Your Wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                  <Download className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-white text-xl">
                  Create Your Wallet
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Set up your secure crypto wallet to store and manage your
                  funds easily
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-white text-xl">
                  Deposit Funds
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Add money to your wallet and choose your preferred
                  cryptocurrencies to invest in.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                  <ArrowUpDown className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-white text-xl">
                  Invest & Grow
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Use our platform to grow your funds through crypto
                  investments.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
                <span className="text-orange-400 text-sm font-medium">
                  About Quivox
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Leading the Future of Digital Finance
              </h2>
              <p className="text-slate-300 text-lg mb-6">
                At Quivox, we help you grow your wealth through cryptocurrency
                investments. Our secure and intuitive platform ensures your
                funds are protected while maximizing potential returns.
              </p>
              <p className="text-slate-300 mb-8">
                Founded by financial and blockchain experts, Quivox combines
                advanced technology, regulatory compliance, and an easy-to-use
                interface to make investing in crypto simple and safe.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    50K+
                  </div>
                  <div className="text-slate-400">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    $2B+
                  </div>
                  <div className="text-slate-400">Trading Volume</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    99.9%
                  </div>
                  <div className="text-slate-400">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    24/7
                  </div>
                  <div className="text-slate-400">Support</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-3xl blur-3xl" />
              <img
                src="/crypto-team-office.jpg"
                alt="Quivox Team"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TradingView Market Overview */}
      <TradingViewMarketList />

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
              <span className="text-orange-400 text-sm font-medium">
                Benefits
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose Quivox?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Benefit from secure investments, low fees, and a platform designed
              to help your crypto portfolio grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <CardTitle className="text-white">Secure Funds</CardTitle>
                <CardDescription className="text-slate-400">
                  Your deposits are protected with bank-level security and
                  multi-factor authentication.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <CardTitle className="text-white">Smart Investments</CardTitle>
                <CardDescription className="text-slate-400">
                  Advanced analytics and tools help you make informed decisions
                  and maximize returns.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-black" />
                </div>
                <CardTitle className="text-white">
                  Instant Transactions
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Quick deposits, withdrawals, and trades ensure you never miss
                  an opportunity.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <CardTitle className="text-white">24/7 Support</CardTitle>
                <CardDescription className="text-slate-400">
                  Round-the-clock customer support from our team of crypto
                  experts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-6 h-6 text-black" />
                </div>
                <CardTitle className="text-white">
                  Low Fees Withdrawal
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Competitive withdrawal fees and transparent pricing with no
                  hidden costs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-black" />
                </div>
                <CardTitle className="text-white">
                  Regulatory Compliance
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Fully licensed and compliant with international financial
                  regulations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Ready to Grow Your Crypto Funds?
          </h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust Quivox to manage and grow
            their crypto portfolios. Start with as little as $10 and watch your
            wealth increase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-slate-800 text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-black text-black hover:bg-black hover:text-white bg-transparent transition-all duration-300"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
              <span className="text-orange-400 text-sm font-medium">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              What Our Users Say
            </h2>
          </div>
          <div className="flex justify-center mb-10">
            <div className="bg-slate-800/50 rounded-full p-1 flex">
              <button
                onClick={() => setActiveTab("video")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "video"
                    ? "bg-orange-500 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Video
              </button>
              <button
                onClick={() => setActiveTab("text")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "text"
                    ? "bg-orange-500 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Text
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === "video" ? (
              // VIDEO TESTIMONIALS
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {videoTestimonials.map((video, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden shadow-lg"
                  >
                    <video controls className="w-full h-100 object-cover">
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="p-4">
                      <p className="text-slate-300 text-sm italic">
                        {video.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // TEXT TESTIMONIALS (your existing carousel)
              <div className="relative">
                <Card className="bg-slate-800/50 border-slate-700 p-8">
                  <CardContent className="text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-500 fill-current"
                          />
                        )
                      )}
                    </div>
                    <p className="text-xl text-slate-300 mb-6 italic">
                      &quot;{testimonials[currentTestimonial].content}&quot;
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={
                          testimonials[currentTestimonial].avatar ||
                          "/placeholder.svg"
                        }
                        alt={testimonials[currentTestimonial].name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-white">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {testimonials[currentTestimonial].role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Left & Right Buttons */}
                <button
                  onClick={() =>
                    setCurrentTestimonial(
                      (prev) =>
                        (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() =>
                    setCurrentTestimonial(
                      (prev) => (prev + 1) % testimonials.length
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* Dots */}
                <div className="flex justify-center mt-6 gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial
                          ? "bg-orange-500"
                          : "bg-slate-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
              <span className="text-orange-400 text-sm font-medium">Blog</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Latest Insights
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Stay updated with the latest trends, news, and insights from the
              crypto world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  <CardTitle className="text-white hover:text-orange-400 transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black transition-all duration-300 bg-transparent"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-800 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                  <span className="text-black font-bold text-sm">Q</span>
                </div>
                <span className="text-xl font-bold text-white">Quivox</span>
              </div>
              <p className="text-slate-400 mb-6">
                The future of cryptocurrency trading. Simple, secure, and
                accessible to everyone.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-white text-sm">f</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-white text-sm">t</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-white text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6">Platform</h3>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Trading
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Wallet
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Exchange
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6">Support</h3>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400">
                &copy; 2024 Quivox. All rights reserved.
              </p>
              <div className="flex gap-6 text-slate-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
