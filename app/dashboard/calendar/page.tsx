"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Plus,
  MoreVertical
} from "lucide-react";

import CreateTaskModal from "../../components/dashboard/CreateTaskModal";

export default function CalendarPage() {
  const [currentDate] = useState(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = () => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
            setTasks(data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);
  
  const handleCreateTask = async (newTask: any) => {
    await fetch("/api/tasks/ai-create", {
        method: "POST",
        body: JSON.stringify(newTask),
    });
    fetchTasks();
  };

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();
  
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const totalDays = daysInMonth(month, year);
  const startDay = firstDayOfMonth(month, year);
  
  const days = [];
  // Previous month padding
  for (let i = 0; i < startDay; i++) {
    days.push({ day: "", current: false });
  }
  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    days.push({ day: i, current: true });
  }

  const events = tasks
    .filter(t => t.dueDate)
    .map(t => {
        const d = new Date(t.dueDate);
        return {
            day: d.getDate(),
            month: d.getMonth(),
            year: d.getFullYear(),
            title: t.title,
            color: t.priority === "High" ? "bg-red-500" : t.priority === "Medium" ? "bg-primary" : "bg-blue-500"
        };
    })
    .filter(e => e.month === month && e.year === year);


  return (
    <div className="space-y-8 h-full">
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleCreateTask} 
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Calendar</h1>
          <p className="text-text-secondary font-medium">Keep track of your deadlines and meetings.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-accent/30 rounded-xl border border-card-border p-1">
             <button className="p-2 hover:bg-background rounded-lg transition-colors cursor-pointer"><ChevronLeft className="w-5 h-5" /></button>
             <div className="px-4 py-2 text-sm font-black uppercase tracking-wider">{monthName} {year}</div>
             <button className="p-2 hover:bg-background rounded-lg transition-colors cursor-pointer"><ChevronRight className="w-5 h-5" /></button>
          </div>
          <motion.button 
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-primary text-white p-3 rounded-xl font-black text-sm shadow-xl shadow-primary/20 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="glass-morphism rounded-3xl border border-card-border overflow-hidden shadow-2xl shadow-black/5">
        {/* Calendar Grid Header */}
        <div className="grid grid-cols-7 border-b border-card-border bg-accent/30">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-50">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid Body */}
        <div className="grid grid-cols-7">
          {days.map((d, i) => (
            <div 
              key={i} 
              className={`min-h-[120px] p-2 border-r border-b border-card-border last:border-r-0 hover:bg-primary/5 transition-colors group relative ${!d.current ? "bg-accent/5" : ""}`}
            >
              <div className={`text-sm font-bold m-1 w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${d.day === 7 ? "bg-primary text-white shadow-lg shadow-primary/30" : d.current ? "text-foreground" : "text-text-secondary opacity-30"}`}>
                {d.day}
              </div>
              
              <div className="mt-2 space-y-1">
                {events.filter(e => e.day === d.day).map((event, idx) => (
                  <div key={idx} className={`${event.color} text-white text-[10px] p-1.5 rounded-lg font-bold truncate transition-all hover:scale-105 cursor-pointer shadow-sm`}>
                    {event.title}
                  </div>
                ))}
              </div>

              {d.current && (
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-3 right-3 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                   <Plus className="w-3 h-3 text-text-secondary" />
                </button>
              )}
            </div>
          ))}
          {/* Fill the remaining grid cells if any */}
          {Array.from({ length: 42 - days.length }).map((_, i) => (
            <div key={i} className="min-h-[120px] border-r border-b border-card-border last:border-r-0 bg-accent/5 opacity-50" />
          ))}
        </div>
      </div>
    </div>
  );
}
