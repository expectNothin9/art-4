"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";

export type RankingEntry = {
  _id: Id<"rankingEntries">;
  rank: number;
  barName: string;
  city: string;
  country: string;
};

type DataTableProps = {
  data: RankingEntry[];
};

export function DataTable({ data }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<RankingEntry>[] = [
    // rank, barName, city, country
    {
      accessorKey: "rank",
      header: "Rank",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "barName",
      header: "Bar Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "city",
      header: "City",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: (info) => info.getValue(),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="ranking-entries-table flex flex-col gap-4">
      <div className="filters">
        <Input
          type="text"
          placeholder="Search"
          value={(table.getColumn("barName")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("barName")?.setFilterValue(e.target.value)
          }
        />
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
