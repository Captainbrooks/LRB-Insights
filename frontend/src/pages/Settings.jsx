import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Moon, Sun, User, Lock } from "lucide-react";


const integrations = [
  { id: "google", name: "Google Ads", connected: true },
  { id: "meta", name: "Meta Ads", connected: true },
  { id: "linkedin", name: "LinkedIn", connected: true },
  { id: "youtube", name: "YouTube", connected: false },
  { id: "x", name: "X (Twitter)", connected: false },
  { id: "tiktok", name: "TikTok", connected: false },
];



function Settings() {

const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [integrationStates, setIntegrationStates] = useState(
    integrations.reduce((acc, int) => ({ ...acc, [int.id]: int.connected }), {})
  );

  const handleIntegrationToggle = (id) => {
    setIntegrationStates(prev => ({ ...prev, [id]: !prev[id] }));
  };




  return (
   <div className="flex-1 space-y-6 p-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-1">
          Configure your account and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Update your personal information and profile picture
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@agency.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" defaultValue="Digital Marketing Agency" />
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Account Settings
            </CardTitle>
            <CardDescription>
              Manage password and notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Preferences
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="cursor-pointer">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your campaigns
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports" className="cursor-pointer">
                      Weekly Performance Reports
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get weekly summaries of your clients' performance
                    </p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={weeklyReports}
                    onCheckedChange={setWeeklyReports}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button>Update Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Integrations</CardTitle>
            <CardDescription>
              Manage your connected marketing platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <Label htmlFor={integration.id} className="cursor-pointer font-medium">
                      {integration.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {integrationStates[integration.id]
                        ? "Connected and syncing data"
                        : "Not connected"}
                    </p>
                  </div>
                  <Switch
                    id={integration.id}
                    checked={integrationStates[integration.id]}
                    onCheckedChange={() => handleIntegrationToggle(integration.id)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how the dashboard looks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
                <div>
                  <Label htmlFor="dark-mode" className="cursor-pointer font-medium">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark theme
                  </p>
                </div>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Settings
