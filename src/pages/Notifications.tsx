
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, FileText, MessageSquare, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  type: 'message' | 'mention' | 'file' | 'calendar' | 'system';
  sender: {
    name: string;
    avatarUrl?: string;
  };
  content: string;
  timestamp: Date;
  read: boolean;
  channelName?: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      sender: { name: "Alice Johnson", avatarUrl: "" },
      content: "sent you a direct message",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
    },
    {
      id: "2",
      type: "mention",
      sender: { name: "Bob Smith", avatarUrl: "" },
      content: "mentioned you in #general",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      channelName: "general",
    },
    {
      id: "3",
      type: "file",
      sender: { name: "Carol Davis", avatarUrl: "" },
      content: "shared a document with you",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
    },
    {
      id: "4",
      type: "calendar",
      sender: { name: "David Wilson", avatarUrl: "" },
      content: "invited you to a meeting",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
    },
    {
      id: "5",
      type: "system",
      sender: { name: "System", avatarUrl: "" },
      content: "Security alert: new login from New York",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5" />;
      case 'mention':
        return <Users className="h-5 w-5" />;
      case 'file':
        return <FileText className="h-5 w-5" />;
      case 'calendar':
        return <Calendar className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container py-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your team's activities</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start p-4 gap-3 hover:bg-muted/50 transition-colors ${notification.read ? '' : 'bg-primary/5'}`}
                    >
                      <div className={`p-2 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/20'}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              {notification.sender.avatarUrl ? (
                                <AvatarImage src={notification.sender.avatarUrl} />
                              ) : (
                                <AvatarFallback>
                                  {getInitials(notification.sender.name)}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <span className="font-medium">{notification.sender.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{notification.content}</p>
                        {notification.channelName && (
                          <Badge variant="outline" className="mt-2">
                            #{notification.channelName}
                          </Badge>
                        )}
                      </div>
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs"
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <Bell className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>No notifications yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.filter(n => !n.read).length > 0 ? (
                  notifications
                    .filter(n => !n.read)
                    .map((notification) => (
                      <div 
                        key={notification.id} 
                        className="flex items-start p-4 gap-3 bg-primary/5 hover:bg-muted/50 transition-colors"
                      >
                        <div className="p-2 rounded-full bg-primary/20">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                {notification.sender.avatarUrl ? (
                                  <AvatarImage src={notification.sender.avatarUrl} />
                                ) : (
                                  <AvatarFallback>
                                    {getInitials(notification.sender.name)}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <span className="font-medium">{notification.sender.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{notification.content}</p>
                          {notification.channelName && (
                            <Badge variant="outline" className="mt-2">
                              #{notification.channelName}
                            </Badge>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs"
                        >
                          Mark as read
                        </Button>
                      </div>
                    ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <Bell className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>No unread notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentions" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.filter(n => n.type === 'mention').length > 0 ? (
                  notifications
                    .filter(n => n.type === 'mention')
                    .map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start p-4 gap-3 hover:bg-muted/50 transition-colors ${notification.read ? '' : 'bg-primary/5'}`}
                      >
                        <div className={`p-2 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/20'}`}>
                          <Users className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                {notification.sender.avatarUrl ? (
                                  <AvatarImage src={notification.sender.avatarUrl} />
                                ) : (
                                  <AvatarFallback>
                                    {getInitials(notification.sender.name)}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <span className="font-medium">{notification.sender.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{notification.content}</p>
                          {notification.channelName && (
                            <Badge variant="outline" className="mt-2">
                              #{notification.channelName}
                            </Badge>
                          )}
                        </div>
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs"
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <Users className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>No mentions yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
