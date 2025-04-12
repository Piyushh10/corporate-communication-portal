
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, FileImage, File } from "lucide-react";

interface MessageFile {
  name: string;
  size: string;
  type: string;
}

interface Message {
  id: string;
  sender: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: Date;
  isEncrypted: boolean;
  files?: MessageFile[];
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

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <FileImage className="h-4 w-4 text-blue-500" />;
      case 'text':
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return <File className="h-4 w-4 text-amber-500" />;
    }
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
            
            {message.files && message.files.length > 0 && (
              <div className="mt-2 space-y-1">
                {message.files.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 bg-muted/30 hover:bg-muted/50 rounded-md p-2 text-sm cursor-pointer"
                  >
                    {getFileIcon(file.type)}
                    <div className="truncate">
                      <div className="font-medium truncate">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{file.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageArea;
