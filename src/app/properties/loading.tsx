import { Container } from "@/components/Container";
import { CardsSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <Container className="py-8 space-y-4">
      <div className="h-7 w-40 bg-black/10 rounded" />
      <div className="h-14 bg-black/10 rounded-xl" />
      <CardsSkeleton />
    </Container>
  );
}
