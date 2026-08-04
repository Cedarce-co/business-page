import { redirect } from "next/navigation";

/** Legacy route. Solutions hub lives at /solutions */
export default function ServicesRedirectPage() {
  redirect("/solutions");
}
