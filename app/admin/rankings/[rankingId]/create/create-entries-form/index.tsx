"use client";

import type { Id } from "@/convex/_generated/dataModel";
import type { Doc } from "@/convex/_generated/dataModel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ByManual } from "./by-manual";
import { FromJson } from "./from-json";

export default function CreateEntriesForm(props: {
  ranking: Doc<"rankings"> | null;
  rankingId: Id<"rankings">;
}) {
  const { ranking, rankingId } = props;

  if (ranking === null) {
    return <p className="text-destructive">Ranking not found</p>;
  }

  return (
    <div className="create-entries-form flex w-full max-w-2xl flex-col gap-4">
      <Tabs defaultValue="json" className="w-full">
        <TabsList>
          <TabsTrigger value="json">From JSON</TabsTrigger>
          <TabsTrigger value="manual">By manual</TabsTrigger>
        </TabsList>
        <TabsContent value="json" className="mt-4">
          <FromJson rankingId={rankingId} />
        </TabsContent>
        <TabsContent value="manual" className="mt-4">
          <ByManual rankingId={rankingId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
