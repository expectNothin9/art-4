"use client";

import { useState } from "react";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { parseJsonlEntries } from "@/lib/ranking-entry-schema";

export default function CreateEntriesForm(props: {
  ranking: Doc<"rankings"> | null;
  rankingId: Id<"rankings">;
}) {
  const createBulk = useMutation(api.rankingEntries.createBulkRankingEntries);
  const router = useRouter();
  const [jsonl, setJsonl] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (props.ranking === null) {
    return <p className="text-destructive">Ranking not found</p>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const result = parseJsonlEntries(jsonl);
    if (!result.success) {
      setError(
        result.line != null
          ? `Line ${result.line}: ${result.message}`
          : result.message,
      );
      return;
    }

    if (result.entries.length === 0) {
      setError("No valid entries. Add at least one line.");
      return;
    }

    const duplicateRanks = new Map<number, number>();
    for (let i = 0; i < result.entries.length; i++) {
      const rank = result.entries[i]!.rank;
      if (duplicateRanks.has(rank)) {
        setError(
          `Duplicate rank ${rank} at lines ${duplicateRanks.get(rank)! + 1} and ${i + 1}`,
        );
        return;
      }
      duplicateRanks.set(rank, i);
    }

    try {
      await createBulk({
        rankingId: props.rankingId,
        entries: result.entries,
      });
      router.push(`/admin/rankings/${props.rankingId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create entries");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <h1 className="text-lg font-semibold">
        Create entries for {props.ranking.title} ({props.ranking.year})
      </h1>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="jsonl">JSONL entries</FieldLabel>
          <Textarea
            id="jsonl"
            value={jsonl}
            onChange={(e) => setJsonl(e.target.value)}
            placeholder={`{"rank": 1, "key": "coa", "name": "Coa", "city": "Hong Kong", "country": "Hong Kong"}\n{"rank": 2, "key": "caprice", "name": "Caprice Bar", "city": "Hong Kong", "country": "Hong Kong"}`}
            className="min-h-[200px] font-mono text-sm"
          />
          <p className="text-muted-foreground text-xs">
            One JSON object per line. Required: rank (1–500), key. Optional for
            new bars: name, city, country.
          </p>
        </Field>
        {error && (
          <p role="alert" className="text-destructive text-sm">
            {error}
          </p>
        )}
        <Field orientation="horizontal">
          <Button type="submit">Create entries</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/admin/rankings/${props.rankingId}`)}
          >
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
