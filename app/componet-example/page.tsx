import type { Metadata } from "next";
import { ComponentExample } from "@/components/component-example";

export const metadata: Metadata = {
  title: "Component Example",
  description: "UI component examples",
};

export default function Page() {
  return <ComponentExample />;
}
