import React, { useState } from "react";
import { AppSidebar } from "./components/app-sidebar";
import { ChartAreaInteractive } from "./components/chart-area-interactive";
import { SectionCards } from "./components/section-cards";
import { SiteHeader } from "./components/site-header";
import { EmptyPage } from "./components/empty-page";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function DashboardPage() {
  const [activeContent, setActiveContent] = useState("#dashboard");

  const handleNavigation = (url: string) => {
    setActiveContent(url);
  };

  const getPageTitle = (content: string) => {
    switch (content) {
      case "#dashboard":
        return "Дашборд";
      case "#users":
        return "Пользователи";
      case "#settings":
        return "Настройки";
      case "#statistics":
        return "Статистика";
      case "#reports":
        return "Отчеты";
      default:
        return "Дашборд";
    }
  };

  const renderMainContent = () => {
    switch (activeContent) {
      case "#dashboard":
        return (
          <>
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
          </>
        );
      default:
        return <EmptyPage title={getPageTitle(activeContent)} />;
    }
  };

  return (
    <div className="min-h-screen">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar
          onNavigate={handleNavigation}
          activeContent={activeContent}
        />
        <SidebarInset className="flex flex-col">
          <SiteHeader title={getPageTitle(activeContent)} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {renderMainContent()}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}