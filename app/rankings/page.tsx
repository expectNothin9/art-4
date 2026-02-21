import type { Metadata } from "next";
import { Suspense } from "react";
import { RankingsList } from "./rankings-list";
import { RankingsListSkeleton } from "./rankings-list-skeleton";

export const metadata: Metadata = {
  title: "Rankings",
  description: "Browse all rankings",
};

export default async function RankingsPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Rankings</h1>
      </header>
      <Suspense fallback={<RankingsListSkeleton />}>
        <RankingsList />
      </Suspense>
    </main>
  );
}
