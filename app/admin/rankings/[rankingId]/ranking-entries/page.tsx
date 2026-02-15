"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export default function AdminRankingEntriesPage() {
  const params = useParams();
  const rankingId = params.rankingId as Id<"rankings">;

  const ranking = useQuery(
    api.rankings.getRankingById,
    rankingId ? { id: rankingId } : "skip",
  );
  const entries = useQuery(
    api.rankingEntries.getRankingEntriesByRankingId,
    rankingId ? { rankingId } : "skip",
  );

  if (ranking === undefined || entries === undefined) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex w-full max-w-2xl flex-col gap-4">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      </main>
    );
  }

  if (ranking === null) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex w-full max-w-2xl flex-col gap-4">
          <p className="text-destructive">Ranking not found</p>
          <Link href="/admin/rankings" className="text-primary underline">
            Back to rankings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/rankings"
            className="text-primary underline underline-offset-4 hover:no-underline"
          >
            ← Back
          </Link>
          <h1 className="text-lg font-semibold">
            {ranking.title} ({ranking.year})
          </h1>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted/60 text-left">
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold text-muted-foreground">
                  Rank
                </th>
                <th className="px-4 py-3 font-semibold text-muted-foreground">
                  Bar
                </th>
                <th className="px-4 py-3 font-semibold text-muted-foreground">
                  City
                </th>
                <th className="px-4 py-3 font-semibold text-muted-foreground">
                  Country
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No entries yet
                  </td>
                </tr>
              ) : (
                entries.map(({ _id, rank, barName, city, country }) => (
                  <tr
                    key={_id}
                    className="border-b border-border/70 last:border-b-0"
                  >
                    <td className="px-4 py-3 font-medium">{rank}</td>
                    <td className="px-4 py-3">{barName}</td>
                    <td className="px-4 py-3">{city}</td>
                    <td className="px-4 py-3">{country}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
