import React from 'react'
import { Link } from 'react-router-dom'
import ditheredImage from '../assets/dithered-image-removebg-preview.png'
// import DitheredImage from 
function Home() {
  return (
    <main className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative px-5 md:px-0 pt-6 pb-8 md:py-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-6 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-3 py-1 rounded-full border border-accent/30">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="text-[14px] font-semibold font-sans">Certified Pure</span>
          </div>
          <h1 className="text-4xl md:text-[56px] font-bold leading-[1.1] text-foreground tracking-tight">
            Pure Hydration <br className="hidden md:block" /> <span className="text-primary">Delivered to You.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg font-sans">
            Experience the clarity of premium filtered water. Our 20L bottles are sanitized, sealed, and delivered to your doorstep within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/user" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-[14px] font-semibold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
              Order Now
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link to="/user" className="bg-accent/30 text-accent-foreground px-8 py-4 rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-accent/50 transition-all">
              View Plans
            </Link>
          </div>
        </div>
        <div className="flex-1 relative order-1 md:order-2 w-full flex justify-center">
          <div className="relative group">
            <img alt="Premium 20L Water Bottle" className="w-[200px] sm:w-[380px] md:w-[460px] lg:w-[540px] xl:w-[450px] max-w-full h-auto object-contain drop-shadow-2xl transition-transform group-hover:rotate-1" src={ditheredImage} />
            <div className="absolute -bottom-6 -right-6 bg-white/80 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 dark:border-slate-700/50 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary dark:text-blue-400">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-foreground">Quick Delivery</p>
                  <p className="text-[12px] font-medium text-muted-foreground">Avg. 45 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bento Grid */}
      <section className="px-5 md:px-0 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-blue-50 dark:border-slate-700/50 shadow-[0_4px_20px_rgba(0,119,255,0.06)] space-y-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">high_quality</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Quality Assurance</h3>
            <p className="text-base text-muted-foreground">7-stage purification process including UV and reverse osmosis for unmatched purity.</p>
          </div>
          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-blue-50 dark:border-slate-700/50 shadow-[0_4px_20px_rgba(0,119,255,0.06)] space-y-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Rapid Fleet</h3>
            <p className="text-base text-muted-foreground">Real-time tracking of our local delivery partners ensuring your hydration is never delayed.</p>
          </div>
          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-blue-50 dark:border-slate-700/50 shadow-[0_4px_20px_rgba(0,119,255,0.06)] space-y-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">sanitizer</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Eco-Sanitized</h3>
            <p className="text-base text-muted-foreground">Environmentally friendly bottle cleaning protocols ensuring health and sustainability.</p>
          </div>
        </div>
      </section>

      {/* Tracker Section */}
      <section className="px-5 md:px-0 py-8 mx-5 md:mx-0">
        <div className="bg-muted dark:bg-slate-800/40 p-8 rounded-3xl max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Track Your Hydration</h2>
          <div className="bg-white dark:bg-slate-850 p-8 rounded-2xl shadow-sm border border-border/30 dark:border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[14px] font-semibold text-primary dark:text-blue-400">In Delivery</span>
              <span className="text-[14px] font-semibold text-muted-foreground">Arrival in 12 mins</span>
            </div>
            <div className="w-full h-4 bg-blue-50 dark:bg-blue-950/20 rounded-full overflow-hidden relative">
              <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-[12px] font-medium text-muted-foreground">Order Placed</span>
              <span className="text-[12px] font-medium text-muted-foreground">Dispatched</span>
              <span className="text-[12px] font-bold text-primary dark:text-blue-400">Arriving</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-5 md:px-0 py-12 text-center">
        <div className="bg-primary/5 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-primary/10 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready for a refreshing change?</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Join 10,000+ satisfied households and offices today. Get your first bottle free on subscriptions.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-[14px] font-semibold hover:shadow-lg transition-all active:scale-95">Start Subscription</button>
              <button className="border-2 border-primary text-primary px-8 py-4 rounded-full text-[14px] font-semibold hover:bg-primary/5 transition-all">Quick One-Time Order</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hidden md:block py-12 border-t border-border dark:border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-xl font-bold text-primary dark:text-blue-400 tracking-tight">Gallon Go </span>
            <p className="text-[12px] font-medium text-muted-foreground">Delivering purity since 2018. The #1 water service for modern living.</p>
          </div>
          <div className="space-y-3">
            <p className="text-[14px] font-semibold text-foreground">Company</p>
            <ul className="text-[12px] font-medium text-muted-foreground space-y-2 cursor-pointer">
              <li className="hover:text-primary dark:hover:text-blue-400 transition-colors">About Us</li>
              <li className="hover:text-primary dark:hover:text-blue-400 transition-colors">Sustainability</li>
              <li className="hover:text-primary dark:hover:text-blue-400 transition-colors">Contact</li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-[14px] font-semibold text-foreground">Support</p>
            <ul className="text-[12px] font-medium text-muted-foreground space-y-2 cursor-pointer">
              <li className="hover:text-primary dark:hover:text-blue-400 transition-colors">Help Center</li>
              <li className="hover:text-primary dark:hover:text-blue-400 transition-colors">Safety standards</li>
              <li className="hover:text-primary dark:hover:text-blue-400 transition-colors">Terms</li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-[14px] font-semibold text-foreground">Follow Us</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-blue-400 hover:bg-primary dark:hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">public</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-blue-400 hover:bg-primary dark:hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">share</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Home