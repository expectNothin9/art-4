import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import type { RankingEntry } from "./types";

type RankingEntriesFiltersProps = {
  table: Table<RankingEntry>;
  entries: RankingEntry[];
};

function MultiSelectFilter({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
      >
        {label}
        {selected.length > 0 ? ` (${selected.length})` : ""}
        <ChevronDownIcon className="ml-1 size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto">
        {options.map((opt) => (
          <DropdownMenuCheckboxItem
            key={opt}
            checked={selected.includes(opt)}
            onCheckedChange={() => onToggle(opt)}
          >
            {opt || "(empty)"}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RankingEntriesFilters({
  table,
  entries,
}: RankingEntriesFiltersProps) {
  const cities = [...new Set(entries.map((e) => e.city))].sort();
  const countries = [...new Set(entries.map((e) => e.country))].sort();

  const cityCol = table.getColumn("city");
  const countryCol = table.getColumn("country");
  const selectedCities =
    (cityCol?.getFilterValue() as string[] | undefined) ?? [];
  const selectedCountries =
    (countryCol?.getFilterValue() as string[] | undefined) ?? [];

  const toggleCity = (value: string) => {
    const next = selectedCities.includes(value)
      ? selectedCities.filter((c) => c !== value)
      : [...selectedCities, value];
    cityCol?.setFilterValue(next.length ? next : undefined);
  };

  const toggleCountry = (value: string) => {
    const next = selectedCountries.includes(value)
      ? selectedCountries.filter((c) => c !== value)
      : [...selectedCountries, value];
    countryCol?.setFilterValue(next.length ? next : undefined);
  };

  return (
    <div className="filters flex flex-wrap items-center gap-2">
      <Input
        className="w-48"
        type="text"
        placeholder="Search"
        value={(table.getColumn("barName")?.getFilterValue() as string) ?? ""}
        onChange={(e) =>
          table.getColumn("barName")?.setFilterValue(e.target.value)
        }
      />
      <MultiSelectFilter
        label="City"
        options={cities}
        selected={selectedCities}
        onToggle={toggleCity}
      />
      <MultiSelectFilter
        label="Country"
        options={countries}
        selected={selectedCountries}
        onToggle={toggleCountry}
      />
    </div>
  );
}
