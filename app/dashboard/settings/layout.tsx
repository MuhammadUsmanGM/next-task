import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Configure your profile, notifications, and security settings.",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
