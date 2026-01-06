import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics",
  description: "Analyze your productivity trends and efficiency metrics.",
};

export default function StatisticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
