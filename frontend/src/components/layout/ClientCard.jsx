import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink, Settings } from "lucide-react";

// You don’t need ClientProfile import anymore — JS doesn’t use type definitions

const platformIcons = {
  "Google Ads": "🔍",
  "Meta Ads": "📘",
  "LinkedIn": "💼",
  "YouTube": "▶️",
  "X": "✖️",
  "TikTok": "🎵",
};

export function ClientCard({ client }) {
  const spendPercentage = (client.totalSpend / client.monthlyBudget) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={client.logo}
              alt={client.name}
              className="w-12 h-12 rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-lg">{client.name}</h3>
              <p className="text-sm text-muted-foreground">{client.industry}</p>
            </div>
          </div>
          <Badge variant={client.status === "Active" ? "default" : "secondary"}>
            {client.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Monthly Spend</span>
            <span className="font-medium">
              ${client.totalSpend.toLocaleString()} / $
              {client.monthlyBudget.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(spendPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Connected Platforms
          </p>
          <div className="flex flex-wrap gap-2">
            {client.connectedPlatforms.map((platform) => (
              <div
                key={platform}
                className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-xs"
              >
                <span>{platformIcons[platform] || "🔗"}</span>
                <span>{platform}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="default" size="sm" className="flex-1">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Dashboard
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Settings className="h-4 w-4 mr-1" />
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
