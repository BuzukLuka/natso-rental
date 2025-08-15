import { Container } from "@/components/Container";
import { CardsSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-brand-gradient" />
        <Container className="py-12 md:py-16">
          <div className="h-10 w-80 bg-black/10 rounded" />
          <div className="mt-3 h-4 w-96 bg-black/10 rounded" />
          <div className="mt-6 h-16 bg-black/10 rounded-2xl" />
        </Container>
      </section>

      <Container className="py-10">
        <div className="h-6 w-48 bg-black/10 rounded mb-4" />
        <CardsSkeleton />
      </Container>
    </>
  );
}
