
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, FileText, Calendar, Bell } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DashboardCard = ({ 
  title, 
  description, 
  icon: Icon, 
  count, 
  link,
  variant = "default"
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  count: number; 
  link: string;
  variant?: "default" | "new";
}) => (
  <Link to={link}>
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className={`p-1.5 rounded-full ${variant === "new" ? "bg-primary/20 text-primary" : "bg-secondary"}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        {variant === "new" && (
          <span className="inline-flex mt-1 items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            New activity
          </span>
        )}
      </CardContent>
    </Card>
  </Link>
);

const RecentUpdates = () => {
  const updates = [
    {
      id: 1,
      title: "New security policy update",
      timestamp: "2 hours ago",
      sender: "Admin Team",
    },
    {
      id: 2,
      title: "Tech team status meeting",
      timestamp: "Yesterday",
      sender: "Calendar",
    },
    {
      id: 3,
      title: "Q3 results posted",
      timestamp: "2 days ago",
      sender: "Finance",
    },
  ];

  return (
    <div className="space-y-4">
      {updates.map((update) => (
        <div key={update.id} className="flex items-start gap-3 p-3 hover:bg-secondary rounded-lg transition-colors">
          <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
          <div className="flex-1">
            <h4 className="font-medium text-sm">{update.title}</h4>
            <div className="flex gap-2 text-xs text-muted-foreground mt-1">
              <span>{update.timestamp}</span>
              <span>•</span>
              <span>{update.sender}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            View
          </Button>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back to your secure corporate communication portal
        </p>
      </header>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <DashboardCard 
          title="Channels" 
          description="Team communication" 
          icon={Users} 
          count={5} 
          link="/channels/general"
        />
        <DashboardCard 
          title="Direct Messages" 
          description="Private conversations" 
          icon={MessageSquare} 
          count={3} 
          link="/dm/alice"
          variant="new"
        />
        <DashboardCard 
          title="Documents" 
          description="Shared files" 
          icon={FileText} 
          count={12} 
          link="/documents"
        />
        <DashboardCard 
          title="Calendar" 
          description="Upcoming events" 
          icon={Calendar} 
          count={2} 
          link="/calendar"
          variant="new"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest activity in your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentUpdates />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security Status</CardTitle>
            <CardDescription>System security and compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">End-to-end Encryption</p>
                <p className="text-sm text-muted-foreground">All messages are encrypted</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <span>✓</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">2FA Authentication</p>
                <p className="text-sm text-muted-foreground">Two-factor enabled</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <span>✓</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Audit Logs</p>
                <p className="text-sm text-muted-foreground">Compliance tracking active</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <span>✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
