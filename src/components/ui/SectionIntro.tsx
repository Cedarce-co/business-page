import { cn } from "@/lib/utils";

export default function SectionIntro({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex w-full max-w-xl flex-col items-start text-left",
        className
      )}
    >
      {children}
    </div>
  );
}
