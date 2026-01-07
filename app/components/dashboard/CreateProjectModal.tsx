"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Folder, AlignLeft, Plus, Loader2 } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: {
    name: string;
    description: string;
  }) => Promise<void>;
}

export default function CreateProjectModal({ isOpen, onClose, onSave }: ProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    
    setLoading(true);
    try {
        await onSave({ name, description });
        setName("");
        setDescription("");
        onClose();
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
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
            className="relative w-full max-w-lg glass-morphism rounded-3xl border border-card-border bg-background shadow-2xl"
          >
            <div className="p-6 border-b border-card-border flex items-center justify-between">
              <h2 className="text-xl font-black">Create New Project</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-accent rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 ml-1">Project Name</label>
                <div className="relative group">
                    <Folder className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input 
                    autoFocus
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Website Redesign"
                    className="w-full bg-accent/30 border border-card-border rounded-xl p-4 pl-11 outline-none focus:border-primary focus:bg-accent/50 transition-all font-medium"
                    />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 ml-1">Description</label>
                <div className="relative group">
                    <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-text-secondary" />
                    <textarea 
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe the project goals..."
                    className="w-full bg-accent/30 border border-card-border rounded-xl p-4 pl-11 outline-none focus:border-primary focus:bg-accent/50 transition-all font-medium resize-none"
                    />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white p-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                {loading ? "Creating..." : "Create Project"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
