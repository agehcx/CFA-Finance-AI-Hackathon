import { notFound } from "next/navigation";
import { investigations } from "@/lib/mock-data";

export function getInvestigation(id: string) {
  const investigation = investigations.find((inv) => inv.id === id);
  if (!investigation) notFound();
  return investigation;
}
