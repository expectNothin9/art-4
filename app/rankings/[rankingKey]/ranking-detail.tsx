"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export function RankingDetail(props: {
  preloadedRanking: Preloaded<typeof api.rankings.getRankingByKey>;
  preloadedEntries: Preloaded<
    typeof api.rankingEntries.getRankingEntriesByRankingId
  >;
}) {
  const ranking = usePreloadedQuery(props.preloadedRanking);
  const entries = usePreloadedQuery(props.preloadedEntries);

  if (!ranking) return null;

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-12">
      <header className="space-y-3">
        <Link
          href="/rankings"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <ArrowLeftIcon className="size-4" /> Back to rankings
        </Link>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {ranking.year} Edition
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          {ranking.title}
        </h1>
      </header>
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
    </main>
  );
}
