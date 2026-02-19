// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bars: defineTable({
    key: v.string(),
    name: v.string(),
    city: v.string(),
    country: v.string(),
  })
    .index("by_key", ["key"])
    // 常見查詢：用名稱搜尋、或依地區篩
    .index("by_name", ["name"])
    .index("by_country_city", ["country", "city"]),

  rankings: defineTable({
    key: v.string(), // slug from title, e.g. "asias-50-best-bars"
    // e.g. "Asia's 50 Best Bars"
    title: v.string(),
    year: v.number(), // e.g. 2025
  })
    .index("by_key", ["key"])
    // 讓你用 (title, year) 快速拿到那份榜單
    .index("by_title_year", ["title", "year"]),

  rankingEntries: defineTable({
    rankingId: v.id("rankings"),
    barId: v.id("bars"),
    rank: v.number(), // 1..50
  })
    // 取某份榜單的所有名次（排序可在 query 端做）
    .index("by_ranking_rank", ["rankingId", "rank"])
    // 反查某個酒吧在某份榜單的名次（可選，但很常用）
    .index("by_ranking_bar", ["rankingId", "barId"]),

  awards: defineTable({
    // e.g. "Best Bar Design Award"
    title: v.string(),
    year: v.number(), // e.g. 2025
  }).index("by_title_year", ["title", "year"]),

  awardWinners: defineTable({
    awardId: v.id("awards"),
    barId: v.id("bars"),
  })
    // 取某年份某獎項的得主
    .index("by_award", ["awardId"])
    // 反查某酒吧得過哪些獎（可選但實用）
    .index("by_bar", ["barId"]),
});
