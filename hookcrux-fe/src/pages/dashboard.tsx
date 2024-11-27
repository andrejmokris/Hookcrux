import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/dashboard/app-sidebar';
import { BreadcrumbNav } from '@/dashboard/breadcrumb-nav';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './dashboard/home-page';
import { ProjectDetailPage } from './dashboard/project-detail-page';
import { ProjectsPage } from './dashboard/projects-page';

export const DashboardPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbNav />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/projects" Component={ProjectsPage} />
            <Route path="/projects/:id" Component={ProjectDetailPage} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
