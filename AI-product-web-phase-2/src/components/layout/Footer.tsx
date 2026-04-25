import { Link } from "react-router-dom";
import { Zap, Github, Twitter, Linkedin, ArrowRight, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Newsletter Section */}
      <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-3">
                <Sparkles className="h-3.5 w-3.5 text-white" />
                <span className="text-sm font-medium text-white">Stay Updated</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Get the latest insights</h3>
              <p className="text-white/80">Join 10,000+ professionals receiving weekly pricing intelligence.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Input
                placeholder="Enter your email"
                className="h-12 px-5 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/20 w-full md:w-72"
              />
              <Button className="h-12 px-6 rounded-full bg-white text-violet-600 hover:bg-white/90 gap-2 shrink-0">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-900 dark:bg-gray-950">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg group-hover:shadow-violet-500/25 transition-shadow">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">PriceCurator</span>
              </Link>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                AI-powered price intelligence platform helping modern e-commerce businesses optimize revenue and stay competitive.
              </p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-5 text-white">Product</h4>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <Link to="/dashboard/user" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    Product Search
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/business" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    Analytics
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <span className="text-gray-500 cursor-not-allowed">API Access</span>
                </li>
                <li>
                  <span className="text-gray-500 cursor-not-allowed">Integrations</span>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-5 text-white">Resources</h4>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <span className="text-gray-500 cursor-not-allowed">Documentation</span>
                </li>
                <li>
                  <span className="text-gray-500 cursor-not-allowed">API Reference</span>
                </li>
                <li>
                  <span className="text-gray-500 cursor-not-allowed">Blog</span>
                </li>
                <li>
                  <span className="text-gray-500 cursor-not-allowed">Support</span>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-5 text-white">Company</h4>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <span className="text-gray-500 cursor-not-allowed">About</span>
                </li>
                <li>
                  <span className="text-gray-500 cursor-not-allowed">Careers</span>
                </li>
                <li>
                  <span className="text-gray-500 cursor-not-allowed">Privacy Policy</span>
                </li>
                <li>
                  <span className="text-gray-500 cursor-not-allowed">Terms of Service</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-10 bg-white/10" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-gray-500">&copy; 2025 PriceCurator. All rights reserved.</p>
            <p className="text-gray-400">
              Built by <span className="font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">B.R.MridulaTara & A.Koushik</span> - MGIT
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
