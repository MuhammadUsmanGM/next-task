import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar",
  description: "View your schedule and deadlines in a calendar view.",
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
