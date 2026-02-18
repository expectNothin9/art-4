import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import AdminRankingEntries from "./admin-ranking-entries";

export default async function AdminRankingEntriesPage({
  params,
}: {
  params: Promise<{ rankingId: string }>;
}) {
  const { rankingId } = await params;
  const id = rankingId as Id<"rankings">;

  const preloadedRanking = await preloadQuery(api.rankings.getRankingById, {
    id,
  });
  const preloadedEntries = await preloadQuery(
    api.rankingEntries.getRankingEntriesByRankingId,
    {
      rankingId: id,
    },
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AdminRankingEntries
        preloadedRanking={preloadedRanking}
        preloadedEntries={preloadedEntries}
      />
    </main>
  );
}
