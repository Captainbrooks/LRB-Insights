import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SearchConsoleChart({ data }) {
  if (!data?.rows?.length) return <p>No Search Console data available.</p>;

  const chartData = data.rows.map((r) => ({
    date: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr * 100, // convert to %
    position: r.position,
  }));

  const latest = chartData[chartData.length - 1];

  return (
    <div className="space-y-6">
      {/* KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 border rounded-md shadow-sm bg-card">
          <p className="text-sm text-muted-foreground">Clicks</p>
          <h3 className="font-semibold text-lg">{latest.clicks.toLocaleString()}</h3>
        </div>
        <div className="p-3 border rounded-md shadow-sm bg-card">
          <p className="text-sm text-muted-foreground">Impressions</p>
          <h3 className="font-semibold text-lg">{latest.impressions.toLocaleString()}</h3>
        </div>
        <div className="p-3 border rounded-md shadow-sm bg-card">
          <p className="text-sm text-muted-foreground">CTR</p>
          <h3 className="font-semibold text-lg">{latest.ctr.toFixed(2)}%</h3>
        </div>
        <div className="p-3 border rounded-md shadow-sm bg-card">
          <p className="text-sm text-muted-foreground">Avg. Position</p>
          <h3 className="font-semibold text-lg">{latest.position.toFixed(1)}</h3>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="clicks" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="impressions" stroke="#16a34a" strokeWidth={2} />
            <Line type="monotone" dataKey="ctr" stroke="#f97316" strokeWidth={2} />
            <Line type="monotone" dataKey="position" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
