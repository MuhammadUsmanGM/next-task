"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  MoreVertical,
  Plus,
  Check
} from "lucide-react";
import CreateTaskModal from "../components/dashboard/CreateTaskModal";
import { authClient } from "@/lib/auth-client";

const initialTasks = [
  { id: 1, title: "Design Landing Page Mockup", project: "Portfolio Project", priority: "High", due: "Today", status: "In Progress" },
  { id: 2, title: "Database Schema Implementation", project: "SaaS App", priority: "Medium", due: "Tomorrow", status: "Pending" },
  { id: 3, title: "Client Feedback Review", project: "Marketing Site", priority: "Low", due: "2 days", status: "In Progress" },
  { id: 4, title: "API Documentation Draft", project: "NextTask Core", priority: "High", due: "Jan 12", status: "Pending" },
];

export default function DashboardOverview() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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

  const completedCount = tasks.filter(t => t.status === "Completed").length;
  const inProgressCount = tasks.filter(t => t.status === "In Progress").length;
  const pendingCount = tasks.filter(t => t.status === "Pending").length;

  const stats = [
    { label: "Total Tasks", value: String(tasks.length).padStart(2, "0"), change: "+12%", icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
    { label: "In Progress", value: String(inProgressCount).padStart(2, "0"), change: "+4%", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Pending", value: String(pendingCount).padStart(2, "0"), change: "-2%", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
    { label: "Completed", value: String(completedCount).padStart(2, "0"), change: "+15%", icon: Check, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  const handleCreateTask = async (newTask: any) => {
    // Optimization: we could call the API here directly
    await fetch("/api/tasks/ai-create", {
        method: "POST",
        body: JSON.stringify(newTask),
    });
    fetchTasks();
  };

  const toggleTaskStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
    // Optimistic update
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    
    // In a full implementation, we'd have a PATCH route. For now, we'll keep it simple.
  };

  return (
    <div className="space-y-10">
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleCreateTask} 
      />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Dashboard Overview</h1>
          <p className="text-text-secondary font-medium">Welcome back, {user?.name.split(" ")[0] || "Buddy"}! You have <span className="text-primary font-bold">{tasks.filter(t => t.priority === "High" && t.status !== "Completed").length} high-priority tasks</span> pending.</p>
        </div>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-morphism p-6 rounded-3xl border border-card-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-xs font-black ${stat.change.startsWith("+") ? "text-primary" : "text-red-500"}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-text-secondary text-sm font-bold mb-1">{stat.label}</h3>
            <p className="text-3xl font-black">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">Recent Tasks</h2>
            <Link href="/dashboard/tasks" className="text-primary text-xs font-black hover:underline underline-offset-4">View All Tasks</Link>
          </div>
          
          <div className="glass-morphism rounded-3xl border border-card-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest opacity-50 text-center w-16">Done</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest opacity-50">Task Name</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest opacity-50">Priority</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest opacity-50">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest opacity-50 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border/50">
                  <AnimatePresence mode="popLayout">
                    {tasks.slice(0, 5).map((task) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        key={task.id} 
                        className="hover:bg-primary/5 transition-colors group"
                      >
                        <td className="px-6 py-4 text-center">
                          <button 
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              task.status === "Completed" ? "bg-primary border-primary" : "border-card-border hover:border-primary"
                            }`}
                            onClick={() => toggleTaskStatus(task.id, task.status)}
                          >
                            {task.status === "Completed" && <Check className="w-4 h-4 text-white" />}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className={`text-sm font-bold ${task.status === "Completed" ? "line-through opacity-40" : ""}`}>{task.title}</p>
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider mt-0.5">{task.project}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                            task.priority === "High" ? "bg-red-500/10 text-red-500" :
                            task.priority === "Medium" ? "bg-amber-500/10 text-amber-500" :
                            "bg-blue-500/10 text-blue-500"
                          }`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              task.status === "In Progress" ? "bg-primary" : 
                              task.status === "Completed" ? "bg-green-500" : 
                              "bg-text-secondary opacity-30"
                            }`} />
                            <span className="text-xs font-bold text-text-secondary">{task.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 rounded-lg hover:bg-background transition-colors text-text-secondary cursor-pointer">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Calendar / Activity Preview */}
        <div className="space-y-6">
          <h2 className="text-xl font-black">Activity</h2>
          <div className="glass-morphism rounded-3xl border border-card-border p-6 space-y-8">
            {[1, 2, 3, 4].map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== 3 && <div className="absolute left-[19px] top-10 bottom-[-20px] w-0.5 bg-card-border" />}
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0 border border-card-border">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                    className="w-2 h-2 rounded-full bg-primary" 
                  />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-bold">Task Completed</p>
                  <p className="text-xs text-text-secondary font-medium">You finished "Database Schema Implementation"</p>
                  <p className="text-[10px] text-text-secondary opacity-50 font-bold mt-1 uppercase tracking-wider">10 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
