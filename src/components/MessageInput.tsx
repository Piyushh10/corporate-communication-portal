
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Smile, Lock, Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage,
  placeholder = "Type a message..."
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-3">
      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="min-h-[80px] resize-none pr-20"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="absolute bottom-2 right-2 flex gap-1">
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-full text-muted-foreground"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-full text-muted-foreground"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost" 
            className="h-10 w-10 rounded-full bg-primary/10 text-primary"
          >
            <Lock className="h-4 w-4" />
          </Button>
          <Button type="submit" className="rounded-full">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
