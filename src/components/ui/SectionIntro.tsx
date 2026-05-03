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
        "flex w-full flex-col items-center text-center md:max-w-[50%] md:items-start md:text-left",
        className
      )}
    >
      {children}
    </div>
  );
}
