"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Github, 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col md:flex-row relative overflow-x-hidden">
      <div className="hero-glow" />
      
      {/* Left Side: Visual/Brand (Hidden on mobile) */}
      <div className="hidden md:flex md:flex-[1.1] relative bg-accent/30 border-r border-card-border items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-10 left-10 z-20">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer text-foreground">
            <motion.div 
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl glass-morphism group-hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="font-semibold text-sm group-hover:text-primary transition-colors">Back to Home</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-sm w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="relative">
                <img src="/logo1.png" alt="Next Task Logo" className="h-10 w-auto relative z-10" />
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-150" />
              </div>
              <span className="text-3xl font-black tracking-tighter">
                Next<span className="text-primary">Task</span>
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight mb-8">
              Master your <br />
              <span className="gradient-text">Productivity</span>.
            </h1>
            
            <p className="text-lg text-text-secondary leading-relaxed mb-10 font-medium">
              Join 50k+ professionals mastering their schedules with AI-powered automation.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Always Free", desc: "No credit cards required." },
                { title: "AI Prioritization", desc: "Focus on what matters most." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-morphism border border-white/5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="text-text-secondary text-xs">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(39,195,154,0.05)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent z-0" />
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 relative">
        <div className="absolute top-8 right-8 flex items-center gap-4 z-20">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-[380px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-black mb-3 tracking-tight">
              {isLogin ? "Log In" : "Sign Up"}
            </h2>
            <p className="text-text-secondary font-medium outline-none">
              {isLogin ? "Welcome back to NextTask" : "Start your journey for free"}
            </p>
          </motion.div>

          <div className="flex gap-4 mb-6">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 glass-morphism p-3 rounded-xl font-bold transition-all cursor-pointer border border-card-border shadow-sm"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">Github</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 glass-morphism p-3 rounded-xl font-bold transition-all cursor-pointer border border-card-border shadow-sm"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">Google</span>
            </motion.button>
          </div>

          <div className="relative mb-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-card-border" />
            </div>
            <span className="relative bg-background px-3 text-[10px] font-black uppercase tracking-widest text-text-secondary">Or</span>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label className="text-[10px] font-black ml-1 uppercase tracking-widest opacity-60">Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-accent/30 border border-card-border rounded-xl p-3 pl-11 outline-none focus:border-primary focus:bg-accent/50 transition-all text-sm font-medium"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black ml-1 uppercase tracking-widest opacity-60">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@email.com"
                  className="w-full bg-accent/30 border border-card-border rounded-xl p-3 pl-11 outline-none focus:border-primary focus:bg-accent/50 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Password</label>
                {isLogin && <button className="text-[10px] font-black text-primary hover:underline transition-all">Forgot?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-accent/30 border border-card-border rounded-xl p-3 pl-11 outline-none focus:border-primary focus:bg-accent/50 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white p-4 rounded-xl font-black text-sm shadow-xl shadow-primary/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLogin ? "Log In" : "Sign Up"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          <p className="text-center mt-8 text-xs text-text-secondary font-bold">
            {isLogin ? "New to NextTask?" : "Have an account?"}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary-dark transition-all underline decoration-2 underline-offset-4 cursor-pointer"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
