import { SkeletonGrid, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-[34rem] max-w-full" />
      </div>

      <SkeletonGrid columns={3} rows={1} itemClassName="h-24" />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SkeletonGrid columns={1} rows={3} itemClassName="h-20" />
        </div>
        <SkeletonGrid columns={1} rows={3} itemClassName="h-20" />
      </div>

      <SkeletonGrid columns={1} rows={4} itemClassName="h-16" />
    </div>
  );
}

