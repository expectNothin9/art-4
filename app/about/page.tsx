import type { Metadata } from "next";
import About from "./about.md";

export const metadata: Metadata = {
  title: "About",
  description: "About the tech stack and project",
};

export default function AboutPage() {
  return (
    <main className="py-12">
      <article className="prose dark:prose-invert mx-auto">
        <About />
      </article>
    </main>
  );
}
