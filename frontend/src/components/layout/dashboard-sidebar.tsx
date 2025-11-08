import {
    Sidebar,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuAction,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarSeparator,
    SidebarInput,
} from "@/components/ui/sidebar"



import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Search } from "lucide-react"
import { useState } from "react"






import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"


import {
    Database,
    BookOpen,
    Settings,
    Play,
    User,
    LogsIcon, ChevronDown, User2, ChevronUp,
    LayoutDashboard,
    Users,
    FileText,
    MessageSquare


} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Index from "../../pages/index"
import Clients from "../../pages/Clients"
import Reports from "../../pages/Reports"
import SettingsPage from "../../pages/Settings"
import Posts from "../../pages/Posts"
export function DashboardLayout() {


const [currentPage, setCurrentPage] = useState("Index");

const handleNavigation=(page)=>{
    setCurrentPage(page);
}




    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">

                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        Marketing Dashboard
                                        <ChevronDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                    <DropdownMenuItem>
                                        <span>Acme Inc</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Acme Corp.</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            Navigation
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem className="" onClick={() => handleNavigation("Index")}>
                                <SidebarMenuButton>
                                    <LayoutDashboard className="h-5 w-5" />
                                    Dashboard
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem onClick={() => handleNavigation("Clients")}>
                                <SidebarMenuButton tooltip="Models">
                                    <Users className="h-5 w-5" />
                                    Clients
                                </SidebarMenuButton>
                            </SidebarMenuItem>


                             <SidebarMenuItem className="" onClick={() => handleNavigation("Posts")}>
                                <SidebarMenuButton>
                                    <MessageSquare className="h-5 w-5" />
                                    Posts Insights
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem onClick={() => handleNavigation("Reports")}>
                                <SidebarMenuButton tooltip="Docs">
                                    <FileText className="h-5 w-5" />
                                    Reports
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem onClick={() => handleNavigation("Settings")}>
                                <SidebarMenuButton tooltip="Settings">
                                    <Settings className="h-5 w-5" />
                                    Settings
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >
                                    <DropdownMenuItem>
                                        <span>Account</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Billing</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset>
                <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-card">
      <div className="flex h-16 items-center gap-4 px-4">
        <SidebarTrigger />
        
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients, campaigns..."
              className="pl-9 bg-muted/50 border-0 focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button className="gradient-primary hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-gradient-primary text-white">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
                <main className="flex flex-1 flex-col p-6 gap-6">

                    
                    <div className="rounded-lg h-full">
                        {currentPage === "Index" && <Index />}
                        {currentPage === "Clients" && <Clients />}
                        {currentPage === "Posts" && <Posts />}
                        {currentPage === "Reports" && <Reports />}
                        {currentPage === "Settings" && <SettingsPage />}
                    </div>
                    {/* <div className="rounded-lg bg-muted h-48">
                        
                    </div> */}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
