"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdminBarsPage() {
  const bars = useQuery(api.bars.get);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {bars?.map(({ _id, name }) => (
        <div key={_id}>{name}</div>
      ))}
    </main>
  );
}
