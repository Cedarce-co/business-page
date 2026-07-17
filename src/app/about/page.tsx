import { redirect } from "next/navigation";

/** Product catalog moved to /product */
export default function AboutRedirectPage() {
  redirect("/product");
}
