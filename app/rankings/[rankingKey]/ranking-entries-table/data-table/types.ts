import type { Id } from "@/convex/_generated/dataModel";

export type RankingEntry = {
  _id: Id<"rankingEntries">;
  rank: number;
  barName: string;
  city: string;
  country: string;
};
