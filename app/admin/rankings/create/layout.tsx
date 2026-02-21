import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Ranking",
  description: "Add a new ranking",
};

export default function CreateRankingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
