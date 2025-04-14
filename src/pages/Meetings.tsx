
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Video, 
  Plus, 
  Calendar, 
  Users, 
  Mic, 
  MicOff, 
  VideoOff,
  Phone,
  MessageSquare,
  UserPlus,
  Share2,
  Monitor,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";

interface Meeting {
  id: number;
  title: string;
  time: string;
  participants: string[];
  status: 'scheduled' | 'live' | 'ended';
}

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      title: "Weekly Team Sync",
      time: "Today, 3:00 PM",
      participants: ["Piyush", "Nimisha", "Nandini"],
      status: 'scheduled',
    },
    {
      id: 2,
      title: "Project Planning",
      time: "Today, 5:00 PM",
      participants: ["Nimisha", "Pranav"],
      status: 'scheduled',
    },
    {
      id: 3,
      title: "Security Review",
      time: "Tomorrow, 10:00 AM",
      participants: ["Nandini", "Pranav", "Piyush"],
      status: 'scheduled',
    },
  ]);

  const [inCall, setInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<Meeting | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startMeeting = async (meetingId?: number) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      setStream(mediaStream);
      
      // This timeout ensures the video element is fully mounted before setting srcObject
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);

      if (meetingId) {
        const meeting = meetings.find(m => m.id === meetingId);
        if (meeting) {
          setCurrentMeeting({...meeting, status: 'live'});
          setMeetings(meetings.map(m => 
            m.id === meetingId ? {...m, status: 'live'} : m
          ));
        }
      } else {
        const newMeeting = {
          id: meetings.length + 1,
          title: "Instant Meeting",
          time: "Now",
          participants: ["You"],
          status: 'live' as const,
        };
        setCurrentMeeting(newMeeting);
        setMeetings([...meetings, newMeeting]);
      }
      setInCall(true);
      
      // Make sure initial states reflect actual stream settings
      setIsMuted(false);
      setIsVideoOff(false);
      
      console.log("Media stream acquired successfully", mediaStream.id);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      toast.error("Could not access camera or microphone. Please check permissions.");
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (currentMeeting) {
      setMeetings(meetings.map(m => 
        m.id === currentMeeting.id ? {...m, status: 'ended'} : m
      ));
    }
    setInCall(false);
    setCurrentMeeting(null);
    toast.success("Call ended");
  };

  const toggleMute = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMuted;
      });
    }
    setIsMuted(!isMuted);
    toast(`Microphone ${isMuted ? 'unmuted' : 'muted'}`);
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = isVideoOff;
      });
    }
    setIsVideoOff(!isVideoOff);
    toast(`Camera ${isVideoOff ? 'turned on' : 'turned off'}`);
  };

  const inviteParticipant = () => {
    toast.success("Invitation link copied to clipboard");
  };

  useEffect(() => {
    // Clean up function to stop all tracks when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Additional useEffect to handle video element setup when component mounts or inCall changes
  useEffect(() => {
    if (inCall && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [inCall, stream]);

  if (inCall) {
    return (
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="font-semibold">{currentMeeting?.title}</h2>
            <p className="text-sm text-muted-foreground">
              {currentMeeting?.participants.join(", ")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={inviteParticipant}>
              <UserPlus className="h-4 w-4 mr-1" /> Invite
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" /> Share screen
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-black/95 relative p-4 flex items-center justify-center">
          <div className="text-white text-center">
            {isVideoOff ? (
              <div className="w-96 h-64 bg-slate-800 rounded-lg flex items-center justify-center">
                <VideoOff size={48} />
              </div>
            ) : (
              <div className="relative">
                <div className="w-96 h-64 bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg flex items-center justify-center overflow-hidden">
                  <video 
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-md text-sm">
                  You
                </div>
              </div>
            )}
            <div className="mt-8 flex justify-center gap-4">
              <Button 
                variant={isMuted ? "destructive" : "secondary"} 
                size="icon" 
                className="rounded-full h-12 w-12"
                onClick={toggleMute}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                className="rounded-full h-12 w-12"
                onClick={endCall}
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Button 
                variant={isVideoOff ? "destructive" : "secondary"} 
                size="icon" 
                className="rounded-full h-12 w-12"
                onClick={toggleVideo}
              >
                {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full h-12 w-12"
              >
                <Monitor className="h-5 w-5" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full h-12 w-12"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 grid grid-cols-2 gap-2">
            {currentMeeting && currentMeeting.participants.slice(0, 3).map((participant, i) => (
              participant !== "You" && (
                <div key={i} className="w-32 h-24 bg-slate-800 rounded-lg flex items-center justify-center">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {participant[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Meetings</h1>
        <p className="text-muted-foreground mt-1">
          Schedule and join secure video conferences
        </p>
      </header>
      
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-64">
            <Input placeholder="Search meetings..." />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={() => startMeeting()}>
              <Video className="h-4 w-4 mr-2" /> Start Meeting
            </Button>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Schedule
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="recorded">Recorded</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {meetings.map((meeting) => (
                <Card key={meeting.id} className={meeting.status === 'ended' ? 'opacity-60' : ''}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{meeting.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 
                        <span>{meeting.time}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <Users className="h-3 w-3" /> 
                      <span>{meeting.participants.length} participants</span>
                    </div>
                    
                    <div className="flex -space-x-2">
                      {meeting.participants.slice(0, 3).map((participant, i) => (
                        <Avatar key={i} className="border-2 border-background">
                          <AvatarFallback className="bg-primary/10">
                            {participant.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {meeting.participants.length > 3 && (
                        <Avatar className="border-2 border-background">
                          <AvatarFallback className="bg-muted">
                            +{meeting.participants.length - 3}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      disabled={meeting.status === 'ended'}
                      onClick={() => startMeeting(meeting.id)}
                    >
                      {meeting.status === 'live' ? 'Join Now' : 
                       meeting.status === 'ended' ? 'Ended' : 'Join'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recorded">
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                No recorded meetings available
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Meetings;
