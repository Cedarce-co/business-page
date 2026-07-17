import { cn } from "@/lib/utils";

export default function ChatBubble({
  side,
  text,
}: {
  side: "user" | "assistant";
  text: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
        side === "user"
          ? "ml-auto rounded-br-sm bg-cedar-accent text-black"
          : "rounded-bl-sm bg-white/10 text-cedar-ivory"
      )}
    >
      {text}
    </div>
  );
}
