"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Settings, 
  LogOut,
  FolderOpen,
  PieChart,
  PlusCircle
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: CheckSquare, label: "My Tasks", href: "/dashboard/tasks" },
  { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
  { icon: FolderOpen, label: "Projects", href: "/dashboard/projects" },
  { icon: PieChart, label: "Statistics", href: "/dashboard/stats" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar({ isOpen, setOpen }: { isOpen: boolean, setOpen: (open: boolean) => void }) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        }
      }
    });
  };

  return (
    <>
    <div className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-accent/30 border-r border-card-border flex flex-col p-6 transition-transform duration-300 md:relative md:translate-x-0 shrink-0
      ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
    `}>
      {/* Mobile Close Button */}
      <button 
        onClick={() => setOpen(false)}
        className="absolute top-6 right-6 p-2 md:hidden text-text-secondary hover:text-foreground"
      >
        <PlusCircle className="w-6 h-6 rotate-45" />
      </button>

      {/* Logo */}
      <div className="flex items-center space-x-3 mb-10 px-2 shrink-0">
        <img src="/logo1.png" alt="Logo" className="h-8 w-auto" />
        <span className="text-xl font-black tracking-tighter">
          Next<span className="text-primary">Task</span>
        </span>
      </div>

      {/* Main Menu */}
      <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2 pb-4">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-4 px-2 opacity-50">
          Main Menu
        </div>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-text-secondary hover:text-foreground hover:bg-primary/5"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-primary/70"}`} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* User / Logout */}
      <div className="pt-6 border-t border-card-border shrink-0">
        <div className="flex items-center space-x-3 px-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
            {user?.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-primary font-black text-sm">
                {(user?.name || "??").split(" ").map(n => n[0]).join("").toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-black truncate">{user?.name || "Guest User"}</p>
            <p className="text-[10px] text-text-secondary font-bold truncate">Free Plan</p>
          </div>
        </div>
        
        <button 
          onClick={handleSignOut}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-500/5 transition-all w-full cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
    </>
  );
}
