'use client'
import React, { useState } from "react";
import { Settings, Calendar, CheckSquare, LayoutGrid, BarChart3, Mic, LayoutDashboard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import Link from "next/link";
import ChatDrawer from "./Chat-drawer";

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { icon: LayoutDashboard, name: "Dashboard", path: "/dashboard"},
    { icon: Calendar, name: "Schedule", path: "/schedule" },
    { icon: CheckSquare, name: "Tasks", path: "/tasks" },
    { icon: LayoutGrid, name: "Routine", path: "/routine" },
    { icon: BarChart3, name: "Analysis", path: "/analysis" },
    { icon: Settings, name: "Settings", path: "/settings" },
  ];

  return (
    <Sidebar collapsible="icon" className={`transition-all duration-300 ${state === "collapsed" ? "w-16" : "w-44"}`}>
      <SidebarHeader className="flex justify-between items-center p-3 border-b">
        <div className="flex items-center">
          <h2 className={`font-semibold transition-all duration-300 ${state === "collapsed" ? "opacity-0 w-0" : "ml-2"}`}>Schedulr</h2>
        </div>
        <div className="flex items-center p-2">
          <ChatDrawer/>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem 
              key={item.name}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
            >
              <SidebarMenuButton asChild tooltip={state === "collapsed" ? item.name : undefined}>
                <Link href={item.path} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span className={`transition-all duration-300 ${state === "collapsed" ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
                    {item.name}
                  </span>
                  {state === "collapsed" && hoveredItem === item.name && (
                    <div className="absolute left-14 bg-background px-2 py-1 rounded-md shadow-lg border z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarTrigger className="ml-auto" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;