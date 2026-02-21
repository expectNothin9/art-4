import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bars",
  description: "Manage bars",
};

export default function AdminBarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
