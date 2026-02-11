import { BestBar } from "./best-50-data";

type Best50TableProps = {
  data: BestBar[];
};

export function Best50Table({ data }: Best50TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-muted/60 text-left">
          <tr className="border-b border-border">
            <th className="px-4 py-3 font-semibold text-muted-foreground">
              Rank
            </th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">
              Bar
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
          {data.map((bar) => (
            <tr
              key={bar.rank}
              className="border-b border-border/70 last:border-b-0"
            >
              <td className="px-4 py-3 font-medium">{bar.rank}</td>
              <td className="px-4 py-3">{bar.name}</td>
              <td className="px-4 py-3">{bar.city}</td>
              <td className="px-4 py-3">{bar.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
