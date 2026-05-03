import { SkeletonGrid, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-32" />
      <SkeletonGrid columns={1} rows={3} itemClassName="h-40" />
    </div>
  );
}
