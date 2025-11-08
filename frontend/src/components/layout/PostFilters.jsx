import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Filter } from "lucide-react";

// No interface or type imports needed in JS

export function PostFilters({ posts, onFilter }) {
  const [platform, setPlatform] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const handleFilter = (newPlatform, newSort) => {
    const selectedPlatform = newPlatform ?? platform;
    const selectedSort = newSort ?? sortBy;

    let filtered = [...posts];

    // Filter by platform
    if (selectedPlatform !== "all") {
      filtered = filtered.filter((post) => post.platform === selectedPlatform);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case "reach":
          return b.metrics.reach - a.metrics.reach;
        case "engagement":
          return b.metrics.engagements - a.metrics.engagements;
        case "ctr":
          return b.metrics.ctr - a.metrics.ctr;
        case "date":
        default:
          return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
      }
    });

    onFilter(filtered);
  };

  const handlePlatformChange = (value) => {
    setPlatform(value);
    handleFilter(value, undefined);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    handleFilter(undefined, value);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Date Range Placeholder */}
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>

          {/* Platform Selector */}
          <Select value={platform} onValueChange={handlePlatformChange}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Twitter">Twitter</SelectItem>
              <SelectItem value="YouTube">YouTube</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Most Recent</SelectItem>
              <SelectItem value="reach">Highest Reach</SelectItem>
              <SelectItem value="engagement">Most Engagement</SelectItem>
              <SelectItem value="ctr">Highest CTR</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto text-sm text-muted-foreground">
            Showing {posts.length} posts
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostFilters;