"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  Clock, 
  BarChart3, 
  ChevronRight,
  Menu,
  X,
  Play
} from "lucide-react";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 8]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <div className="hero-glow" />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="glass-morphism rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg shadow-black/5">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <img src="/logo1.png" alt="Next Task Logo" className="h-9 w-auto relative z-10" />
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Next<span className="text-primary">Task</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {/* Central links removed for a cleaner look */}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button className="hidden sm:block text-sm font-semibold hover:text-primary transition-colors px-4">
                Sign In
              </button>
              <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Task Intelligence is here</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] mb-8"
          >
            The future of <br />
            <span className="gradient-text">Productivity</span> is AI.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Experience the next generation of task management. Join 50k+ professionals using NextTask to master their schedules with intelligent automation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-5"
          >
            <button className="group flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1">
              Join for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-2 glass-morphism px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all duration-300">
              Sign In
            </button>
          </motion.div>

          {/* Floating UI Elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-24 relative max-w-5xl mx-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 blur-2xl opacity-20" />
            <div className="relative glass-morphism rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div className="bg-accent/50 p-4 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="mx-auto bg-background/50 px-4 py-1 rounded-lg text-xs font-mono opacity-50">
                  app.nexttask.ai/dashboard
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3" 
                alt="Dashboard Preview" 
                className="w-full opacity-90 brightness-110 contrast-110"
              />
            </div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-1/4 glass-morphism p-4 rounded-2xl shadow-xl hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <BarChart3 className="text-green-500 w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-text-secondary">Efficiency</div>
                  <div className="font-bold">+42%</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-8 bottom-1/4 glass-morphism p-4 rounded-2xl shadow-xl hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-text-secondary">Tasks Completed</div>
                  <div className="font-bold">1,284 Today</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed for high-performers</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Everything you need to stay on top of your game, powered by the latest in AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Smart Intake",
                desc: "Voice commands and natural language processing make task entry lightning fast."
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Prioritization",
                desc: "Our AI analyzes your deadlines and habits to suggest what to tackle next."
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Focus Mode",
                desc: "Eliminate distractions with adaptive UI that changes based on your current task."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-3xl bg-secondary/50 border border-card-border hover:bg-card hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {feature.desc}
                </p>
                <div className="flex items-center text-primary font-semibold cursor-pointer group/link">
                  Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-accent/30 border-y border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-text-secondary font-medium mb-10 text-sm tracking-widest uppercase">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {["Amazon", "Notion", "Slack", "Stripe", "Airbnb"].map((brand) => (
              <span key={brand} className="text-2xl font-black italic tracking-tighter text-foreground">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-accent p-12 md:p-20 text-center">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to reclaim <br />your time?</h2>
              <p className="text-xl text-text-secondary mb-12 max-w-xl mx-auto">
                Join thousands of productive teams. Start using NextTask completely free today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95">
                  Get Started for Free
                </button>
                <button className="glass-morphism px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all duration-300">
                  Sign In
                </button>
              </div>
              <p className="mt-8 text-sm text-text-secondary flex items-center justify-center gap-4">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-primary" /> Always Free</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-primary" /> No credit card</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 px-6 border-t border-card-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-8">
                <img src="/logo1.png" alt="Next Task Logo" className="h-8" />
                <span className="text-2xl font-bold tracking-tight">Next<span className="text-primary">Task</span></span>
              </div>
              <p className="text-text-secondary max-w-xs mb-8">
                The AI-first task management platform designed to help you focus on what truly matters.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-text-secondary">
                <li className="hover:text-primary transition-colors cursor-pointer">Features</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Security</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Roadmap</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-text-secondary">
                <li className="hover:text-primary transition-colors cursor-pointer">About</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-text-secondary">
                <li className="hover:text-primary transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Contact</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Twitter</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-card-border gap-6">
            <p className="text-text-secondary text-sm">
              © {new Date().getFullYear()} NextTask. All rights reserved. Built with ❤️ for productive minds.
            </p>
            <div className="flex gap-8 text-sm text-text-secondary">
              <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
              <span className="hover:text-primary cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

