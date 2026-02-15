import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("rankings").collect();
  },
});

export const createRanking = mutation({
  args: {
    title: v.string(),
    year: v.number(),
  },
  handler: async (ctx, { title, year }) => {
    return await ctx.db.insert("rankings", { title, year });
  },
});
