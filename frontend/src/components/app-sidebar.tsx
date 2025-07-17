"use client";

import type * as React from "react";
import {
  ActivityIcon,
  BuildingIcon,
  FileTextIcon,
  HomeIcon,
  PackageIcon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const data = {
  user: {
    name: "Bruce Wayne",
    email: "bruce.wayne@wayneenterprises.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "CEO"
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: HomeIcon,
      badge: null,
    },
    {
      title: "Controle de Acesso",
      url: "/access-control",
      icon: ShieldIcon,
      badge: { count: 3, variant: "destructive" as const },
    },
    {
      title: "Recursos",
      url: "/resources",
      icon: PackageIcon,
      badge: null,
    },
    {
      title: "Usuários",
      url: "/users",
      icon: UsersIcon,
      badge: { count: 127, variant: "secondary" as const },
    },
    {
      title: "Atividades",
      url: "/activities",
      icon: ActivityIcon,
      badge: { count: 12, variant: "default" as const },
    },
    {
      title: "Áreas Restritas",
      url: "/areas",
      icon: BuildingIcon,
      badge: null,
    },
    {
      title: "Relatórios",
      url: "/reports",
      icon: FileTextIcon,
      badge: null,
    },
    {
      title: "Configurações",
      url: "/settings",
      icon: SettingsIcon,
      badge: null,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthRedirect(false);
  
  if(user) {
    data.user.name = user?.username;
    data.user.email = user?.email;
    data.user.role = user?.role;
  }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      {...props}
    >
      <SidebarHeader className="border-b border-slate-800/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-3 hover:bg-slate-800/50 transition-all duration-300"
            >
              <a href="/" className="group">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-slate-900 shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300">
                  <ZapIcon className="size-5 font-bold" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-slate-100 group-hover:text-yellow-400 transition-colors duration-300">
                    Wayne Enterprises
                  </span>
                  <span className="truncate text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    Sistema de Segurança
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-b from-transparent to-slate-950/20">
        <NavMain items={data.navMain} />
        <div className="mt-auto p-4">
          <div className="rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-3 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs font-medium text-slate-300">
                Sistema Operacional
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Todos os sistemas funcionando normalmente
            </div>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-800/50 bg-slate-950/50">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
