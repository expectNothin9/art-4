import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { notFound } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { RankingEntriesTable } from "./ranking-entries-table";
import { Breadcrumbs } from "./breadcrumbs";

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
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-12">
      <Breadcrumbs ranking={ranking} />
      <RankingEntriesTable
        preloadedRanking={preloadedRanking}
        preloadedEntries={preloadedEntries}
      />
    </main>
  );
}
