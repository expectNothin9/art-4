import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bars").collect();
  },
});

export const getByKey = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    return await ctx.db
      .query("bars")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();
  },
});

export const createBar = mutation({
  args: {
    key: v.string(),
    name: v.string(),
    city: v.string(),
    country: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bars", args);
  },
});
