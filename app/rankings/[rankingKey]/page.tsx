import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { notFound } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { RankingDetail } from "./ranking-detail";

export default async function RankingByKeyPage({
  params,
}: {
  params: Promise<{ rankingKey: string }>;
}) {
  const { rankingKey } = await params;

  const preloadedRanking = await preloadQuery(api.rankings.getRankingByKey, {
    key: rankingKey,
  });

  const ranking = preloadedQueryResult(preloadedRanking);
  if (!ranking) notFound();

  const preloadedEntries = await preloadQuery(
    api.rankingEntries.getRankingEntriesByRankingId,
    { rankingId: ranking._id },
  );

  return (
    <RankingDetail
      preloadedRanking={preloadedRanking}
      preloadedEntries={preloadedEntries}
    />
  );
}
