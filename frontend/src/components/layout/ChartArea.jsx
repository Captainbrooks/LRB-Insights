import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = {
    googleAds: "hsl(221, 83%, 53%)",
    metaAds: "hsl(261, 51%, 51%)",
    linkedInAds: "hsl(38, 92%, 50%)",
    youtubeAnalytics: "hsl(142, 71%, 45%)",
    googleSearchConsole: "hsl(0, 84%, 60%)",
};

export function ChartArea({ timeSeriesData, platformData, channelDistribution }) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-card border-border col-span-2">
                <CardHeader>
                    <CardTitle>Campaign Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={timeSeriesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis
                                dataKey="date"
                                stroke="#6b7280"
                                axisLine={{ stroke: "#9ca3af", strokeWidth: 1 }}  // ← the bottom x-axis line
                                tickLine={{ stroke: "#9ca3af", strokeWidth: 1 }}  // ← the small tick marks
                            />
                            <YAxis
                                stroke="#6b7280"
                                axisLine={{ stroke: "#9ca3af", strokeWidth: 1 }}  // ← the left y-axis line
                                tickLine={{ stroke: "#9ca3af", strokeWidth: 1 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "var(--radius)",
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="googleAds"
                                stroke={COLORS.googleAds}
                                strokeWidth={2}
                                name="Google Ads"
                            />
                            <Line
                                type="monotone"
                                dataKey="metaAds"
                                stroke={COLORS.metaAds}
                                strokeWidth={2}
                                name="Meta Ads"
                            />
                            <Line
                                type="monotone"
                                dataKey="linkedInAds"
                                stroke={COLORS.linkedInAds}
                                strokeWidth={2}
                                name="LinkedIn Ads"
                            />
                            <Line
                                type="monotone"
                                dataKey="youtubeAnalytics"
                                stroke={COLORS.youtubeAnalytics}
                                strokeWidth={2}
                                name="YouTube Analytics"
                            />
                            <Line
                                type="monotone"
                                dataKey="googleSearchConsole"
                                stroke={COLORS.googleSearchConsole}
                                strokeWidth={2}
                                name="Search Console"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="shadow-card border-border">
                <CardHeader>
                    <CardTitle>Platform Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={platformData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="platform"
                                stroke="#6b7280"
                                axisLine={{ stroke: "#9ca3af", strokeWidth: 1 }}  // ← the bottom x-axis line
                                tickLine={{ stroke: "#9ca3af", strokeWidth: 1 }}
                            />
                            <YAxis

                                stroke="#6b7280"
                                axisLine={{ stroke: "#9ca3af", strokeWidth: 1 }}  // ← the left y-axis line
                                tickLine={{ stroke: "#9ca3af", strokeWidth: 1 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "var(--radius)",
                                }}
                            />
                            <Legend />
                            <Bar dataKey="conversions" fill={COLORS.googleAds} name="Conversions" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="shadow-card border-border">
                <CardHeader>
                    <CardTitle>Channel Spend Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={channelDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {channelDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "var(--radius)",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}

export default ChartArea;