import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  BarChart3,
  Search,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Globe,
  Layers,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Landing() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center mesh-gradient">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-violet-200 dark:border-violet-800 shadow-lg mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
                AI-Powered Price Intelligence
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              <span className="block text-foreground">Smart Pricing</span>
              <span className="block mt-2 gradient-text">Made Simple</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your e-commerce strategy with AI-driven insights.
              Compare prices, track competitors, and optimize revenue—all in one
              place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isAuthenticated ? (
                /* Logged In - Show Dashboard buttons */
                <>
                  <Link to="/dashboard/user">
                    <Button
                      size="lg"
                      className="h-14 px-8 text-lg font-medium rounded-full gap-2 glow hover:scale-105 transition-transform"
                    >
                      <Search className="h-5 w-5" />
                      Search Products
                    </Button>
                  </Link>
                  <Link to="/dashboard/business">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-14 px-8 text-lg font-medium rounded-full gap-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:scale-105 transition-transform"
                    >
                      <BarChart3 className="h-5 w-5" />
                      View Analytics
                    </Button>
                  </Link>
                </>
              ) : (
                /* Not Logged In - Show Get Started / Login buttons */
                <>
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="h-14 px-8 text-lg font-medium rounded-full gap-2 glow hover:scale-105 transition-transform"
                    >
                      Get Started Free
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-14 px-8 text-lg font-medium rounded-full gap-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:scale-105 transition-transform"
                    >
                      <LogIn className="h-5 w-5" />
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "500+", label: "Businesses" },
                { value: "10M+", label: "Products" },
                { value: "99.9%", label: "Uptime" },
                { value: "$2B+", label: "Optimized" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="currentColor"
              className="text-background"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-4 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 border-0">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need to
              <span className="gradient-text"> win</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed for modern e-commerce teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Analytics",
                description:
                  "Machine learning algorithms predict optimal pricing strategies in real-time.",
                gradient: "from-violet-500 to-purple-600",
              },
              {
                icon: Globe,
                title: "Multi-Platform",
                description:
                  "Track prices across Amazon, eBay, Walmart, and 50+ marketplaces.",
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                icon: TrendingUp,
                title: "Dynamic Pricing",
                description:
                  "Auto-adjust prices based on market conditions and competitor actions.",
                gradient: "from-fuchsia-500 to-pink-600",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description:
                  "SOC 2 compliant with end-to-end encryption and SSO support.",
                gradient: "from-emerald-500 to-green-600",
              },
              {
                icon: Layers,
                title: "Deep Integration",
                description:
                  "Connect with Shopify, WooCommerce, Magento, and custom APIs.",
                gradient: "from-orange-500 to-amber-600",
              },
              {
                icon: Zap,
                title: "Real-Time Alerts",
                description:
                  "Get instant notifications when competitors change their prices.",
                gradient: "from-rose-500 to-red-600",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover-lift cursor-pointer overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center text-sm font-medium text-violet-600 dark:text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 mesh-gradient relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge className="mb-4 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 border-0">
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Three steps to
              <span className="gradient-text"> success</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    step: "01",
                    title: "Connect",
                    desc: "Integrate your platforms in minutes with our simple API or direct connections",
                    icon: "🔗",
                  },
                  {
                    step: "02",
                    title: "Analyze",
                    desc: "Our AI processes market data and generates actionable insights",
                    icon: "🧠",
                  },
                  {
                    step: "03",
                    title: "Optimize",
                    desc: "Implement recommendations and watch your revenue grow",
                    icon: "🚀",
                  },
                ].map((item, i) => (
                  <div key={i} className="relative text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-900 border-4 border-violet-500 shadow-lg mb-6 text-2xl">
                      {item.icon}
                    </div>
                    <div className="text-sm font-bold text-violet-500 mb-2">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Benefits Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 px-4 py-1.5 rounded-full bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-300 border-0">
                Why Choose Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Built for teams that
                <span className="gradient-text"> move fast</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Our platform helps you make data-driven decisions that directly
                impact your bottom line.
              </p>

              <div className="space-y-5">
                {[
                  "Real-time monitoring across 50+ platforms",
                  "AI-powered demand forecasting",
                  "Automated repricing rules",
                  "Custom analytics dashboards",
                  "Seamless integrations",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link to={isAuthenticated ? "/dashboard/user" : "/signup"}>
                  <Button size="lg" className="h-14 px-8 rounded-full gap-2">
                    {isAuthenticated ? "Go to Dashboard" : "Start Your Free Trial"}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Revenue Increase",
                    value: "+340%",
                    color: "from-violet-500 to-purple-600",
                  },
                  {
                    label: "Time Saved",
                    value: "40hrs",
                    subtext: "/week",
                    color: "from-cyan-500 to-blue-600",
                  },
                  {
                    label: "ROI",
                    value: "12x",
                    subtext: "average",
                    color: "from-fuchsia-500 to-pink-600",
                  },
                  {
                    label: "Customer NPS",
                    value: "94",
                    color: "from-emerald-500 to-green-600",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl hover-lift ${i === 0 ? "col-span-2" : ""}`}
                  >
                    <div className="text-sm text-muted-foreground mb-2">
                      {stat.label}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </span>
                      {stat.subtext && (
                        <span className="text-muted-foreground">
                          {stat.subtext}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl">
            <Badge className="mb-6 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border-0">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Get Started Today
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to transform your
              <span className="gradient-text"> pricing strategy?</span>
            </h2>
            <p className="text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of businesses using AI to drive revenue growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard/user">
                    <Button
                      size="lg"
                      className="h-14 px-8 text-lg rounded-full gap-2 glow hover:scale-105 transition-transform"
                    >
                      <Search className="h-5 w-5" />
                      Search Products
                    </Button>
                  </Link>
                  <Link to="/dashboard/business">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-lg rounded-full gap-2 hover:scale-105 transition-transform"
                    >
                      <BarChart3 className="h-5 w-5" />
                      View Analytics
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="h-14 px-8 text-lg rounded-full gap-2 glow hover:scale-105 transition-transform"
                    >
                      Get Started Free
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-lg rounded-full gap-2 hover:scale-105 transition-transform"
                    >
                      <LogIn className="h-5 w-5" />
                      Login to Continue
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
