"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag, AlertCircle, Plus } from "lucide-react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: {
    title: string;
    project: string;
    priority: "High" | "Medium" | "Low";
    dueDate: string;
  }) => void;
}

export default function CreateTaskModal({ isOpen, onClose, onSave }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("General");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onSave({ title, project, priority, dueDate: dueDate || "No Date" });
    setTitle("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-morphism rounded-3xl border border-card-border overflow-hidden bg-background shadow-2xl"
          >
            <div className="p-6 border-b border-card-border flex items-center justify-between">
              <h2 className="text-xl font-black">Create New Task</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-accent rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 ml-1">Task Title</label>
                <input 
                  autoFocus
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full bg-accent/30 border border-card-border rounded-xl p-4 outline-none focus:border-primary focus:bg-accent/50 transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 ml-1">Project</label>
                  <div className="relative group">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <select 
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      className="w-full bg-accent/30 border border-card-border rounded-xl p-3.5 pl-11 outline-none focus:border-primary transition-all font-medium text-sm appearance-none"
                    >
                      <option>General</option>
                      <option>Portfolio Project</option>
                      <option>SaaS App</option>
                      <option>Personal</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 ml-1">Due Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input 
                      type="text" 
                      placeholder="e.g., Today, Jan 15"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full bg-accent/30 border border-card-border rounded-xl p-3.5 pl-11 outline-none focus:border-primary transition-all font-medium text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 ml-1">Priority</label>
                <div className="flex gap-2">
                  {(["Low", "Medium", "High"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-3 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                        priority === p 
                          ? p === "High" ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20" :
                            p === "Medium" ? "bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20" :
                            "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                          : "bg-accent/30 text-text-secondary border-card-border hover:bg-accent/50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-white p-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
