"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  Calendar,
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function StatisticsPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Statistics & Insights</h1>
          <p className="text-text-secondary font-medium">Track your performance and productivity trends over time.</p>
        </div>
        <div className="flex bg-accent/30 rounded-xl border border-card-border p-1">
           {["Daily", "Weekly", "Monthly"].map(t => (
             <button key={t} className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${t === "Weekly" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-secondary"}`}>{t}</button>
           ))}
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-2 glass-morphism rounded-3xl border border-card-border p-8 h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-xl">Productivity Trend</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /><span className="text-[10px] font-bold text-text-secondary">Completed</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-[10px] font-bold text-text-secondary">Assigned</span></div>
            </div>
          </div>
          <div className="flex-1 flex items-end justify-between gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 95, 75, 60, 85, 40].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1 items-center justify-end h-full min-h-[150px]">
                   <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: i * 0.05 }} className="w-full bg-primary/20 rounded-t-lg relative group">
                      <motion.div initial={{ height: 0 }} animate={{ height: `${h * 0.7}%` }} className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg" />
                   </motion.div>
                </div>
                <span className="text-[10px] font-black text-text-secondary opacity-50 uppercase tracking-tighter">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-morphism rounded-3xl border border-card-border p-8 flex flex-col">
           <h3 className="font-black text-xl mb-8">Task Distribution</h3>
           <div className="flex-1 flex items-center justify-center relative">
              <svg className="w-48 h-48 -rotate-90">
                <circle cx="96" cy="96" r="80" fill="none" stroke="currentColor" strokeWidth="20" className="text-accent/30" />
                <motion.circle 
                  cx="96" cy="96" r="80" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" 
                  initial={{ strokeDasharray: "0 502" }} animate={{ strokeDasharray: "350 502" }} transition={{ duration: 1.5 }}
                  className="text-primary" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                <span className="text-4xl font-black">72%</span>
                <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Efficiency</span>
              </div>
           </div>
           <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between text-sm font-bold">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /><span>Completed</span></div>
                 <span>324</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /><span>In Progress</span></div>
                 <span>84</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /><span>Overdue</span></div>
                 <span>12</span>
              </div>
           </div>
        </motion.div>
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Avg. Completion Time", value: "2.4h", trend: "-15%", icon: Clock, color: "text-blue-500" },
          { label: "Tasks Finished", value: "32", trend: "+24%", icon: CheckCircle2, color: "text-primary" },
          { label: "AI Suggestions", value: "148", trend: "+52%", icon: Zap, color: "text-amber-500" },
          { label: "Deadlines Met", value: "98%", trend: "+1.2%", icon: Calendar, color: "text-green-500" }
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (i * 0.1) }} className="glass-morphism rounded-2xl border border-card-border p-6 group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-accent/30 rounded-xl group-hover:bg-primary/10 transition-colors">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`flex items-center text-[10px] font-black ${stat.trend.startsWith("+") ? "text-primary" : "text-blue-500"}`}>
                {stat.trend} {stat.trend.startsWith("+") ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <p className="text-text-secondary text-xs font-bold mb-1">{stat.label}</p>
            <h4 className="text-2xl font-black">{stat.value}</h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
