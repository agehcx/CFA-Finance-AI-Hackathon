import { investigations } from "@/lib/mock-data";
import { Card } from "@/components/Card";

export default function PortfolioPage() {
  const holdings = Array.from(
    new Set(investigations.flatMap((inv) => inv.affectedHoldings))
  );

  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      <h1 className="text-2xl font-bold text-ink">Portfolio & Theses</h1>
      <p className="mt-1 text-sm text-muted">
        Holdings with open theses linked to active investigations.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {holdings.map((holding) => {
          const linked = investigations.filter((inv) =>
            inv.affectedHoldings.includes(holding)
          );
          return (
            <Card key={holding}>
              <p className="font-semibold text-ink">{holding}</p>
              <p className="mt-1 text-xs text-muted">
                {linked.length} linked investigation{linked.length === 1 ? "" : "s"}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
