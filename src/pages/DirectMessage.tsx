import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessageArea from '@/components/MessageArea';
import MessageInput from '@/components/MessageInput';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Phone, Video, Search, User } from 'lucide-react';

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

interface UserData {
  id: string;
  name: string;
  status: string;
  role: string;
  department: string;
  email: string;
}

const DirectMessage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sharedFiles, setSharedFiles] = useState<{name: string, size: string, type: string}[]>([]);

  useEffect(() => {
    const users = {
      piyush: {
        id: 'piyush',
        name: 'Piyush Sharma',
        status: 'online',
        role: 'Product Manager',
        department: 'Product',
        email: 'piyush@example.com',
        messages: [
          {
            id: '1',
            sender: { name: 'Piyush Sharma', avatarUrl: '' },
            content: 'Hi there! Did you get a chance to review the project timeline?',
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            isEncrypted: true
          }
        ]
      },
      nimisha: {
        id: 'nimisha',
        name: 'Nimisha Patel',
        status: 'offline',
        role: 'Developer',
        department: 'Engineering',
        email: 'nimisha@example.com',
        messages: [
          {
            id: '1',
            sender: { name: 'Nimisha Patel', avatarUrl: '' },
            content: 'Can we discuss the deployment schedule tomorrow?',
            timestamp: new Date(Date.now() - 86400000), // 1 day ago
            isEncrypted: true
          }
        ]
      },
      nandini: {
        id: 'nandini',
        name: 'Nandini Kumar',
        status: 'away',
        role: 'UX Designer',
        department: 'Design',
        email: 'nandini@example.com',
        messages: [
          {
            id: '1',
            sender: { name: 'Nandini Kumar', avatarUrl: '' },
            content: 'I\'ve updated the mockups with your feedback.',
            timestamp: new Date(Date.now() - 7200000), // 2 hours ago
            isEncrypted: true
          }
        ]
      },
      pranav: {
        id: 'pranav',
        name: 'Pranav Singh',
        status: 'dnd',
        role: 'CTO',
        department: 'Executive',
        email: 'pranav@example.com',
        messages: [
          {
            id: '1',
            sender: { name: 'Pranav Singh', avatarUrl: '' },
            content: 'Let\'s schedule a quick sync about the security audit results.',
            timestamp: new Date(Date.now() - 10800000), // 3 hours ago
            isEncrypted: true
          }
        ]
      }
    };
    
    const user = users[userId as keyof typeof users];
    if (user) {
      setUserData(user);
      setMessages(user.messages);
    }
  }, [userId]);

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
      ? name
          .split(' ')
          .map(part => part[0])
          .join('')
          .toUpperCase()
          .substring(0, 2)
      : '??';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'away': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  if (!userData) {
    return <div className="p-6">User not found</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="border-b p-3 flex justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{getInitials(userData.name)}</AvatarFallback>
            </Avatar>
            <span 
              className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ${getStatusColor(userData.status)} ring-1 ring-white`} 
            />
          </div>
          <div>
            <h2 className="font-semibold">{userData.name}</h2>
            <p className="text-xs text-muted-foreground">
              {userData.status === 'online' ? 'Active now' : 'Last seen recently'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col message-container">
          <MessageArea messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} placeholder={`Message ${userData.name}`} />
        </div>
        
        <div className="hidden lg:block w-64 border-l p-4">
          <h3 className="font-medium mb-2">About</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p>{userData.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Role</p>
              <p>{userData.role}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Department</p>
              <p>{userData.department}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p>{userData.email}</p>
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

export default DirectMessage;
