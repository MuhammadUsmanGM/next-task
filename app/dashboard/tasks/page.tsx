"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Calendar,
  Tag
} from "lucide-react";

import CreateTaskModal from "../../components/dashboard/CreateTaskModal";

type Task = {
  id: number;
  title: string;
  project: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Pending";
  dueDate: string;
};

const initialTasks: Task[] = [
  { id: 1, title: "Design Landing Page Mockup", project: "Portfolio Project", priority: "High", status: "In Progress", dueDate: "Today" },
  { id: 2, title: "Database Schema Implementation", project: "SaaS App", priority: "Medium", status: "Pending", dueDate: "Tomorrow" },
  { id: 3, title: "Client Feedback Review", project: "Marketing Site", priority: "Low", status: "In Progress", dueDate: "Jan 10" },
  { id: 4, title: "API Documentation Draft", project: "NextTask Core", priority: "High", status: "Pending", dueDate: "Jan 12" },
  { id: 5, title: "User Interview Analysis", project: "UX Research", priority: "Medium", status: "Completed", dueDate: "Yesterday" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      if (Array.isArray(data)) setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTasks();
    const handleRefresh = () => fetchTasks();
    window.addEventListener('taskAdded', handleRefresh);
    return () => window.removeEventListener('taskAdded', handleRefresh);
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  const handleCreateTask = async (newTask: any) => {
    await fetch("/api/tasks/ai-create", {
        method: "POST",
        body: JSON.stringify(newTask),
    });
    fetchTasks();
  };

  const toggleTaskStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-8">
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleCreateTask} 
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2">My Tasks</h1>
          <p className="text-text-secondary font-medium">Manage and organize your daily work efficiently.</p>
        </div>
        <div className="flex gap-3">
          <motion.button 
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-black text-sm shadow-xl shadow-primary/20 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Add New Task
          </motion.button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          {["All", "In Progress", "Pending", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                filter === f 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                  : "bg-accent/30 text-text-secondary hover:bg-accent/50 border border-card-border"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search tasks..."
            className="bg-accent/30 border border-card-border rounded-xl p-2.5 pl-11 outline-none focus:border-primary focus:bg-accent/50 transition-all text-sm font-medium w-full md:w-64"
          />
        </div>
      </div>

      {/* Tasks Content */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <motion.div
              layout
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-morphism p-5 rounded-2xl border border-card-border flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-primary/30 transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <button 
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.status === "Completed" ? "bg-primary border-primary" : "border-card-border hover:border-primary"
                  }`}
                  onClick={() => {
                    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" } : t));
                  }}
                >
                  {task.status === "Completed" && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>
                <div>
                  <h3 className={`font-bold text-sm ${task.status === "Completed" ? "line-through text-text-secondary opacity-50" : ""}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                      <Tag className="w-3 h-3" /> {task.project}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                      <Calendar className="w-3 h-3" /> {task.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                    task.priority === "High" ? "bg-red-500/10 text-red-500" :
                    task.priority === "Medium" ? "bg-amber-500/10 text-amber-500" :
                    "bg-blue-500/10 text-blue-500"
                  }`}>
                    {task.priority}
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1 bg-accent/30 rounded-lg border border-card-border">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      task.status === "Completed" ? "bg-green-500" :
                      task.status === "In Progress" ? "bg-primary animate-pulse" :
                      "bg-amber-500"
                    }`} />
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{task.status}</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-background transition-colors text-text-secondary cursor-pointer md:opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
