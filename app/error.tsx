"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, RefreshCw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary/30">
      {/* Background Animated Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] animate-bounce duration-[10s]" />
      </div>

      {/* Massive Error Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[20rem] md:text-[35rem] font-black text-red-500/[0.05] leading-none select-none"
        >
          OOPS
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
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Application Error</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            Something went <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">wrong!</span>
          </h2>
          
          <p className="text-lg text-text-secondary font-medium leading-relaxed max-w-lg mx-auto">
            We encountered an unexpected error. Don't worry, it's not you - it's us. We've been notified and are looking into it.
          </p>

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
              className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all cursor-pointer"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </motion.button>
            
            <Link href="/">
                <button
                className="flex items-center gap-2 glass-morphism px-8 py-4 rounded-2xl font-black hover:bg-white/5 transition-all cursor-pointer border border-card-border"
                >
                <Home className="w-5 h-5 text-primary" />
                Back to Home
                </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Micro-elements */}
      <div className="absolute bottom-10 left-10 opacity-20 hidden md:block">
        <div className="w-24 h-24 border-2 border-red-500/30 rounded-full border-dashed animate-spin-slow" />
      </div>
      <div className="absolute top-20 right-20 opacity-20 hidden md:block">
        <div className="w-16 h-16 bg-gradient-to-tr from-red-500 to-orange-500 rounded-3xl rotate-45 animate-pulse" />
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
