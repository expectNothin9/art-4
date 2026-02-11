import { bestBars } from "./best-50-data";
import { Best50Table } from "./best-50-table";

export function Best50Container() {
  return <Best50Table data={bestBars} />;
}
