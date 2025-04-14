
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Hash } from "lucide-react";
import AddChannelDialog from './AddChannelDialog';

const defaultChannels = [
  { id: 'general', name: 'General' },
  { id: 'announcements', name: 'Announcements' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'hr', name: 'HR' },
];

const ChannelList = () => {
  const location = useLocation();
  const [channels, setChannels] = useState(defaultChannels);

  const handleChannelCreated = (newChannel: { id: string, name: string }) => {
    setChannels([...channels, newChannel]);
  };

  return (
    <div className="space-y-1">
      {channels.map((channel) => {
        const isActive = location.pathname === `/channels/${channel.id}`;
        
        return (
          <Link 
            key={channel.id}
            to={`/channels/${channel.id}`}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-secondary group",
              isActive && "channel-active"
            )}
          >
            <Hash className="flex-shrink-0 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            <span className="truncate">{channel.name}</span>
          </Link>
        );
      })}
      <div className="pt-2">
        <Link 
          to="#"
          className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-secondary group"
        >
          <span className="text-muted-foreground">Create your own channel</span>
        </Link>
      </div>
    </div>
  );
};

export default ChannelList;
