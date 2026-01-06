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
  Sparkles,
  CheckCircle2
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col md:flex-row overflow-hidden">
      <div className="hero-glow" />
      
      {/* Left Side: Visual/Brand (Hidden on mobile) */}
      <div className="hidden md:flex flex-1 relative bg-accent/30 border-r border-card-border items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-10 left-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl glass-morphism group-hover:bg-primary/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-sm">Back to Home</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <img src="/logo1.png" alt="Next Task Logo" className="h-10 w-auto" />
              <span className="text-3xl font-bold tracking-tight">
                Next<span className="text-primary">Task</span>
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tight leading-tight mb-6">
              Master your <br />
              <span className="gradient-text">Productivity</span> <br />
              with Intelligence.
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-10">
              Join thousands of professionals who have simplified their workflow with our AI-powered task management.
            </p>

            <div className="space-y-4">
              {[
                "100% Free Forever",
                "Advanced AI Prioritization",
                "Seamless Cloud Sync",
                "Stunning Dark & Light Modes"
              ].map((text, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-text-secondary">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent z-0" />
        <motion.div 
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 blur-[100px] rounded-full"
        />
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative">
        <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-4">
          <ThemeToggle />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-text-secondary">
              {isLogin 
                ? "Good to see you again! Please enter your details." 
                : "Join NextTask today and start being more productive."}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center gap-3 glass-morphism p-3.5 rounded-2xl font-semibold hover:bg-white/5 transition-all active:scale-95">
              <Github className="w-5 h-5" />
              <span>Continue with Github</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 glass-morphism p-3.5 rounded-2xl font-semibold hover:bg-white/5 transition-all active:scale-95">
              <Mail className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-card-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-text-secondary font-medium tracking-widest">Or continue with</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-accent/50 border border-card-border rounded-2xl p-4 pl-12 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-accent/50 border border-card-border rounded-2xl p-4 pl-12 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-accent/50 border border-card-border rounded-2xl p-4 pl-12 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
                />
              </div>
            </div>

            <button className="w-full bg-primary hover:bg-primary-dark text-white p-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-2">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center mt-10 text-text-secondary font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary-dark font-bold underline decoration-2 underline-offset-4 decoration-primary/20 hover:decoration-primary transition-all"
            >
              {isLogin ? "Sign up for free" : "Log in"}
            </button>
          </p>
        </motion.div>

        {/* Mobile footer logo */}
        <div className="md:hidden mt-12 flex items-center space-x-2 opacity-50">
          <img src="/logo1.png" alt="Next Task Logo" className="h-6" />
          <span className="font-bold tracking-tight">NextTask</span>
        </div>
      </div>
    </div>
  );
}
