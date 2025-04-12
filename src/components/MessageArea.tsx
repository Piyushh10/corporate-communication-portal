
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  sender: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: Date;
  isEncrypted: boolean;
}

interface MessageAreaProps {
  messages: Message[];
}

const MessageArea: React.FC<MessageAreaProps> = ({ messages }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex gap-3 group">
          <Avatar className="h-8 w-8 mt-0.5 flex-shrink-0">
            <AvatarImage src={message.sender.avatarUrl} />
            <AvatarFallback>{getInitials(message.sender.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{message.sender.name}</span>
              <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
              {message.isEncrypted && (
                <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                  Encrypted
                </span>
              )}
            </div>
            <p className="text-sm mt-1">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageArea;
