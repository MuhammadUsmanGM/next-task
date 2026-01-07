"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Folder, 
  MoreVertical, 
  Users, 
  Calendar,
  Layers,
  Search,
  Plus
} from "lucide-react";

import CreateProjectModal from "../../components/dashboard/CreateProjectModal";

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const fetchProjects = () => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (newProject: any) => {
    await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(newProject),
    });
    fetchProjects();
  };

  return (
    <div className="space-y-8">
      <CreateProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateProject}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Projects</h1>
          <p className="text-text-secondary font-medium">Keep your team's work organized and synchronized.</p>
        </div>
        <div className="flex gap-3">
          <motion.button 
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-black text-sm shadow-xl shadow-primary/20 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            New Project
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search projects..."
              className="bg-accent/30 border border-card-border rounded-xl p-2.5 pl-11 outline-none focus:border-primary focus:bg-accent/50 transition-all text-sm font-medium w-full md:w-80"
            />
          </div>
        </div>
        <div className="text-xs font-bold text-text-secondary">Showing {projects.length} Active Projects</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-morphism rounded-3xl border border-card-border p-6 hover:border-primary/30 transition-all group active:scale-[0.98] cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${project.bg}`}>
                <Folder className={`w-6 h-6 ${project.color}`} />
              </div>
              <button className="p-2 hover:bg-background rounded-lg text-text-secondary">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-lg font-black mb-1 group-hover:text-primary transition-colors">{project.name}</h3>
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-1.5 h-1.5 rounded-full ${project.status === "Active" ? "bg-primary animate-pulse" : "bg-amber-500"}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{project.status}</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-text-secondary">Project Progress</span>
                <span className="text-primary">{project.progress}%</span>
              </div>
              <div className="h-2 w-full bg-accent rounded-full overflow-hidden border border-card-border">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                  className="h-full bg-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-card-border">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(u => (
                  <div key={u} className="w-8 h-8 rounded-full bg-accent border-2 border-background overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.id * u}`} alt="User" />
                  </div>
                ))}
                {project.team > 3 && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-[10px] font-black text-primary">
                    +{project.team - 3}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{project.tasks}</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{project.team}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
