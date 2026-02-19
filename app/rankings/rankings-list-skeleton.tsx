export function RankingsListSkeleton() {
  return (
    <ul className="divide-y divide-border rounded-lg border border-border">
      {Array.from({ length: 1 }).map((_, i) => (
        <li key={i} className="flex items-center justify-between px-4 py-3">
          <div className="h-5 w-48 animate-pulse rounded bg-muted" />
          <div className="h-5 w-8 animate-pulse rounded bg-muted" />
        </li>
      ))}
    </ul>
  );
}
