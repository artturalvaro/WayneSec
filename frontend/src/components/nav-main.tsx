"use client"

import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    badge?: {
      count: number
      variant: "default" | "secondary" | "destructive" | "outline"
    } | null
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-slate-400 font-semibold text-xs uppercase tracking-wider px-2 py-2">
        Navegação Principal
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  className={`
                    group relative transition-all duration-300 hover:bg-slate-800/50 
                    ${
                      isActive
                        ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-r-2 border-yellow-400 text-yellow-400"
                        : "text-slate-300 hover:text-slate-100"
                    }
                  `}
                >
                  <a href={item.url} className="flex items-center gap-3 px-3 py-2.5">
                    {item.icon && (
                      <item.icon
                        className={`
                        size-4 transition-all duration-300
                        ${isActive ? "text-yellow-400 drop-shadow-sm" : "text-slate-400 group-hover:text-slate-200"}
                      `}
                      />
                    )}
                    <span
                      className={`
                      font-medium transition-all duration-300
                      ${isActive ? "text-yellow-400" : "group-hover:text-slate-100"}
                    `}
                    >
                      {item.title}
                    </span>
                    {item.badge && (
                      <Badge
                        variant={item.badge.variant}
                        className={`
                          ml-auto text-xs px-1.5 py-0.5 transition-all duration-300
                          ${isActive ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30" : ""}
                        `}
                      >
                        {item.badge.count}
                      </Badge>
                    )}
                    {isActive && (
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-r-full"></div>
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}