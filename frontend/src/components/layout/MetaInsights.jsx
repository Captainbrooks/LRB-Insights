import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function MetaInsights({ clientId }) {
  const [pageData, setPageData] = useState(null);
  // const [igData, setIgData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadInsights = async () => {
  //     try {
  //       const pageRes = await axios.get(
  //         `${import.meta.env.VITE_API_URL}/meta/meta-campaigns/${clientId}`
  //       );

  //       // const igRes = await axios.get(
  //       //   `${import.meta.env.VITE_API_URL}/meta/instagram-insights/${clientId}`
  //       // );

  //       console.log(pageRes.data)

  //       // setPageData(pageRes.data.data);
  //       // setIgData(igRes.data.data);

  //     } catch (err) {
  //       console.error("Meta insights error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadInsights();
  // }, [clientId]);

  if (loading) {
    return <p>Loading Meta Insights...</p>;
  }

  if (!pageData) {
    return <p>No Meta insights available.</p>;
  }

  // // Transform Graph API format into chart-friendly format
  // const transformMetric = (metric) => {
  //   return metric.values.map((v, index) => ({
  //     date: v.end_time?.split("T")[0] || `Day ${index + 1}`,
  //     value: v.value,
  //   }));
  // };

  // const pageImpressions = transformMetric(
  //   pageData.data.find((m) => m.name === "page_impressions")
  // );

  // const pageEngagement = transformMetric(
  //   pageData.data.find((m) => m.name === "page_engaged_users")
  // );

  // const pageFans = transformMetric(
  //   pageData.data.find((m) => m.name === "page_fans")
  // );

  // const igImpressions = igData
  //   ? transformMetric(igData.data.find((m) => m.name === "impressions"))
  //   : [];

  
  return (
//     <div className="space-y-6">

//       KPI CARDS
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <KpiCard title="Page Impressions" value={pageImpressions?.[pageImpressions.length - 1]?.value || 0} />
//         <KpiCard title="Engaged Users" value={pageEngagement?.[pageEngagement.length - 1]?.value || 0} />
//         <KpiCard title="Page Fans" value={pageFans?.[pageFans.length - 1]?.value || 0} />

//         {igData && (
//           <KpiCard title="IG Impressions" value={igImpressions?.[igImpressions.length - 1]?.value || 0} />
//         )}
//       </div>

//       {/* PAGE INSIGHTS CHART */}
//       <InsightsChart
//         title="Facebook Page Impressions"
//         data={pageImpressions}
//       />

//       {/* IG INSIGHTS CHART */}
//       {igImpressions.length > 0 && (
//         <InsightsChart
//           title="Instagram Impressions"
//           data={igImpressions}
//         />
//       )}

//     </div>
//   );
// }


// KPI Card component
// function KpiCard({ title, value }) {
//   return (
//     <Card className="p-4">
//       <CardHeader className="pb-1">
//         <p className="text-sm text-muted-foreground">{title}</p>
//       </CardHeader>
//       <CardContent>
//         <h2 className="text-2xl font-bold">{value}</h2>
//       </CardContent>
//     </Card>
//   );
// }


// Line chart component
// function InsightsChart({ title, data }) {
//   return (
//     <Card>
//       <CardHeader>
//         <h3 className="font-semibold">{title}</h3>
//       </CardHeader>
//       <CardContent className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>

<div></div>
  );
}

