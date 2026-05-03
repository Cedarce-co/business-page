import { Skeleton, SkeletonGrid } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-[42rem] max-w-full" />
      </div>

      <SkeletonGrid columns={1} rows={2} itemClassName="h-28" />
      <SkeletonGrid columns={2} rows={1} itemClassName="h-28" />
      <SkeletonGrid columns={1} rows={2} itemClassName="h-24" />
    </div>
  );
}

