import { useState } from "react"
import { mockReports } from "@/data/mockClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { FileText, Download, Mail, FileSpreadsheet, Plus, Calendar } from "lucide-react";

const platforms = ["Google Ads", "Meta Ads", "LinkedIn", "YouTube", "Facebook", "Instagram", "X"];

function Reports() {

    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);


  const overviewReports = mockReports.filter(r => r.type === "Overview");
  const postLevelReports = mockReports.filter(r => r.type === "Post-Level");

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    console.log("Generate report with:", selectedPlatforms);
    setDialogOpen(false);
    setSelectedPlatforms([]);
  };


  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground mt-1">
            Generate and export custom reports
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate New Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
              <DialogDescription>
                Select date range and channels to include in your report.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleGenerateReport} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input
                    id="report-name"
                    placeholder="Q1 2024 Performance"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select Platforms</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {platforms.map((platform) => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox
                          id={`report-${platform}`}
                          checked={selectedPlatforms.includes(platform)}
                          onCheckedChange={() => handlePlatformToggle(platform)}
                        />
                        <label
                          htmlFor={`report-${platform}`}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {platform}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Generate Report</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview Reports</TabsTrigger>
          <TabsTrigger value="posts">Post-Level Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {overviewReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {report.dateRange}
                        </p>
                      </div>
                    </div>
                    <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Platforms Covered</p>
                    <div className="flex flex-wrap gap-2">
                      {report.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="px-2 py-1 bg-secondary rounded-md text-xs"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  {report.status === "Ready" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileSpreadsheet className="h-4 w-4 mr-1" />
                        CSV
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {postLevelReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {report.dateRange}
                        </p>
                      </div>
                    </div>
                    <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Platforms Covered</p>
                    <div className="flex flex-wrap gap-2">
                      {report.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="px-2 py-1 bg-secondary rounded-md text-xs"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  {report.status === "Ready" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileSpreadsheet className="h-4 w-4 mr-1" />
                        CSV
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Reports
