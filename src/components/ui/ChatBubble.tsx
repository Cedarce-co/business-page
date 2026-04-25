/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
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
        "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed text-white",
        side === "user"
          ? "ml-auto rounded-br-sm bg-cliq-purple"
          : "rounded-bl-sm bg-cliq-navy-600"
      )}
    >
      {text}
    </div>
  );
}
