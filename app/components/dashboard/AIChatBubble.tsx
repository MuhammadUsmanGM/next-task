"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, Bot, User, Loader2, Plus, Check, Trash2, Edit2, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

interface Message {
  role: "user" | "ai";
  content: string;
  isTask?: boolean;     // For Create
  isDelete?: boolean;   // For Delete
  isUpdate?: boolean;   // For Update
  taskData?: any;
}

export default function AIChatBubble() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hey! I'm your NextTask AI. You can ask me to create, update, or delete tasks!" }
  ]);
  const [loading, setLoading] = useState(false);
  const [userTasks, setUserTasks] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchTasks = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUserTasks(data);
      }
    } catch (e) {
      console.error("Failed to fetch tasks for context", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
        fetchTasks();
    }
  }, [isOpen, user]);

  const handleSend = async () => {
    if (!input.trim() || loading || !user) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      // Pass tasks as context
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMsg, tasks: userTasks }),
      });
      const data = await res.json();

      let newMessage: Message = { role: "ai", content: data.reply };

      if (data.intent === "create_task") {
        newMessage.isTask = true;
        newMessage.taskData = data.task;
      } else if (data.intent === "delete_task") {
        newMessage.isDelete = true;
        newMessage.taskData = { id: data.taskId, title: data.taskTitle };
      } else if (data.intent === "update_task") {
        newMessage.isUpdate = true;
        newMessage.taskData = { id: data.taskId, updates: data.updates };
      }

      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I ran into an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const confirmCreateTask = async (task: any) => {
    try {
      const res = await fetch("/api/tasks/ai-create", {
        method: "POST",
        body: JSON.stringify(task),
      });

      if (res.ok) {
        setMessages(prev => [...prev, { role: "ai", content: `Great! I've added "${task.title}" to your dashboard.` }]);
        window.dispatchEvent(new CustomEvent('taskAdded'));
        fetchTasks(); // update context
      } else {
        setMessages(prev => [...prev, { role: "ai", content: "I couldn't save that task. Please try again." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", content: "Something went wrong while saving the task." }]);
    }
  };

  const confirmDeleteTask = async (task: any) => {
     try {
        const res = await fetch("/api/tasks", {
            method: "DELETE",
            body: JSON.stringify({ id: task.id }),
        });

        if (res.ok) {
            setMessages(prev => [...prev, { role: "ai", content: `Task "${task.title}" has been deleted.` }]);
            window.dispatchEvent(new CustomEvent('taskAdded')); // Trigger refresh
            fetchTasks(); 
        } else {
            setMessages(prev => [...prev, { role: "ai", content: "Failed to delete task." }]);
        }
     } catch (error) {
         setMessages(prev => [...prev, { role: "ai", content: "Error deleting task." }]);
     }
  };

  const confirmUpdateTask = async (task: any) => {
      try {
        const res = await fetch("/api/tasks", {
            method: "PATCH",
            body: JSON.stringify({ id: task.id, ...task.updates }),
        });

        if (res.ok) {
            setMessages(prev => [...prev, { role: "ai", content: `Task updated successfully.` }]);
            window.dispatchEvent(new CustomEvent('taskAdded')); 
            fetchTasks(); 
        } else {
            setMessages(prev => [...prev, { role: "ai", content: "Failed to update task." }]);
        }
      } catch (error) {
        setMessages(prev => [...prev, { role: "ai", content: "Error updating task." }]);
      }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[380px] h-[550px] glass-morphism rounded-[2.5rem] border border-card-border shadow-2xl overflow-hidden flex flex-col bg-background/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-primary/10 border-b border-card-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tight">NextTask AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">AI Assistant</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-accent rounded-xl transition-colors text-text-secondary cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area / Login Overlay */}
            {!user ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-2">
                  <Bot className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-black mb-2">Unlock AI Power</h4>
                  <p className="text-sm text-text-secondary font-medium">Please login or sign up to interact with our AI Assistant and create tasks instantly.</p>
                </div>
                <Link href="/auth" className="w-full">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 cursor-pointer"
                  >
                    Login / Sign Up
                  </motion.button>
                </Link>
              </div>
            ) : (
              <>
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
                >
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-card-border ${msg.role === "ai" ? "bg-primary/10 text-primary" : "bg-accent text-text-secondary"}`}>
                          {msg.role === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div className="space-y-3">
                          <div className={`p-4 rounded-[1.5rem] text-sm font-medium shadow-sm ${
                            msg.role === "ai" 
                              ? "bg-accent/50 text-foreground border border-card-border rounded-tl-none" 
                              : "bg-primary text-white rounded-tr-none"
                          }`}>
                            {msg.content}
                          </div>

                          {/* CREATE Task Card */}
                          {msg.isTask && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-background border border-primary/20 p-4 rounded-2xl shadow-xl shadow-primary/5 space-y-3"
                            >
                              <div className="flex justify-between items-start">
                                 <div>
                                   <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 mb-1">New Task</p>
                                   <p className="text-sm font-bold">{msg.taskData.title}</p>
                                 </div>
                                 <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                                   msg.taskData.priority === "High" ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
                                 }`}>{msg.taskData.priority}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                                 <Check className="w-3 h-3" /> Due: {msg.taskData.dueDate}
                              </div>
                              <button 
                                onClick={() => confirmCreateTask(msg.taskData)}
                                className="w-full bg-primary text-white py-2 rounded-xl text-xs font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform cursor-pointer"
                              >
                                Confirm Task
                              </button>
                            </motion.div>
                          )}

                          {/* DELETE Task Card */}
                          {msg.isDelete && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-background border border-red-500/20 p-4 rounded-2xl shadow-xl shadow-red-500/5 space-y-3"
                            >
                              <div className="flex justify-between items-start">
                                 <div>
                                   <p className="text-[10px] font-black uppercase tracking-widest text-red-400 opacity-80 mb-1">Delete Task</p>
                                   <p className="text-sm font-bold">{msg.taskData.title}</p>
                                 </div>
                                 <Trash2 className="w-4 h-4 text-red-500" />
                              </div>
                              <div className="text-[10px] text-text-secondary">
                                Are you sure you want to delete this task? This action cannot be undone.
                              </div>
                              <button 
                                onClick={() => confirmDeleteTask(msg.taskData)}
                                className="w-full bg-red-500 text-white py-2 rounded-xl text-xs font-black shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-transform cursor-pointer"
                              >
                                Confirm Delete
                              </button>
                            </motion.div>
                          )}

                           {/* UPDATE Task Card */}
                           {msg.isUpdate && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-background border border-blue-500/20 p-4 rounded-2xl shadow-xl shadow-blue-500/5 space-y-3"
                            >
                              <div className="flex justify-between items-start">
                                 <div>
                                   <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 opacity-80 mb-1">Update Task</p>
                                   <p className="text-sm font-bold">Applying Changes...</p>
                                 </div>
                                 <Edit2 className="w-4 h-4 text-blue-500" />
                              </div>
                              <div className="text-[10px] text-text-secondary space-y-1">
                                {msg.taskData.updates.title && <p>• Title: {msg.taskData.updates.title}</p>}
                                {msg.taskData.updates.status && <p>• Status: {msg.taskData.updates.status}</p>}
                                {msg.taskData.updates.priority && <p>• Priority: {msg.taskData.updates.priority}</p>}
                              </div>
                              <button 
                                onClick={() => confirmUpdateTask(msg.taskData)}
                                className="w-full bg-blue-500 text-white py-2 rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-transform cursor-pointer"
                              >
                                Confirm Changes
                              </button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-card-border">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="flex gap-1 px-3 py-4 rounded-2xl bg-accent/50 border border-card-border">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-accent/30 border-t border-card-border">
                  <div className="relative flex items-center gap-2">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type anything..."
                      className="flex-1 bg-background border border-card-border rounded-2xl p-4 pr-12 outline-none focus:border-primary transition-all text-sm font-medium shadow-inner"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={loading || !input.trim()}
                      className="absolute right-2 p-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 disabled:opacity-50 hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-[2rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 cursor-pointer relative z-10 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-green-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X className="w-7 h-7 relative z-10" /> : <Sparkles className="w-7 h-7 relative z-10" />}
      </motion.button>
    </div>
  );
}
