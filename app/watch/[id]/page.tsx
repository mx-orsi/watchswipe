import { notFound } from "next/navigation";
import { seedWatches } from "@/lib/data/seedWatches";
import { WatchDetailClientSimple } from "@/components/WatchDetailClientSimple";

interface WatchPageProps {
  params: { id: string };
  searchParams?: { variant?: string };
}

export default function WatchPage({ params, searchParams }: WatchPageProps) {
  const watch = seedWatches.find((w) => w.id === params.id);

  if (!watch) {
    notFound();
  }

  const initialVariantId = searchParams?.variant;

  return (
    <WatchDetailClientSimple watch={watch} initialVariantId={initialVariantId} />
  );
}
