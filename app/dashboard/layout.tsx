"use client";

import { DashboardHeader } from "@/components/ui/shared/dashboardHeader";
import SideMenu from "@/components/ui/shared/sideMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed md:w-64 hidden md:block z-40 shadow-md min-h-screen">
        <SideMenu />
      </div>
      <main className="flex-1 md:ml-64 ml-0">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}
