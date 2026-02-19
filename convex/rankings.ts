import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { nameToKey } from "../lib/slugify";

export const getRankings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("rankings")
      .collect()
      .then((rows) =>
        rows.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title)),
      );
  },
});

export const getRankingById = query({
  args: { id: v.id("rankings") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getRankingByKey = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    const matches = await ctx.db
      .query("rankings")
      .withIndex("by_key", (q) => q.eq("key", key))
      .collect();
    if (matches.length === 0) return null;
    return matches.sort((a, b) => b.year - a.year)[0];
  },
});

export const createRanking = mutation({
  args: {
    key: v.string(),
    title: v.string(),
    year: v.number(),
  },
  handler: async (ctx, { key, title, year }) => {
    return await ctx.db.insert("rankings", { key, title, year });
  },
});
