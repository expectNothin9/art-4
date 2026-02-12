"use server";

import type { BestBar } from "./type";

import asiaBestBars from "./mock-data/asias.json";
import worldsBestBars from "./mock-data/worlds.json";

export async function getBestBars({
  region,
}: {
  region: "asias" | "worlds";
}): Promise<BestBar[]> {
  await new Promise((r) => setTimeout(r, 300));
  return region === "asias" ? asiaBestBars : (worldsBestBars as BestBar[]);
}
