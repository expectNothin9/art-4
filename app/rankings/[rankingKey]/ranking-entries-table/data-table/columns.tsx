import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import type { RankingEntry } from "./types";

const inArrayFilterFn: FilterFn<RankingEntry> = (row, columnId, filterValue) => {
  const selected = filterValue as string[] | undefined;
  if (!selected?.length) return true;
  const val = row.getValue(columnId) as string;
  return selected.includes(val);
};
inArrayFilterFn.autoRemove = (val: unknown) =>
  !Array.isArray(val) || val.length === 0;

export { inArrayFilterFn };

const rankColumnDef: ColumnDef<RankingEntry> = {
  accessorKey: "rank",
  header: "Rank",
  cell: ({ row }) => row.original.rank,
};

const barNameColumnDef: ColumnDef<RankingEntry> = {
  accessorKey: "barName",
  header: "Bar",
  cell: (info) => info.getValue(),
};

const cityColumnDef: ColumnDef<RankingEntry> = {
  accessorKey: "city",
  header: "City",
  cell: (info) => info.getValue(),
  filterFn: inArrayFilterFn,
  enableColumnFilter: true,
};

const countryColumnDef: ColumnDef<RankingEntry> = {
  accessorKey: "country",
  header: "Country",
  cell: (info) => info.getValue(),
  filterFn: inArrayFilterFn,
  enableColumnFilter: true,
};

export const columns: ColumnDef<RankingEntry>[] = [
  rankColumnDef,
  barNameColumnDef,
  cityColumnDef,
  countryColumnDef,
];
