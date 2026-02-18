"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdminBarsPage() {
  const bars = useQuery(api.bars.get);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Key</th>
          </tr>
        </thead>
        <tbody>
          {bars?.map(({ _id, name, key }) => (
            <tr key={_id}>
              <td>{name}</td>
              <td>{key}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
