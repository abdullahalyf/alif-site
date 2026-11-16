import { site } from "@/content/site";

// Temporary placeholder. Replaced in ROADMAP Task 1.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-4 px-6">
      <h1 className="text-4xl font-semibold">{site.name}</h1>
      <p className="text-lg">{site.role}</p>
      <p>{site.intro}</p>
    </main>
  );
}
