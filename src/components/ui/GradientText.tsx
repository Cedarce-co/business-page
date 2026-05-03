/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE - paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
import { ReactNode } from "react";

export default function GradientText({ children }: { children: ReactNode }) {
  return <span className="text-gradient">{children}</span>;
}
