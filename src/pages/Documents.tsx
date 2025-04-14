import React, { useState, useRef } from 'react';
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
  Pencil,
  File,
  FileCode
} from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: number;
  name: string;
  type: 'doc' | 'image' | 'archive' | 'pdf' | 'code' | 'other';
  size: string;
  lastModified: string;
  starred: boolean;
  file?: File;
  url?: string;
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocuments: Document[] = [];

    Array.from(files).forEach((file) => {
      // Determine file type
      let type: 'doc' | 'image' | 'archive' | 'pdf' | 'code' | 'other' = 'other';
      
      if (file.name.match(/\.(doc|docx|txt|rtf)$/i)) type = 'doc';
      else if (file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) type = 'image';
      else if (file.name.match(/\.(zip|rar|tar|gz|7z)$/i)) type = 'archive';
      else if (file.name.match(/\.(pdf)$/i)) type = 'pdf';
      else if (file.name.match(/\.(js|ts|html|css|jsx|tsx|json|py|java|cpp)$/i)) type = 'code';

      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      
      const newDoc: Document = {
        id: Date.now() + Math.random(),
        name: file.name,
        type,
        size: `${sizeInMB} MB`,
        lastModified: "Just now",
        starred: false,
        file,
        url: URL.createObjectURL(file)
      };
      
      newDocuments.push(newDoc);
    });

    setDocuments([...newDocuments, ...documents]);
    toast.success(`${newDocuments.length} file(s) uploaded successfully`);
    
    // Reset the input field
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleDownload = (doc: Document) => {
    if (doc.url) {
      // For user-uploaded files, use the saved URL
      const a = document.createElement('a');
      a.href = doc.url;
      a.download = doc.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success(`Downloading ${doc.name}`);
    } else {
      // For demo files without actual URLs
      toast.info(`Demo file: ${doc.name} would be downloaded in a real application`);
    }
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
    const documentToDelete = documents.find(doc => doc.id === id);
    if (documentToDelete?.url) {
      URL.revokeObjectURL(documentToDelete.url); // Clean up the object URL
    }
    
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
      case 'pdf':
        return <File className="h-5 w-5 text-red-500" />;
      case 'code':
        return <FileCode className="h-5 w-5 text-purple-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleViewDocument = (doc: Document) => {
    if (doc.url) {
      window.open(doc.url, '_blank');
    } else {
      toast.info("This is a demo document without actual file content");
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
            {/* Hidden file input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
              multiple 
            />
            <Button onClick={handleFileSelect}>
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
                    <div 
                      className="col-span-6 flex items-center space-x-3 cursor-pointer"
                      onClick={() => handleViewDocument(doc)}
                    >
                      {getFileIcon(doc.type)}
                      <span className="truncate">{doc.name}</span>
                    </div>
                    <div className="col-span-2 text-right text-sm text-muted-foreground">{doc.size}</div>
                    <div className="col-span-2 text-sm text-muted-foreground">{doc.lastModified}</div>
                    <div className="col-span-2 flex items-center space-x-1">
                      <Button size="icon" variant="ghost" onClick={() => handleStarToggle(doc.id)}>
                        <Star className={`h-4 w-4 ${doc.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDownload(doc)}>
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
