import About from "./about.md";

export default function AboutPage() {
  return (
    <main className="py-12">
      <article className="prose dark:prose-invert mx-auto">
        <About />
      </article>
    </main>
  );
}
