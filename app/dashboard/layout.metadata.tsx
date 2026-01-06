import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your tasks and productivity performance.",
};

export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
