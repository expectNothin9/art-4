"use client";

import { useState } from "react";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { entrySchema } from "./schema";

export function ByManual(props: { rankingId: Id<"rankings"> }) {
  const { rankingId } = props;
  const createBulk = useMutation(api.rankingEntries.createBulkRankingEntries);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [rank, setRank] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const result = entrySchema.safeParse({
      rank: rank || undefined,
      key: key.trim() || undefined,
      name: name.trim() || undefined,
      city: city.trim() || undefined,
      country: country.trim() || undefined,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    try {
      await createBulk({ rankingId, entries: [result.data] });
      setSuccess("Entry added");
      setKey("");
      setName("");
      setCity("");
      setCountry("");
      setRank("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add entry");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="manual-rank">Rank</FieldLabel>
          <Input
            id="manual-rank"
            type="number"
            min={1}
            max={500}
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="e.g. 1"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="manual-key">Key</FieldLabel>
          <Input
            id="manual-key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g. bar-slug"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="manual-name">Name</FieldLabel>
          <Input
            id="manual-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. The Bar"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="manual-city">City</FieldLabel>
          <Input
            id="manual-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Hong Kong"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="manual-country">Country</FieldLabel>
          <Input
            id="manual-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. Hong Kong"
            required
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
        <Field orientation="horizontal">
          <Button type="submit">Add entry</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
