"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag, Plus, ChevronDown, ChevronLeft, ChevronRight, Check } from "lucide-react";

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

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder,
  icon: Icon 
}: { 
  options: { id: string; label: string }[]; 
  value: string; 
  onChange: (value: string) => void;
  placeholder: string;
  icon: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(o => o.id === value)?.label || placeholder;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-accent/30 border ${isOpen ? "border-primary" : "border-card-border"} rounded-xl p-3.5 pl-11 flex items-center justify-between outline-none transition-all font-medium text-sm text-left`}
      >
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <span className={value ? "text-foreground" : "text-text-secondary"}>{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 w-full mt-2 bg-background/95 backdrop-blur-xl border border-card-border rounded-xl shadow-xl overflow-hidden custom-scrollbar max-h-48 overflow-y-auto"
          >
            {options.length > 0 ? (
                options.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between group"
                >
                    <span className="font-bold">{option.label}</span>
                    {value === option.id && <Check className="w-4 h-4 text-primary" />}
                </button>
                ))
            ) : (
                <div className="p-4 text-xs text-text-secondary text-center font-medium">No projects found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CustomDatePicker = ({ value, onChange }: { value: string; onChange: (date: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const handleDayClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onChange(date.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth(currentMonth); i++) days.push(null);
  for (let i = 1; i <= daysInMonth(currentMonth); i++) days.push(i);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-accent/30 border ${isOpen ? "border-primary" : "border-card-border"} rounded-xl p-3.5 pl-11 flex items-center justify-between outline-none transition-all font-medium text-sm text-left`}
      >
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <span className={value ? "text-foreground" : "text-text-secondary"}>
          {value ? new Date(value).toLocaleDateString(undefined, { dateStyle: "medium" }) : "Select Due Date"}
        </span>
        <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 w-[300px] mt-2 bg-background/95 backdrop-blur-xl border border-card-border rounded-xl shadow-xl p-4 right-0 md:left-0"
          >
            <div className="flex items-center justify-between mb-4">
              <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-accent rounded-lg transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-sm font-black text-center w-full">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-accent rounded-lg transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} className="text-[10px] font-bold text-text-secondary">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={!day}
                  onClick={() => day && handleDayClick(day)}
                  className={`text-xs p-2 rounded-lg font-bold transition-all ${
                    !day ? "invisible" : 
                    (value && new Date(value).getDate() === day && new Date(value).getMonth() === currentMonth.getMonth() && new Date(value).getFullYear() === currentMonth.getFullYear()) 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "hover:bg-accent text-foreground"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function CreateTaskModal({ isOpen, onClose, onSave }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("General");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState("");
  const [projectsList, setProjectsList] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
        fetch("/api/projects")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setProjectsList(data);
            })
            .catch(err => console.error(err));
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onSave({ title, project, priority, dueDate: dueDate || new Date().toISOString() });
    setTitle("");
    setProject("General");
    setDueDate("");
    onClose();
  };

  const projectOptions = [
    { id: "General", label: "General" },
    ...projectsList.map(p => ({ id: p.id, label: p.name }))
  ];

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
                  <CustomSelect 
                    options={projectOptions}
                    value={project}
                    onChange={setProject}
                    placeholder="Select Project"
                    icon={Tag}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 ml-1">Due Date</label>
                  <CustomDatePicker 
                    value={dueDate}
                    onChange={setDueDate}
                  />
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
