import HeroPlaceholder from "@/components/HeroPlaceholder";

export default function Home() {
  return (
    <main id="main" className="mx-auto w-full max-w-2xl flex-1 p-8">
      <h1 className="text-2xl font-semibold">
        PNK ENTERPRISES — Prototype Scaffold
      </h1>
      <p className="mt-4 text-sm">
        This page is the technical foundation for the project, not the final
        website. It exists to verify the build, linting, type checking and
        deployment-independent tooling. Design, content and product information
        are added in later phases.
      </p>
      <div className="mt-8">
        <HeroPlaceholder
          title="Hero region reserved"
          description="The final hero experience is designed in a later phase."
        />
      </div>
    </main>
  );
}
