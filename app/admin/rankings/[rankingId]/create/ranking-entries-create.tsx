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
      <CreateEntriesForm ranking={ranking} rankingId={rankingId} />
    </div>
  );
}
