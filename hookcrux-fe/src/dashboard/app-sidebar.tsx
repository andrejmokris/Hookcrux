'use client';

import { BookOpen, Home, Settings2, SquareTerminal } from 'lucide-react';
import * as React from 'react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from '@/components/ui/sidebar';
import { NavMain } from './main-nav';
import { NavUserSidebar } from './user-nav';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Overview',
      url: '/dashboard',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Projects',
      url: '/dashboard/projects',
      icon: SquareTerminal,
      isActive: true,
    },

    {
      title: 'Documentation',
      url: '/dashboard/documentation',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '/dashboard/documentation/introduction',
        },
        {
          title: 'Get Started',
          url: '/dashboard/documentation/get-started',
        },
        {
          title: 'Tutorials',
          url: '/dashboard/documentation/tutorials',
        },
        {
          title: 'Changelog',
          url: '/dashboard/documentation/changelog',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUserSidebar />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
