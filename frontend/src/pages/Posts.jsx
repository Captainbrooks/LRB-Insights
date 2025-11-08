import { useState } from "react"
import { Eye, Heart, TrendingUp } from "lucide-react";

import PostFilters from "@/components/layout/PostFilters";
import KPICard from "@/components/layout/KPICard";
import PostCard from "@/components/layout/PostCard";

import { mockPosts } from "@/data/mockClient.jsx";
 export function Posts() {


  const [filteredPosts, setFilteredPosts] = useState(mockPosts);

  // Calculate summary metrics
  const totalReach = filteredPosts.reduce((sum, post) => sum + post.metrics.reach, 0);
  const avgEngagementRate = filteredPosts.reduce((sum, post) => 
    sum + (post.metrics.engagements / post.metrics.impressions * 100), 0
  ) / filteredPosts.length;
  
  const topPost = filteredPosts.reduce((max, post) => 
    post.metrics.engagements > max.metrics.engagements ? post : max
  , filteredPosts[0]);



  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Post Insights</h1>
        <p className="text-muted-foreground text-lg">
          Analyze performance metrics for individual social media posts across all platforms
        </p>
      </div>

      {/* Filters */}
      <PostFilters posts={mockPosts} onFilter={setFilteredPosts} />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Reach"
          value={totalReach}
          trend={8.5}
          icon={Eye}
          format="number"
        />
        <KPICard
          title="Avg. Engagement Rate"
          value={avgEngagementRate}
          trend={12.3}
          icon={Heart}
          format="percentage"
        />
        <KPICard
          title="Top Performing Post"
          value={`${topPost?.metrics.engagements.toLocaleString()} engagements`}
          trend={15.7}
          icon={TrendingUp}
          format="number"
        />
      </div>

      {/* Posts Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Posts</h2>
        <div className="grid grid-cols-1 gap-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Posts
