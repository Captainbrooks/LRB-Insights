import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  Settings,
  BarChart2,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import axios from "axios";

const platformIcons = {
  "Google Ads": "🔍",
  "Meta Ads": "📘",
  "LinkedIn": "💼",
  "YouTube": "▶️",
  "X": "✖️",
  "TikTok": "🎵",
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Connected":
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case "Pending":
      return <AlertCircle className="h-4 w-4 text-accent" />;
    case "Not Connected":
      return <XCircle className="h-4 w-4 text-muted-foreground" />;
    default:
      return null;
  }
};

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case "Connected":
      return "default";
    case "Pending":
      return "secondary";
    case "Not Connected":
      return "outline";
    default:
      return "outline";
  }
};

import GA4Selector from "./GA4Selector";
import SearchConsoleSelector from "./SearchConsoleSelector";
import YouTubeMetrics from "./YoutubeMetrics";
import { data } from "autoprefixer";

export function ClientCard({ client, fetchClients }) {




  const handleConnectPlatform = async (clientId, platformName, currentStatus) => {

    console.log("Handle connect/disconnect for client:", clientId, "platform:", platformName, "current status:", currentStatus);

    try {

      if (currentStatus === "Connected") {
        if (platformName === "Google") {
          // disconnect flow

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/google/disconnect`, {
            clientId
          });

          console.log("Disconnected Response", response.data)
        }

        if (platformName === "Meta") {
        // Meta disconnect flow (we will build this later)
        alert("Meta disconnect not implemented yet.");
        return;
      }

        

      } else {

        if (platformName === "Google") {
          console.log("connect flow")
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/google/auth?clientId=${clientId}`);

          console.log("Platform connection response:", response.data);
          
          // Optionally, refresh client data here to reflect changes

        }


        if(platformName === "Meta"){
          const response=await axios.get(`
            ${import.meta.env.VITE_API_URL}/meta/auth`,{
              params: {clientId}
            });

            console.log("Meta connection response:", response.data)
            console.log(response.data);
        }
      }

      await fetchClients();


    } catch (error) {
      console.error("Error connecting/disconnecting platform:", error.message);
    }

  }


  const [isManageOpen, setIsManageOpen] = useState(false);

  const spendPercentage = (client.totalSpend / client.monthlyBudget) * 100;

  return (
    <>
      {/* Card */}
      <Card className="hover:shadow-lg transition-shadow duration-300 rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img
                src={client.logo}
                alt={client.clientName}
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-lg">{client.clientName}</h3>
                <p className="text-sm text-muted-foreground">
                  {client.industry}
                </p>
              </div>
            </div>

            {/* <Badge
              variant={client.status === "Active" ? "default" : "secondary"}
            >
              {client.status}
            </Badge> */}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Monthly Spend */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Monthly Spend</span>
              <span className="font-medium">
                {/* ${client.totalSpend.toLocaleString()} / $ */}
                {client.monthlyBudget.toLocaleString()}
              </span>
            </div>
            {/* <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(spendPercentage, 100)}%` }}
              />
            </div> */}
          </div>

          {/* Connected Platforms */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Connected Platforms
            </p>
            <div className="flex flex-wrap gap-2">
              {client.platformConnections?.filter((platform)=>platform.status==="Connected").map((platform) => (
                <div
                  key={platform._id}
                  className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-xs"
                >
                  <span>{"🔗"}</span>
                  <span>{platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="default" size="sm" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-1" />
              View Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setIsManageOpen(true)}
            >
              <Settings className="h-4 w-4 mr-1" />
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Manage Modal */}
      <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage {client.clientName}</DialogTitle>
            <DialogDescription>
              Connect or manage linked accounts for this client.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1 py-4">
            {client.platformConnections?.map((platform, index) => (
              <div key={platform.name}>
                <div className="flex items-center justify-between py-3 px-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(platform.status)}
                    <span className="font-medium">{platform.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusBadgeVariant(platform.status)}>
                      {platform.status}
                    </Badge>
                    <Button
                    onClick={()=>handleConnectPlatform(client._id, platform.name, platform.status)}
                      variant={
                        platform.status === "Connected" ? "outline" : "default"
                      }
                      size="sm"
                    >
                      {platform.status === "Connected"
                        ? "Disconnect"
                        : "Connect"}
                    </Button>
                  </div>
                </div>

              {platform.name === "Google" && platform.status === "Connected" && (
  <div className="pl-8 py-4 space-y-4">
    {/* <GA4Selector clientId={client._id} /> */}
    {/* <SearchConsoleSelector clientId={client._id} /> */}
    <YouTubeMetrics clientId={client._id} />
  </div>
)}

                {index < client.platformConnections.length - 1 && (
                  <Separator />
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default ClientCard;