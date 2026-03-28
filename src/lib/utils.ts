export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function parseNaira(input: string) {
  const digits = input.replace(/[^\d]/g, "");
  return Number(digits || 0);
}
