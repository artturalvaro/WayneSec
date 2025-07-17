"use client";

import {
  BellIcon,
  LogOutIcon,
  MoreVerticalIcon,
  SettingsIcon,
  ShieldIcon,
  UserCircleIcon,
} from "lucide-react";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
}) {
  const router = useRouter();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group data-[state=open]:bg-slate-800/50 hover:bg-slate-800/50 transition-all duration-300 border border-slate-700/50 rounded-lg"
            >
              <div className="relative">
                <Avatar className="h-9 w-9 rounded-lg border-2 border-slate-600 group-hover:border-yellow-400/50 transition-all duration-300">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 text-slate-200 font-bold">
                    BW
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 size-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-slate-100 group-hover:text-yellow-400 transition-colors duration-300">
                  {user.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="truncate text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {user.email}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs px-1 py-0 border-green-400/30 text-green-400"
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>
              <MoreVerticalIcon className="ml-auto size-4 text-slate-400 group-hover:text-slate-200 transition-colors duration-300" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-slate-900 border-slate-700"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg border border-slate-600">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg bg-slate-700 text-slate-200">
                    BW
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-slate-100">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-slate-400">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-800 focus:bg-slate-800">
                <UserCircleIcon className="text-slate-400" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-800 focus:bg-slate-800">
                <SettingsIcon className="text-slate-400" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-800 focus:bg-slate-800">
                <BellIcon className="text-slate-400" />
                Notificações
                <Badge variant="destructive" className="ml-auto text-xs">
                  3
                </Badge>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-800 focus:bg-slate-800">
                <ShieldIcon className="text-slate-400" />
                Segurança
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem
              className="text-red-400 hover:bg-red-950/50 focus:bg-red-950/50"
              onClick={() => {
                Cookies.remove("access_token");
                router.replace("/auth");
              }}
            >
              <LogOutIcon />
              Sair do Sistema
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
