import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const entryArgValidator = v.object({
  rank: v.number(), // validated 1-500 client-side via Zod
  key: v.string(),
  name: v.optional(v.string()),
  city: v.optional(v.string()),
  country: v.optional(v.string()),
});

export const createBulkRankingEntries = mutation({
  args: {
    rankingId: v.id("rankings"),
    entries: v.array(entryArgValidator),
  },
  handler: async (ctx, { rankingId, entries }) => {
    const ranking = await ctx.db.get(rankingId);
    if (!ranking) {
      throw new Error("Ranking not found");
    }

    const existingRanks = new Set(
      (
        await ctx.db
          .query("rankingEntries")
          .withIndex("by_ranking_rank", (q) => q.eq("rankingId", rankingId))
          .collect()
      ).map((e) => e.rank),
    );

    const keyToBarId = new Map<string, Id<"bars">>();

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (existingRanks.has(entry.rank)) {
        throw new Error(`Duplicate rank ${entry.rank} at line ${i + 1}`);
      }

      let barId = keyToBarId.get(entry.key);
      if (!barId) {
        const existingBar = await ctx.db
          .query("bars")
          .withIndex("by_key", (q) => q.eq("key", entry.key))
          .first();
        if (existingBar) {
          barId = existingBar._id;
        } else {
          const hasBarDetails =
            entry.name !== undefined &&
            entry.city !== undefined &&
            entry.country !== undefined;
          if (!hasBarDetails) {
            throw new Error(
              `Bar "${entry.key}" not found at line ${i + 1}. Provide name, city, country to create.`,
            );
          }
          barId = await ctx.db.insert("bars", {
            key: entry.key,
            name: entry.name!,
            city: entry.city!,
            country: entry.country!,
          });
        }
        keyToBarId.set(entry.key, barId);
      }

      await ctx.db.insert("rankingEntries", {
        rankingId,
        barId,
        rank: entry.rank,
      });
      existingRanks.add(entry.rank);
    }
  },
});

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
