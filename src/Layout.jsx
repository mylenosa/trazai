import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Calendar, Plus, User, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Meus Eventos",
    url: createPageUrl("Dashboard"),
    icon: Calendar,
  },
  {
    title: "Criar Evento",
    url: createPageUrl("CreateEvent"),
    icon: Plus,
  },
];

function LayoutContent({ children }) {
  const location = useLocation();
  const { openMobile } = useSidebar();

  useEffect(() => {
    if (openMobile) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [openMobile]);

  return (
      <div className="min-h-screen flex w-full bg-gradient-to-br from-orange-50 via-white to-green-50">
        <Sidebar className="border-r border-orange-100/50 lg:relative lg:translate-x-0">
          <SidebarHeader className="border-b border-orange-100/50 p-4 lg:p-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg lg:text-xl text-gray-900">TrazAí</h2>
                <p className="text-xs text-gray-500 hidden lg:block">Organize eventos incríveis</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2 lg:p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-orange-100 hover:text-orange-700 transition-all duration-200 rounded-xl mb-2 min-h-[48px] ${
                          location.pathname === item.url ? 'bg-orange-100 text-orange-700 font-medium' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 lg:px-4 py-3">
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="font-medium text-sm lg:text-base">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-orange-100/50 p-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">Organizador</p>
                <p className="text-xs text-gray-500">Versão Gratuita</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/95 backdrop-blur-sm border-b border-orange-100/50 px-4 py-3 lg:hidden">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="hover:bg-orange-100 p-3 rounded-lg transition-colors duration-200 -ml-1">
                <Menu className="w-6 h-6" />
              </SidebarTrigger>
              <h1 className="text-lg font-bold text-gray-900">TrazAí</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
  );
}

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  // Páginas que NÃO devem ter sidebar (páginas públicas/landing)
  const publicPages = [
    '/',                    // Landing page
    '/public-event',        // Página pública do evento
    '/upgrade',             // Página de upgrade
    '/upgrade/confirm'      // Confirmação de upgrade
  ];

  const isPublicPage = publicPages.includes(location.pathname) ||
                      location.pathname.includes('/event/');

  // Para páginas públicas, não mostra sidebar
  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}