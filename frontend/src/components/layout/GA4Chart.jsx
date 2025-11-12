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

export default function GA4Chart({ data }) {
  if (!data?.rows?.length) return <p>No analytics data yet.</p>;

  const chartData = data.rows.map((row) => ({
    date: row.dimensionValues[0].value,
    sessions: Number(row.metricValues[0].value),
    totalUsers: Number(row.metricValues[1].value),
    screenPageViews: Number(row.metricValues[2].value),
    bounceRate: parseFloat(row.metricValues[3].value),
  }));

  const latest = chartData[chartData.length - 1];

  return (
    <div className="space-y-6">
      {/* KPI summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 border rounded-md shadow-sm bg-card">
          <p className="text-sm text-muted-foreground">Sessions</p>
          <h3 className="font-semibold text-lg">{latest.sessions.toLocaleString()}</h3>
        </div>
        <div className="p-3 border rounded-md shadow-sm bg-card">
          <p className="text-sm text-muted-foreground">Users</p>
          <h3 className="font-semibold text-lg">{latest.totalUsers.toLocaleString()}</h3>
        </div>
        <div className="p-3 border rounded-md shadow-sm bg-card">
          <p className="text-sm text-muted-foreground">Page Views</p>
          <h3 className="font-semibold text-lg">{latest.screenPageViews.toLocaleString()}</h3>
        </div>
        <div className="p-3 border rounded-md shadow-sm bg-card">
          <p className="text-sm text-muted-foreground">Bounce Rate</p>
          <h3 className="font-semibold text-lg">{latest.bounceRate.toFixed(1)}%</h3>
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
            <Line type="monotone" dataKey="sessions" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="totalUsers" stroke="#16a34a" strokeWidth={2} />
            <Line type="monotone" dataKey="screenPageViews" stroke="#f97316" strokeWidth={2} />
            <Line type="monotone" dataKey="bounceRate" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
