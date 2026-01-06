import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Login or Sign Up to NextTask to manage your productivity.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
