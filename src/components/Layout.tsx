import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  UsersRound,
  Contact,
  Calendar,
  BarChart3,
  Search,
  Bell,
  LogOut,
  Settings,
  Scale,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function Layout() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <SidebarProvider>
      <Sidebar className="border-r-0 shadow-xl">
        <SidebarHeader className="p-5 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary-foreground text-sidebar-primary">
              <Scale className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-sidebar-primary-foreground leading-tight">
                PrevManager
              </h2>
              <p className="text-[10px] text-sidebar-primary-foreground/70 uppercase tracking-widest">
                CRM Previdenciário
              </p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-3 pt-6">
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-primary-foreground/50 text-xs font-semibold mb-2">
              MENU PRINCIPAL
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/')}
                    className="hover:bg-sidebar-accent/50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold transition-all"
                  >
                    <Link to="/">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/leads')}
                    className="hover:bg-sidebar-accent/50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold transition-all"
                  >
                    <Link to="/leads">
                      <UsersRound className="h-4 w-4" /> Prospectos (Leads)
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/clients') || location.pathname.startsWith('/clients')}
                    className="hover:bg-sidebar-accent/50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold transition-all"
                  >
                    <Link to="/clients">
                      <Contact className="h-4 w-4" /> Segurados
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/tasks')}
                    className="hover:bg-sidebar-accent/50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold transition-all"
                  >
                    <Link to="/tasks">
                      <Calendar className="h-4 w-4" /> Prazos e Tarefas
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/reports')}
                    className="hover:bg-sidebar-accent/50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold transition-all"
                  >
                    <Link to="/reports">
                      <BarChart3 className="h-4 w-4" /> Relatórios
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden animate-fade-in">
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b bg-card/80 backdrop-blur-md px-4 shadow-subtle md:px-6">
          <SidebarTrigger className="-ml-2 text-muted-foreground hover:text-foreground" />
          <div className="flex-1 flex items-center gap-4">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nome ou CPF..."
                className="w-full bg-muted/50 border-transparent pl-10 rounded-full focus-visible:ring-primary focus-visible:border-primary transition-all h-9 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-card"></span>
            </button>
            <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none rounded-full ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar className="h-9 w-9 border border-border hover:opacity-90 transition-opacity">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                    AB
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 mt-1">
                <DropdownMenuLabel className="p-3 pb-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">Agnaldo Brelas</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      agnaldobrelas@gmail.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer py-2 px-3">
                  <Settings className="mr-2 h-4 w-4 text-muted-foreground" /> Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50 py-2 px-3">
                  <LogOut className="mr-2 h-4 w-4" /> Sair da conta
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
