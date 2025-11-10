import { ClientTabs } from '@/components/layout/ClientTabs'
import React, { useState } from 'react'
import { mockClients, channels } from '../data/mockClient.jsx'
import FilterSection from '@/components/layout/FilterSection.jsx'
import KPICard from '@/components/layout/KPICard.jsx'


import { Eye, MousePointerClick, DollarSign, Target, Users, TrendingUp, MousePointer, Activity } from 'lucide-react'
import ChartArea from '@/components/layout/ChartArea.jsx'

export default function Index() {


const [selectedClient, setSelectedClient] = useState(mockClients[0].id);
const [selectedChannel, setSelectedChannel] = useState("All Channels");


const currentClient = mockClients.find((c) => c.id === selectedClient) || mockClients[0];


const kpiData = [
    {
      title: "Impressions",
      value: currentClient.metrics.impressions,
      trend: currentClient.trends.impressions,
      icon: Eye,
    },
    {
      title: "Clicks",
      value: currentClient.metrics.clicks,
      trend: currentClient.trends.clicks,
      icon: MousePointerClick,
    },
    {
      title: "Cost",
      value: currentClient.metrics.cost,
      trend: currentClient.trends.cost,
      icon: DollarSign,
      format: "currency"
    },
    {
      title: "Conversions",
      value: currentClient.metrics.conversions,
      trend: currentClient.trends.conversions,
      icon: Target,
    },
    {
      title: "Reach",
      value: currentClient.metrics.reach,
      trend: currentClient.trends.reach,
      icon: Users,
    },
    {
      title: "Cost Per Conversion",
      value: currentClient.metrics.costPerConversion,
      trend: currentClient.trends.costPerConversion,
      icon: TrendingUp,
      format: "currency"
    },
    {
      title: "CPC",
      value: currentClient.metrics.cpc,
      trend: currentClient.trends.cpc,
      icon: MousePointer,
      format: "currency"
    },
    {
      title: "CPM",
      value: currentClient.metrics.cpm,
      trend: currentClient.trends.cpm,
      icon: Activity,
      format: "currency"
    },
  ];


  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in bg-[linear-gradient(135deg,_#f5f9fd_0%,_#edf3fa_45%,_#e7eef8_100%)]">

{/* header */}
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#142f59]">Good Afternoon , Milton</h2>
          <p className="text-muted-foreground mt-1">
            Multi-channel campaign performance overview
          </p>
        </div>
      </div>
 {/* header */}


{/* client tabs */}
          <div>
              <ClientTabs
                  clients={mockClients}
                  activeClient={selectedClient}
                  onClientChange={setSelectedClient}
              />
          </div>
{/* client tabs */}



{/* filter section */}
<div>
    <FilterSection
        channels={channels}
        clients={mockClients}
        selectedChannel={selectedChannel}
        selectedClient={selectedClient}
        onChannelChange={setSelectedChannel}
        onClientChange={setSelectedClient}
      />
</div>

{/* filter section */}



{/* performance metrics */}

          <div>
              <h2 className="text-3xl font-bold tracking-tight">Performance Metrics</h2>
              <p className="text-muted-foreground mt-1">
                  Multi-channel campaign performance overview for {currentClient.name}
              </p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-4">
                  {kpiData.map((kpi) => (
                      <KPICard key={kpi.title} {...kpi} />
                  ))}
              </div>
          </div>
{/* performance metrics */}



{/* chartArea */}

<div>
 <ChartArea
        timeSeriesData={currentClient.timeSeriesData}
        platformData={currentClient.platformData}
        channelDistribution={currentClient.channelDistribution}
      />
</div>

{/* chartArea */}



      
    </div>
  )
}
