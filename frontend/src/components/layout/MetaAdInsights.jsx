import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function MetaAdInsights({ adId, insights }) {
  if (!adId || !insights) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          Select an ad to see insights.
        </p>
      </Card>
    );
  }

  const data = insights;

  if (!data) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          No insights available for this ad.
        </p>
      </Card>
    );
  }

  const items = [
    { label: "Impressions", value: data.impressions },
    { label: "Reach", value: data.reach },
    { label: "Clicks", value: data.clicks },
    { label: "Spend ($)", value: `$${data.spend.toFixed(2)}` },
    { label: "CPC ($)", value: `$${data.cpc}` },
    { label: "CTR (%)", value: `${data.ctr}%` },
    { label: "Conversions", value: data.conversions },
  ];

  return (
    <Card className="w-full shadow-sm border rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Meta Ad Insights
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="border rounded-lg p-4 flex flex-col bg-muted/30"
            >
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className="text-xl font-semibold mt-1">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
