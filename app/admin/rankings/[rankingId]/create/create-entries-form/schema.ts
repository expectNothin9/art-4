import { z } from "zod";

export const jsonEntrySchema = z.object({
  rank: z.coerce.number().int().min(1).max(500),
  name: z.string().min(1, "Name is required"),
  city: z.string().optional(),
  country: z.string().optional(),
});

export type JsonEntry = z.infer<typeof jsonEntrySchema>;

export const entrySchema = z.object({
  rank: z.coerce.number().int().min(1).max(500),
  key: z.string().min(1, "Key is required"),
  name: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export type EntryInput = z.infer<typeof entrySchema>;
