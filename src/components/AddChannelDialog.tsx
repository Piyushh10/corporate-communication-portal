
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface AddChannelDialogProps {
  onChannelCreated: (channel: { id: string, name: string }) => void;
}

const AddChannelDialog: React.FC<AddChannelDialogProps> = ({ onChannelCreated }) => {
  const [channelName, setChannelName] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  
  const users = [
    { id: 'piyush', name: 'Piyush' },
    { id: 'nimisha', name: 'Nimisha' },
    { id: 'nandini', name: 'Nandini' },
    { id: 'pranav', name: 'Pranav' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!channelName.trim()) {
      toast.error("Please enter a channel name");
      return;
    }
    
    const channelId = channelName.toLowerCase().replace(/\s+/g, '-');
    
    onChannelCreated({
      id: channelId,
      name: channelName
    });
    
    toast.success(`Channel "${channelName}" created successfully`);
    setChannelName('');
    setSelectedMembers([]);
    setOpen(false);
  };

  const toggleMember = (userId: string) => {
    setSelectedMembers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-5 w-5 p-0">+</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="channel-name">Channel name</Label>
              <Input
                id="channel-name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Enter channel name"
              />
            </div>
            <div className="grid gap-2">
              <Label>Add members</Label>
              <div className="border rounded-md p-2 max-h-[150px] overflow-y-auto">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center space-x-2 p-2">
                    <Checkbox 
                      id={`user-${user.id}`}
                      checked={selectedMembers.includes(user.id)}
                      onCheckedChange={() => toggleMember(user.id)}
                    />
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <Label htmlFor={`user-${user.id}`} className="text-sm cursor-pointer">{user.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create channel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddChannelDialog;
