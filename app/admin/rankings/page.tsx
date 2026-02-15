import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import AdminRankings from "./admin-rankings";

export default async function AdminRankingsPage() {
  const preloadedRankings = await preloadQuery(api.rankings.getRankings);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AdminRankings preloadedRankings={preloadedRankings} />
    </main>
  );
}
