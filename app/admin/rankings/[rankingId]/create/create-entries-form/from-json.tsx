"use client";

import { useState } from "react";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { nameToKey } from "@/lib/slugify";
import {
  jsonEntrySchema,
  type EntryInput,
  type JsonEntry,
} from "./schema";

type ParsedEntry = JsonEntry & { key: string };

export function FromJson(props: { rankingId: Id<"rankings"> }) {
  const { rankingId } = props;
  const createBulk = useMutation(api.rankingEntries.createBulkRankingEntries);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [entries, setEntries] = useState<ParsedEntry[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(null);

    try {
      const text = await file.text();
      const parsed: unknown = JSON.parse(text);

      if (!Array.isArray(parsed)) {
        setError("Expected a JSON array");
        return;
      }

      const parsedEntries: ParsedEntry[] = [];

      for (let i = 0; i < parsed.length; i++) {
        const result = jsonEntrySchema.safeParse(parsed[i]);
        if (!result.success) {
          const msg = result.error.issues[0]?.message ?? "Invalid entry";
          setError(`Entry ${i + 1}: ${msg}`);
          return;
        }
        parsedEntries.push({
          ...result.data,
          key: nameToKey(result.data.name),
        });
      }

      if (parsedEntries.length === 0) {
        setError("No valid entries in file");
        return;
      }

      setEntries(parsedEntries);
      e.target.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  }

  async function handleCreate() {
    if (entries.length === 0) return;

    setError(null);
    setSuccess(null);
    setIsCreating(true);

    try {
      const entryInputs: EntryInput[] = entries.map((e) => ({
        rank: e.rank,
        key: e.key,
        name: e.name,
        city: e.city,
        country: e.country,
      }));
      await createBulk({ rankingId, entries: entryInputs });
      setSuccess(`Created ${entries.length} entries`);
      setEntries([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create entries");
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <FieldGroup>
      <Field>
        <FieldLabel>JSON file</FieldLabel>
        <p className="text-muted-foreground mb-2 text-sm">
          JSON array:{" "}
          {`[{"rank":1,"name":"Bar Leone","city":"Hong Kong","country":"Hong Kong"}, ...]`}
        </p>
        <Input
          type="file"
          accept=".json,application/json"
          onChange={handleUpload}
          className="cursor-pointer"
        />
      </Field>
      {error && (
        <p role="alert" className="text-destructive text-sm">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="text-muted-foreground text-sm">
          {success}
        </p>
      )}
      {entries.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-muted/60 text-left">
                <tr className="border-b border-border">
                  <th className="px-4 py-3 font-semibold text-muted-foreground">
                    Rank
                  </th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">
                    Key
                  </th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">
                    Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">
                    City
                  </th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">
                    Country
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr
                    key={`${entry.rank}-${i}`}
                    className="border-b border-border/70 last:border-b-0"
                  >
                    <td className="px-4 py-3 font-medium">{entry.rank}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">
                      {entry.key}
                    </td>
                    <td className="px-4 py-3">{entry.name}</td>
                    <td className="px-4 py-3">{entry.city ?? "—"}</td>
                    <td className="px-4 py-3">{entry.country ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleCreate}
              disabled={isCreating}
            >
              {isCreating ? "Creating…" : "Create entries"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEntries([]);
                setError(null);
                setSuccess(null);
              }}
            >
              Clear
            </Button>
          </div>
        </>
      )}
    </FieldGroup>
  );
}
