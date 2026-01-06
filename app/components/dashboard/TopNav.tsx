"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function TopNav({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="h-20 border-b border-card-border bg-background/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 md:hidden hover:bg-accent rounded-xl transition-colors cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Search Bar */}
        <div className="relative w-64 lg:w-96 group hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
          <input 
          type="text" 
          placeholder="Search for tasks, projects..."
          className="w-full bg-accent/30 border border-card-border rounded-xl p-2.5 pl-11 outline-none focus:border-primary focus:bg-accent/50 transition-all text-sm font-medium"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-card-border text-[10px] font-black text-text-secondary opacity-50">
          ⌘K
        </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4 border-r border-card-border pr-6">
          <ThemeToggle />
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl glass-morphism text-text-secondary hover:text-primary transition-colors cursor-pointer relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
          </motion.button>
        </div>

        <Link href="/dashboard/settings" className="flex items-center space-x-3 cursor-pointer group">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-black truncate max-w-[120px]">{user?.name || "User"}</p>
            <p className="text-[10px] text-text-secondary font-bold truncate">Project Manager</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-accent overflow-hidden border border-card-border group-hover:border-primary/50 transition-colors flex items-center justify-center">
            {user?.image ? (
              <img 
                src={user.image} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-primary/10 text-primary font-black text-xs w-full h-full flex items-center justify-center">
                {(user?.name || "??").split(" ").map(n => n[0]).join("").toUpperCase()}
              </div>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-text-secondary group-hover:text-primary transition-transform group-hover:translate-y-0.5" />
        </Link>
      </div>
    </header>
  );
}
