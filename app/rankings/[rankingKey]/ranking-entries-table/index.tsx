"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "./data-table";

export function RankingEntriesTable(props: {
  preloadedRanking: Preloaded<typeof api.rankings.getRankingByKey>;
  preloadedEntries: Preloaded<
    typeof api.rankingEntries.getRankingEntriesByRankingId
  >;
}) {
  const ranking = usePreloadedQuery(props.preloadedRanking);
  const entries = usePreloadedQuery(props.preloadedEntries);

  if (!ranking) return null;

  return <DataTable data={entries} />;
}
