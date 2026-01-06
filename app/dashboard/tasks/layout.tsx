import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Tasks",
  description: "Organize and track your daily tasks.",
};

export default function TasksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
