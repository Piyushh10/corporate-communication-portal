import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessageArea from '@/components/MessageArea';
import MessageInput from '@/components/MessageInput';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Users, Info, Phone, Video, Search, Pin, Hash } from 'lucide-react';

interface Message {
  id: string;
  sender: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: Date;
  isEncrypted: boolean;
  files?: {
    name: string;
    size: string;
    type: string;
  }[];
}

const Channel = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [channelName, setChannelName] = useState('');
  const [memberCount, setMemberCount] = useState(0);
  const [sharedFiles, setSharedFiles] = useState<{name: string, size: string, type: string}[]>([]);

  useEffect(() => {
    const channelData = {
      general: {
        name: 'General', 
        members: 24,
        messages: [
          {
            id: '1',
            sender: { name: 'Piyush Sharma', avatarUrl: '' },
            content: 'Welcome to the General channel! This is where we discuss company-wide topics.',
            timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
            isEncrypted: true
          },
          {
            id: '2',
            sender: { name: 'Nimisha Patel', avatarUrl: '' },
            content: 'Has anyone seen the updated security guidelines? I need to reference them for a client meeting.',
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            isEncrypted: true
          },
          {
            id: '3',
            sender: { name: 'Nandini Kumar', avatarUrl: '' },
            content: 'Yes, they were shared last week. I\'ll send you the link.',
            timestamp: new Date(Date.now() - 1800000), // 30 mins ago
            isEncrypted: true
          }
        ]
      },
      announcements: {
        name: 'Announcements',
        members: 42,
        messages: [
          {
            id: '1',
            sender: { name: 'Admin', avatarUrl: '' },
            content: 'Important: The office will be closed this Friday for maintenance.',
            timestamp: new Date(Date.now() - 86400000), // 1 day ago
            isEncrypted: true
          }
        ]
      },
      engineering: {
        name: 'Engineering',
        members: 18,
        messages: [
          {
            id: '1',
            sender: { name: 'Dave Wilson', avatarUrl: '' },
            content: 'The latest build is now available for testing. Please report any bugs on the tracker.',
            timestamp: new Date(Date.now() - 7200000), // 2 hours ago
            isEncrypted: true
          }
        ]
      },
      marketing: { 
        name: 'Marketing',
        members: 12,
        messages: [
          {
            id: '1',
            sender: { name: 'Emma Lee', avatarUrl: '' },
            content: 'The Q2 campaign assets are ready for review. I\'ve uploaded them to the shared drive.',
            timestamp: new Date(Date.now() - 10800000), // 3 hours ago
            isEncrypted: true
          }
        ]
      },
      hr: { 
        name: 'HR',
        members: 8,
        messages: [
          {
            id: '1',
            sender: { name: 'HR Manager', avatarUrl: '' },
            content: 'Reminder: Performance reviews are due by the end of the month.',
            timestamp: new Date(Date.now() - 259200000), // 3 days ago
            isEncrypted: true
          }
        ]
      }
    };
    
    const currentChannel = channelData[channelId as keyof typeof channelData] || {
      name: channelId,
      members: 0,
      messages: []
    };
    
    setChannelName(currentChannel.name);
    setMemberCount(currentChannel.members);
    setMessages(currentChannel.messages);
  }, [channelId]);

  const handleSendMessage = (content: string, files?: File[]) => {
    const fileData = files?.map(file => ({
      name: file.name,
      size: formatBytes(file.size),
      type: file.type.split('/')[0]
    }));

    const newMessage = {
      id: Date.now().toString(),
      sender: {
        name: 'You',
        avatarUrl: ''
      },
      content,
      timestamp: new Date(),
      isEncrypted: true,
      files: fileData
    };

    setMessages([...messages, newMessage]);
    
    if (fileData && fileData.length > 0) {
      setSharedFiles(prev => [...prev, ...fileData]);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
    <div className="flex flex-col h-screen">
      <div className="border-b p-3 flex justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-1.5 rounded-md">
            <Hash className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">{channelName}</h2>
            <p className="text-xs text-muted-foreground">
              {memberCount} members • Encrypted channel
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Pin className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Users className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col message-container">
          <MessageArea messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} placeholder={`Message #${channelName.toLowerCase()}`} />
        </div>
        
        <div className="hidden lg:block w-64 border-l p-4">
          <h3 className="font-medium mb-2">About #{channelName}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Channel for {channelName.toLowerCase()} team discussions.
          </p>
          <Separator className="my-4" />
          <h3 className="font-medium mb-2">Members • {memberCount}</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">PS</AvatarFallback>
              </Avatar>
              <span className="text-sm">Piyush Sharma</span>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">NP</AvatarFallback>
              </Avatar>
              <span className="text-sm">Nimisha Patel</span>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">NK</AvatarFallback>
              </Avatar>
              <span className="text-sm">Nandini Kumar</span>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">PS</AvatarFallback>
              </Avatar>
              <span className="text-sm">Pranav Singh</span>
            </div>
            <div className="flex justify-center mt-2">
              <Button variant="ghost" size="sm" className="text-xs w-full">
                View all members
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <h3 className="font-medium mb-2">Shared Files</h3>
          {sharedFiles.length > 0 ? (
            <div className="space-y-2 text-sm">
              {sharedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="truncate flex-1">
                    <p className="truncate">{file.name}</p>
                    <p className="text-muted-foreground text-xs">{file.size}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center mt-2">
              <p className="text-sm text-muted-foreground">No files shared yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Channel;
