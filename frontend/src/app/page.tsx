"use client";

import useAuthRedirect from "@/hooks/useAuthRedirect";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardPage() {
  const { loading } = useAuthRedirect(true);

  if (loading) return <div className="p-4 text-center">Carregando painel de segurança...</div>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        
      </SidebarInset>
    </SidebarProvider>
  );
}