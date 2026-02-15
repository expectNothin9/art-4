"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.coerce.number().int().min(2000).max(2100),
});

export default function AdminRankingsCreatePage() {
  const router = useRouter();
  const createRanking = useMutation(api.rankings.createRanking);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const result = formSchema.safeParse({ title, year: year || undefined });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    try {
      await createRanking({ title: result.data.title, year: result.data.year });
      router.push("/admin/rankings");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create ranking");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Asia's 50 Best Bars"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="year">Year</FieldLabel>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2025"
              min={2000}
              max={2100}
              required
            />
          </Field>
          {error && (
            <p role="alert" className="text-destructive text-sm">
              {error}
            </p>
          )}
          <Field orientation="horizontal">
            <Button type="submit">Create</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/rankings")}
            >
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </main>
  );
}
