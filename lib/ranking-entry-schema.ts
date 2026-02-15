// TODO: we should use the convex schema instead of zod
// TODO: move to somewhere close to UI, instead of lib
import { z } from "zod";

export const entryLineSchema = z.object({
  rank: z.number().int().min(1).max(500),
  key: z.string().min(1),
  name: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export type EntryLine = z.infer<typeof entryLineSchema>;

export interface ParseResult {
  success: true;
  entries: EntryLine[];
}

export interface ParseError {
  success: false;
  message: string;
  line?: number;
}

export function parseJsonlEntries(input: string): ParseResult | ParseError {
  const lines = input
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const entries: EntryLine[] = [];

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    let parsed: unknown;
    try {
      parsed = JSON.parse(lines[i]!);
    } catch {
      return { success: false, message: "Invalid JSON", line: lineNum };
    }

    const result = entryLineSchema.safeParse(parsed);
    if (!result.success) {
      const firstIssue = result.error.issues[0];
      const msg = firstIssue?.message ?? "Validation failed";
      return { success: false, message: msg, line: lineNum };
    }

    entries.push(result.data);
  }

  return { success: true, entries };
}
