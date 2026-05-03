import { SkeletonGrid, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-[38rem] max-w-full" />
      </div>

      <SkeletonGrid columns={3} rows={1} itemClassName="h-24" />
      <SkeletonGrid columns={2} rows={3} itemClassName="h-20" />
    </div>
  );
}

