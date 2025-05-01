
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/Dashboard-sidebar";
import ChatDrawer from "@/components/Chat-drawer";
import LogoutButton from "@/components/LogoutButton";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col gap-4 px-5 pt-5">
            <main className="flex-1">
                {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;