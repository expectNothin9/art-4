import type { Metadata } from "next";
import { fetchQuery, preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import RankingEntriesCreate from "./ranking-entries-create";
import { Breadcrumbs } from "./breadcrumbs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ rankingId: string }>;
}): Promise<Metadata> {
  const { rankingId } = await params;
  const ranking = await fetchQuery(api.rankings.getRankingById, {
    id: rankingId as Id<"rankings">,
  });
  if (!ranking) return { title: "Not Found" };
  return {
    title: `Add Entry | ${ranking.title}`,
    description: `Add a new entry to ${ranking.title}`,
  };
}

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
