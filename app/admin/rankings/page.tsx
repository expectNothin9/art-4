"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Copy, Plus } from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

export default function AdminRankingsPage() {
  const rankings = useQuery(api.rankings.getRankings);

  const copyId = (id: Id<"rankings">) => {
    void navigator.clipboard.writeText(id);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <Link href="/admin/rankings/create">
          <Button>
            <Plus />
            Create a new ranking
          </Button>
        </Link>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted/60 text-left">
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold text-muted-foreground">
                  ID
                </th>
                <th className="px-4 py-3 font-semibold text-muted-foreground">
                  Title
                </th>
                <th className="px-4 py-3 font-semibold text-muted-foreground">
                  Year
                </th>
                <th className="px-4 py-3 font-semibold text-muted-foreground">
                  Entries
                </th>
              </tr>
            </thead>
            <tbody>
              {rankings?.map(({ _id, title, year }) => (
                <tr
                  key={_id}
                  className="border-b border-border/70 last:border-b-0"
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    <span className="flex items-center gap-2">
                      {_id}
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => copyId(_id)}
                        aria-label="Copy ID"
                      >
                        <Copy className="size-3" />
                      </Button>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{title}</td>
                  <td className="px-4 py-3">{year}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/rankings/${_id}/ranking-entries`}
                      className="text-primary underline underline-offset-4 hover:no-underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
