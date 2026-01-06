import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage your complex projects and team collaborations.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
