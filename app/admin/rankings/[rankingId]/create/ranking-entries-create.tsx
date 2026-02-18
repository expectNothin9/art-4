"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import CreateEntriesForm from "./create-entries-form";

export default function RankingEntriesCreate(props: {
  preloadedRanking: Preloaded<typeof api.rankings.getRankingById>;
  rankingId: Id<"rankings">;
}) {
  const ranking = usePreloadedQuery(props.preloadedRanking);
  const rankingId = props.rankingId;

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      {/**
       * TODO: update to two ways to create entries:
       * 1. Upload a JSONL file
       * 2. Let us manually input the entries (one by one)
       */}
      <CreateEntriesForm ranking={ranking} rankingId={rankingId} />
    </div>
  );
}
