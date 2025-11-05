import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function KPICard({ title, value, trend, icon: Icon, format = "number" }) {
  const isPositive = trend > 0;
  const formattedValue =
    typeof value === "number"
      ? format === "currency"
        ? `$${value.toLocaleString()}`
        : format === "percentage"
        ? `${value.toFixed(2)}%`
        : value.toLocaleString()
      : value;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-border">
      <CardContent>
        <div className="flex items-start justify-between">
         <div className="space-y-2">
  <div className="flex items-center gap-2">
    <div
      className={`p-2 rounded-md flex items-center justify-center`}
    >
      <Icon className="h-4 w-4" />
    </div>
    <p className="text-sm font-medium text-muted-foreground">{title}</p>
  </div>

  <p className="text-3xl font-bold tracking-tight">{formattedValue}</p>

  <div className="flex items-center gap-1">
    {isPositive ? (
      <TrendingUp className="h-4 w-4 text-success" />
    ) : (
      <TrendingDown className="h-4 w-4 text-destructive" />
    )}
    <span
      className={`text-sm font-medium ${
        isPositive ? "text-success" : "text-destructive"
      }`}
    >
      {isPositive ? "+" : ""}
      {trend.toFixed(1)}%
    </span>
  
  </div>
</div>

          <div className="p-3 rounded-lg bg-gradient-primary">
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default KPICard;