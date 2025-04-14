
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  { id: 'piyush', name: 'Piyush', status: 'online', avatarUrl: '' },
  { id: 'nimisha', name: 'Nimisha', status: 'offline', avatarUrl: '' },
  { id: 'nandini', name: 'Nandini', status: 'away', avatarUrl: '' },
  { id: 'pranav', name: 'Pranav', status: 'dnd', avatarUrl: '' },
];

const DirectMessageList = () => {
  const location = useLocation();

  const getStatusIndicatorClass = (status: string) => {
    switch (status) {
      case 'online':
        return 'online-indicator';
      case 'offline':
        return 'offline-indicator';
      case 'away':
        return 'away-indicator';
      case 'dnd':
        return 'dnd-indicator';
      default:
        return 'offline-indicator';
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-1">
      {users.map((user) => {
        const isActive = location.pathname === `/dm/${user.id}`;
        
        return (
          <Link 
            key={user.id}
            to={`/dm/${user.id}`}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-secondary group",
              isActive && "channel-active"
            )}
          >
            <div className="relative flex-shrink-0">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <span className={cn(
                "absolute bottom-0 right-0 block h-2 w-2 rounded-full",
                getStatusIndicatorClass(user.status),
                "ring-1 ring-white"
              )} />
            </div>
            <span className="truncate">{user.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default DirectMessageList;
