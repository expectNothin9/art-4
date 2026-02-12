import { getBestBars } from "@/actions/best-bars/query";
import { BestBarsTable } from "@/app/best-bars/best-bars-table";

export default async function WorldsBestBarsPage() {
  const data = await getBestBars({ region: "worlds" });
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          2025 Edition
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Asia&apos;s 50 Best Bars
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          A static snapshot of the 50-best ranking list, presented as a
          server-rendered table.
        </p>
      </header>
      <BestBarsTable data={data} />
    </main>
  );
}
