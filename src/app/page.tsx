import { siteContent } from "@/data/content";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">{siteContent.title}</h1>
      <p className="mt-4 leading-relaxed">{siteContent.rootGuidance}</p>
    </main>
  );
}
