import { useEffect, useState } from "react"
import axios from "axios"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

export default function YouTubeMetrics({ clientId }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/google/youtube/metrics/${clientId}`
        )
        setData(res.data.data || {})
      } catch (err) {
        console.error(" hahahha Error fetching YouTube metrics:", err)
        setError("Failed to load YouTube Analytics data.")
      } finally {
        setLoading(false)
      }
    }
    fetchMetrics()
  }, [clientId])

  if (loading) return <p>Loading YouTube Analytics...</p>
  if (error) return <p className="text-red-500">{error}</p>

  // --- Defensive checks ---
  const rows = Array.isArray(data?.rows) ? data.rows : []

  if (!rows.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No YouTube analytics data available for this channel.
      </p>
    )
  }

  const chartData = rows
    .filter(r => r?.dimensions && r?.metrics?.[0]?.values)
    .map(r => ({
      date: r.dimensions?.[0] || "N/A",
      views: Number(r.metrics?.[0]?.values?.[0] || 0),
      likes: Number(r.metrics?.[0]?.values?.[1] || 0),
      comments: Number(r.metrics?.[0]?.values?.[2] || 0),
      watchTime: Number(r.metrics?.[0]?.values?.[3] || 0),
      subsGained: Number(r.metrics?.[0]?.values?.[4] || 0),
      subsLost: Number(r.metrics?.[0]?.values?.[5] || 0),
    }))

  const totals = {
    views: chartData.reduce((a, b) => a + b.views, 0),
    likes: chartData.reduce((a, b) => a + b.likes, 0),
    comments: chartData.reduce((a, b) => a + b.comments, 0),
    watchTime: chartData.reduce((a, b) => a + b.watchTime, 0),
    subsNet: chartData.reduce((a, b) => a + (b.subsGained - b.subsLost), 0),
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Kpi title="Views" value={totals.views} />
        <Kpi title="Likes" value={totals.likes} />
        <Kpi title="Comments" value={totals.comments} />
        <Kpi title="Subscribers (Net)" value={totals.subsNet} />
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>YouTube Performance (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#f87171"
                strokeWidth={2}
                name="Views"
              />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#60a5fa"
                strokeWidth={2}
                name="Likes"
              />
              <Line
                type="monotone"
                dataKey="subsGained"
                stroke="#34d399"
                strokeWidth={2}
                name="Subscribers Gained"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

// --- KPI Card Component ---
function Kpi({ title, value }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
      </CardContent>
    </Card>
  )
}
