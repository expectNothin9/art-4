import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import RankingEntriesCreate from "./ranking-entries-create";

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RankingEntriesCreate
        preloadedRanking={preloadedRanking}
        rankingId={id}
      />
    </main>
  );
}
