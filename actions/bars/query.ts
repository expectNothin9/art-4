"use server";

import type { BestBar } from "./type";

import asiaBestBars from "./mock-data.json";

export async function getAsiasBestBars(): Promise<BestBar[]> {
  await new Promise((r) => setTimeout(r, 300));
  return asiaBestBars as BestBar[];
}
