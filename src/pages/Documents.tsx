
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  FileImage, 
  FileArchive, 
  Upload, 
  Download, 
  Share2, 
  Trash2, 
  Search, 
  Star, 
  FolderPlus, 
  Pencil 
} from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: number;
  name: string;
  type: 'doc' | 'image' | 'archive';
  size: string;
  lastModified: string;
  starred: boolean;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "Q2 Security Report.docx",
      type: 'doc',
      size: "2.4 MB",
      lastModified: "Today",
      starred: true,
    },
    {
      id: 2,
      name: "Network Diagram.png",
      type: 'image',
      size: "4.8 MB",
      lastModified: "Yesterday",
      starred: false,
    },
    {
      id: 3,
      name: "Project Assets.zip",
      type: 'archive',
      size: "15.2 MB",
      lastModified: "3 days ago",
      starred: false,
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpload = () => {
    toast.success("This is a demo. File upload would happen here in a real application.");
  };
  
  const handleDownload = (documentName: string) => {
    toast.success(`Downloading ${documentName}`);
  };
  
  const handleShare = (documentName: string) => {
    toast.success(`Sharing options for ${documentName}`);
  };
  
  const handleStarToggle = (id: number) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? {...doc, starred: !doc.starred} : doc
    ));
  };
  
  const handleDelete = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast.success("Document deleted");
  };

  const filteredDocuments = searchTerm 
    ? documents.filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : documents;
  
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'doc':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'image':
        return <FileImage className="h-5 w-5 text-green-500" />;
      case 'archive':
        return <FileArchive className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground mt-1">
          Securely share and collaborate on documents
        </p>
      </header>
      
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={handleUpload}>
              <Upload className="h-4 w-4 mr-2" /> Upload
            </Button>
            <Button variant="outline">
              <FolderPlus className="h-4 w-4 mr-2" /> New Folder
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>My Documents</CardTitle>
            <CardDescription>Recently modified files and folders</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredDocuments.length > 0 ? (
              <div className="border rounded-md">
                <div className="grid grid-cols-12 gap-2 p-3 border-b bg-muted/50 text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-2 text-right">Size</div>
                  <div className="col-span-2">Modified</div>
                  <div className="col-span-2">Actions</div>
                </div>
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="grid grid-cols-12 gap-2 p-3 border-b last:border-b-0 items-center hover:bg-muted/20">
                    <div className="col-span-6 flex items-center space-x-3">
                      {getFileIcon(doc.type)}
                      <span className="truncate">{doc.name}</span>
                    </div>
                    <div className="col-span-2 text-right text-sm text-muted-foreground">{doc.size}</div>
                    <div className="col-span-2 text-sm text-muted-foreground">{doc.lastModified}</div>
                    <div className="col-span-2 flex items-center space-x-1">
                      <Button size="icon" variant="ghost" onClick={() => handleStarToggle(doc.id)}>
                        <Star className={`h-4 w-4 ${doc.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDownload(doc.name)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleShare(doc.name)}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(doc.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No documents found
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Shared with me</CardTitle>
            <CardDescription>Documents shared by other team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              No shared documents yet
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documents;
