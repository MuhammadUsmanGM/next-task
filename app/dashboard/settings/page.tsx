"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  CreditCard,
  Camera,
  Mail,
  Lock
} from "lucide-react";
import ThemeToggle from "../../components/ThemeToggle";

import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const { data: session, isPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState("Profile");
  const [saving, setSaving] = useState(false);
  
  // Profile State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");

  React.useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setUsername((session.user as any).username || "");
      setPosition((session.user as any).position || "");
      setLocation((session.user as any).location || "");
    }
  }, [session]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await authClient.updateUser({
        name,
        // @ts-ignore
        username,
        position,
        location,
      });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "Profile", icon: User },
    { id: "Notifications", icon: Bell },
    { id: "Security", icon: Shield },
    { id: "Plan", icon: CreditCard },
  ];

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight mb-2">Settings</h1>
        <p className="text-text-secondary font-medium">Manage your account preferences and application configuration.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="lg:w-64 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-text-secondary hover:bg-accent/50"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.id}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-morphism rounded-3xl border border-card-border p-8 md:p-10"
          >
            {activeTab === "Profile" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center gap-8 border-b border-card-border pb-8">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                      {session?.user.image ? (
                        <img 
                          src={session.user.image} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-black text-2xl">
                          {session?.user.name[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-black mb-1">{session?.user.name}</h2>
                    <p className="text-text-secondary font-medium mb-4">
                      {position || "Not Specified"} {location ? `based in ${location}` : ""}
                    </p>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider rounded-lg">Free Account</span>
                       <span className="px-3 py-1 bg-accent text-text-secondary text-[10px] font-black uppercase tracking-wider rounded-lg border border-card-border">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary opacity-60">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-accent/30 border border-card-border rounded-xl p-3.5 outline-none focus:border-primary transition-all font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary opacity-60">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                      <input 
                        type="email" 
                        value={email}
                        disabled
                        className="w-full bg-accent/5 cursor-not-allowed border border-card-border rounded-xl p-3.5 pl-12 outline-none font-medium text-sm opacity-60"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary opacity-60">Username</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. usman_mustafa"
                      className="w-full bg-accent/30 border border-card-border rounded-xl p-3.5 outline-none focus:border-primary transition-all font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary opacity-60">Position / Role</label>
                    <input 
                      type="text" 
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="e.g. Project Manager"
                      className="w-full bg-accent/30 border border-card-border rounded-xl p-3.5 outline-none focus:border-primary transition-all font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary opacity-60">Location</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                      <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Doha, Qatar"
                        className="w-full bg-accent/30 border border-card-border rounded-xl p-3.5 pl-12 outline-none focus:border-primary transition-all font-medium text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                   <button 
                    onClick={() => {
                        window.location.reload();
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-sm text-text-secondary hover:bg-accent transition-all cursor-pointer">Cancel</button>
                   <button 
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="px-6 py-3 rounded-xl bg-primary text-white font-black text-sm shadow-xl shadow-primary/20 cursor-pointer flex items-center gap-2">
                       {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                       {saving ? "Saving..." : "Save Changes"}
                   </button>
                </div>
              </div>
            )}

            {activeTab === "Security" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-black mb-1">Change Password</h3>
                  <p className="text-sm text-text-secondary mb-6">Update your password to keep your account secure.</p>
                  
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">Current Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                        <input type="password" placeholder="••••••••" className="w-full bg-accent/30 border border-card-border rounded-xl p-3 pl-11 outline-none focus:border-primary transition-all text-sm font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">New Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                        <input type="password" placeholder="••••••••" className="w-full bg-accent/30 border border-card-border rounded-xl p-3 pl-11 outline-none focus:border-primary transition-all text-sm font-medium" />
                      </div>
                    </div>
                    <button className="bg-primary text-white px-6 py-3 rounded-xl font-black text-xs shadow-lg shadow-primary/20 cursor-pointer">Update Password</button>
                  </div>
                </div>

                <div className="pt-8 border-t border-card-border">
                  <h3 className="text-lg font-black mb-1 text-red-500">Danger Zone</h3>
                  <p className="text-sm text-text-secondary mb-6">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="border border-red-500/20 text-red-500 hover:bg-red-500/5 px-6 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer">Delete Account</button>
                </div>
              </div>
            )}

            {activeTab === "Notifications" && (
              <div className="space-y-6">
                <h3 className="text-lg font-black mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    "Email notifications for new tasks",
                    "Push notifications for deadlines",
                    "Weekly productivity reports",
                    "Product updates and announcements"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-accent/10 border border-card-border">
                      <span className="font-bold text-sm">{item}</span>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary/20 cursor-pointer">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-primary transition translate-x-6" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
