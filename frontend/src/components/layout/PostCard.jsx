import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Heart,
  MousePointerClick,
  DollarSign,
  ExternalLink,
} from "lucide-react";

// No type imports or interfaces needed

const platformColors = {
  Facebook: "bg-[hsl(221,83%,53%)]",
  Instagram: "bg-[hsl(261,51%,51%)]",
  LinkedIn: "bg-[hsl(38,92%,50%)]",
  Twitter: "bg-[hsl(142,71%,45%)]",
  YouTube: "bg-[hsl(0,84%,60%)]",
};

export function PostCard({ post }) {
  const formattedDate = new Date(post.postDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Thumbnail */}
          <div className="shrink-0">
            <img
              src={post.thumbnail}
              alt="Post thumbnail"
              className="w-24 h-24 rounded-lg object-cover bg-muted"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Badge className={`${platformColors[post.platform]} text-white`}>
                    {post.platform}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {formattedDate}
                  </span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm font-medium">{post.clientName}</span>
                </div>
                <p className="text-base line-clamp-2">{post.text}</p>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">
                    {post.metrics.reach.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Reach</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-secondary" />
                <div>
                  <p className="text-sm font-medium">
                    {post.metrics.impressions.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Impressions</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-destructive" />
                <div>
                  <p className="text-sm font-medium">
                    {post.metrics.engagements.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Engagements</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MousePointerClick className="h-4 w-4 text-accent" />
                <div>
                  <p className="text-sm font-medium">
                    {post.metrics.ctr.toFixed(2)}%
                  </p>
                  <p className="text-xs text-muted-foreground">CTR</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-success" />
                <div>
                  <p className="text-sm font-medium">
                    ${post.metrics.costPerResult.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">Cost/Result</p>
                </div>
              </div>
            </div>

            {/* Insight */}
            <div className="bg-muted/50 rounded-lg p-3 border border-border">
              <p className="text-sm">{post.insight}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostCard;
