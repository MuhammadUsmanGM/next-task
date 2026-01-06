"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary/30">
      {/* Background Animated Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-bounce duration-[10s]" />
      </div>

      {/* Massive 404 Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[20rem] md:text-[35rem] font-black text-primary/[0.1] leading-none select-none"
        >
          404
        </motion.h1>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
        {/* Logo */}
        <motion.div
           initial={{ y: -20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="mb-12"
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <img src="/logo1.png" alt="NextTask Logo" className="h-12 w-auto relative z-10" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
            </div>
            <span className="text-3xl font-black tracking-tighter">
              Next<span className="text-primary">Task</span>
            </span>
          </Link>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Navigation Error</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            Lost in <span className="gradient-text">Space?</span>
          </h2>
          
          <p className="text-lg text-text-secondary font-medium leading-relaxed max-w-lg mx-auto">
            The page you’re looking for seems to have vanished into thin air. Don’t let it slow your productivity down.
          </p>

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all cursor-pointer"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>
            
            <button
               onClick={() => window.history.back()}
               className="flex items-center gap-2 glass-morphism px-8 py-4 rounded-2xl font-black hover:bg-white/5 transition-all cursor-pointer border border-card-border"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Micro-elements */}
      <div className="absolute bottom-10 left-10 opacity-20 hidden md:block">
        <div className="w-24 h-24 border-2 border-primary/30 rounded-full border-dashed animate-spin-slow" />
      </div>
      <div className="absolute top-20 right-20 opacity-20 hidden md:block">
        <div className="w-16 h-16 bg-gradient-to-tr from-primary to-blue-500 rounded-3xl rotate-45 animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
