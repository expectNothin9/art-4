import { query } from "./_generated/server";
import { v } from "convex/values";

export const getRankingEntriesByRankingId = query({
  args: { rankingId: v.id("rankings") },
  handler: async (ctx, { rankingId }) => {
    const entries = await ctx.db
      .query("rankingEntries")
      .withIndex("by_ranking_rank", (q) => q.eq("rankingId", rankingId))
      .collect();
    return Promise.all(
      entries.map(async (e) => {
        const bar = await ctx.db.get(e.barId);
        return {
          ...e,
          barName: bar?.name ?? "—",
          city: bar?.city ?? "—",
          country: bar?.country ?? "—",
        };
      }),
    );
  },
});
