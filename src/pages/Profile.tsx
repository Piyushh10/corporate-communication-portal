
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Mail, Building, MapPin, Phone, Calendar, FileText, 
  MessageSquare, ArrowRight, Shield, Award, Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : {
          name: "Piyush Sharma",
          email: "piyush@example.com",
          role: "Employee",
          department: "Engineering",
          location: "New York",
          phone: "+1 (555) 123-4567",
          joinDate: "Jan 2023",
          avatar: "",
        };
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const activityData = [
    { type: "message", content: "Posted in #general", time: "2 hours ago" },
    { type: "file", content: "Uploaded quarterly_report.pdf", time: "Yesterday" },
    { type: "calendar", content: "Added a team meeting", time: "2 days ago" },
    { type: "message", content: "Replied to Alice", time: "1 week ago" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "file":
        return <FileText className="h-4 w-4" />;
      case "calendar":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="container py-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : (
                  <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
                )}
              </Avatar>
              
              <div className="text-center">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.role}</p>
              </div>

              <Button asChild className="w-full">
                <Link to="/settings">
                  Edit Profile
                </Link>
              </Button>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.department}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {user.joinDate}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t">
              <h3 className="font-medium mb-3">Security Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">2FA Authentication</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                    Not Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Account Status</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" asChild className="w-full text-xs">
                  <Link to="/settings?tab=security">
                    <Shield className="mr-2 h-3 w-3" />
                    Manage Security
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity">
              <Card>
                <CardContent className="pt-6 px-6">
                  <div className="space-y-1">
                    {activityData.map((activity, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-md transition-colors"
                      >
                        <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.content}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          View
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files">
              <Card>
                <CardContent className="pt-6 px-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-md transition-colors">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">quarterly_report.pdf</p>
                        <p className="text-xs text-muted-foreground">2.4 MB • Uploaded yesterday</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-md transition-colors">
                      <FileText className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">project_roadmap.xlsx</p>
                        <p className="text-xs text-muted-foreground">1.8 MB • Uploaded 3 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-md transition-colors">
                      <FileText className="h-4 w-4 text-amber-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">team_metrics.pptx</p>
                        <p className="text-xs text-muted-foreground">4.2 MB • Uploaded 1 week ago</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      View All Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardContent className="pt-6 px-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-md transition-colors">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Alice Johnson</p>
                          <p className="text-xs text-muted-foreground">2h ago</p>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          Can you review the project timeline for me?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-md transition-colors">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>BS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Bob Smith</p>
                          <p className="text-xs text-muted-foreground">1d ago</p>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          Don't forget about our meeting tomorrow at 10am.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-md transition-colors">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>CD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Carol Davis</p>
                          <p className="text-xs text-muted-foreground">3d ago</p>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          I've shared the project files with you in #general.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      View All Messages
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
