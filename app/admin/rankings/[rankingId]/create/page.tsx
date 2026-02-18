import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import RankingEntriesCreate from "./ranking-entries-create";
import { Breadcrumbs } from "./breadcrumbs";

export default async function RankingEntriesCreatePage({
  params,
}: {
  params: Promise<{ rankingId: string }>;
}) {
  const { rankingId } = await params;
  const id = rankingId as Id<"rankings">;

  const preloadedRanking = await preloadQuery(api.rankings.getRankingById, {
    id,
  });
  const ranking = preloadedQueryResult(preloadedRanking);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Breadcrumbs ranking={ranking} />
      <RankingEntriesCreate
        preloadedRanking={preloadedRanking}
        rankingId={id}
      />
    </main>
  );
}
