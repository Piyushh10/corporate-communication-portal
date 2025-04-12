
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  Calendar,
  FileText,
  Settings,
  Video,
  Search,
  PanelLeft,
  Edit3,
} from "lucide-react";
import ChannelList from './ChannelList';
import DirectMessageList from './DirectMessageList';
import ProfileButton from './ProfileButton';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const NavItem = ({ icon: Icon, href, label }: { icon: React.ElementType; href: string; label: string }) => {
    const isActive = location.pathname === href;
    
    return (
      <Link to={href}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 mb-1",
            isActive && "bg-primary/10 text-primary font-medium"
          )}
        >
          <Icon className="h-5 w-5" />
          {!collapsed && <span>{label}</span>}
        </Button>
      </Link>
    );
  };

  return (
    <div
      className={cn(
        "h-full bg-card border-r flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-3 flex justify-between items-center border-b">
        <h1 className={cn(
          "font-semibold text-lg transition-all",
          collapsed ? "opacity-0 w-0" : "opacity-100"
        )}>
          SecureComm
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-3">
        <div className="mb-4">
          <NavItem icon={MessageSquare} href="/dashboard" label="Dashboard" />
          <NavItem icon={Users} href="/channels/general" label="Channels" />
          <NavItem icon={Calendar} href="/calendar" label="Calendar" />
          <NavItem icon={FileText} href="/documents" label="Documents" />
          <NavItem icon={Video} href="/meetings" label="Meetings" />
          <NavItem icon={Edit3} href="/whiteboard" label="Whiteboard" />
        </div>
        
        {!collapsed && (
          <>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Channels</h3>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">+</Button>
              </div>
              <ChannelList />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Direct Messages</h3>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">+</Button>
              </div>
              <DirectMessageList />
            </div>
          </>
        )}
      </div>

      <div className="mt-auto border-t p-3">
        <ProfileButton collapsed={collapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
