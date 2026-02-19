import { fetchQuery } from "convex/nextjs";
import Link from "next/link";
import { api } from "@/convex/_generated/api";

export async function RankingsList() {
  const rankings = await fetchQuery(api.rankings.getRankings);

  if (!rankings.length) {
    return (
      <p className="text-sm text-muted-foreground">No rankings yet.</p>
    );
  }

  return (
    <ul className="divide-y divide-border rounded-lg border border-border">
      {rankings.map(({ _id, key, title, year }) => (
        <li
          key={_id}
          className="flex items-center justify-between px-4 py-3 text-sm"
        >
          {key ? (
            <Link
              href={`/rankings/${key}`}
              className="font-medium hover:underline"
            >
              {title}
            </Link>
          ) : (
            <span className="font-medium">{title}</span>
          )}
          <span className="text-muted-foreground">{year}</span>
        </li>
      ))}
    </ul>
  );
}
