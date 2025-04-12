
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Pencil, 
  Square, 
  Circle, 
  Type, 
  Image as ImageIcon, 
  Trash2, 
  Undo2, 
  Redo2, 
  Save, 
  Download, 
  Share2
} from "lucide-react";
import { toast } from "sonner";

interface DrawingPoint {
  x: number;
  y: number;
  color: string;
  size: number;
  isDragging: boolean;
}

const tools = ['pencil', 'eraser', 'rectangle', 'circle', 'text'] as const;
type Tool = typeof tools[number];

const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTool, setCurrentTool] = useState<Tool>('pencil');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [title, setTitle] = useState('Untitled Whiteboard');
  const [lastPoint, setLastPoint] = useState<DrawingPoint | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        // Set canvas size to match parent container
        const resizeCanvas = () => {
          const parent = canvas.parentElement;
          if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            // Fill with white background
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
          }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        return () => {
          window.removeEventListener('resize', resizeCanvas);
        };
      }
    }
  }, []);
  
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>): {x: number, y: number} => {
    const canvas = canvasRef.current;
    if (!canvas) return {x: 0, y: 0};
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(e);
    setIsDrawing(true);
    setLastPoint({
      x,
      y,
      color: currentTool === 'eraser' ? '#FFFFFF' : currentColor,
      size: currentTool === 'eraser' ? brushSize * 2 : brushSize,
      isDragging: false
    });
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context || !canvas || !lastPoint) return;
    
    const { x, y } = getCoordinates(e);
    
    context.beginPath();
    context.moveTo(lastPoint.x, lastPoint.y);
    
    if (currentTool === 'pencil' || currentTool === 'eraser') {
      context.lineTo(x, y);
      context.strokeStyle = currentTool === 'eraser' ? '#FFFFFF' : currentColor;
      context.lineWidth = currentTool === 'eraser' ? brushSize * 2 : brushSize;
      context.lineCap = 'round';
      context.stroke();
    } else if (currentTool === 'rectangle') {
      // For preview, draw on a temporary canvas or handle in a different way
      // This is simplified
      const width = x - lastPoint.x;
      const height = y - lastPoint.y;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = currentColor;
      context.lineWidth = brushSize;
      context.strokeRect(lastPoint.x, lastPoint.y, width, height);
    } else if (currentTool === 'circle') {
      // Simplified circle preview
      const radius = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2));
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.arc(lastPoint.x, lastPoint.y, radius, 0, 2 * Math.PI);
      context.strokeStyle = currentColor;
      context.lineWidth = brushSize;
      context.stroke();
    }
    
    setLastPoint({
      x,
      y,
      color: currentTool === 'eraser' ? '#FFFFFF' : currentColor,
      size: currentTool === 'eraser' ? brushSize * 2 : brushSize,
      isDragging: true
    });
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context && canvas) {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    toast.success("Whiteboard cleared");
  };
  
  const saveWhiteboard = () => {
    // In a real app, this would save to a database
    toast.success("Whiteboard saved");
  };
  
  const downloadWhiteboard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    toast.success("Whiteboard downloaded");
  };
  
  const shareWhiteboard = () => {
    toast.success("Share link copied to clipboard");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto h-full flex flex-col">
      <header className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Whiteboard</h1>
          <p className="text-muted-foreground mt-1">
            Collaborative drawing and brainstorming
          </p>
        </div>
        <Input 
          className="max-w-xs"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
      </header>
      
      <div className="flex flex-1 flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>Canvas</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={saveWhiteboard}>
                <Save className="h-4 w-4 mr-1" /> Save
              </Button>
              <Button variant="outline" size="sm" onClick={downloadWhiteboard}>
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
              <Button variant="outline" size="sm" onClick={shareWhiteboard}>
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0 relative">
            <div className="bg-muted/50 p-2 flex justify-between">
              <div className="flex gap-2">
                <Button 
                  variant={currentTool === 'pencil' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setCurrentTool('pencil')}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant={currentTool === 'eraser' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setCurrentTool('eraser')}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={currentTool === 'rectangle' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setCurrentTool('rectangle')}
                >
                  <Square className="h-4 w-4" />
                </Button>
                <Button 
                  variant={currentTool === 'circle' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setCurrentTool('circle')}
                >
                  <Circle className="h-4 w-4" />
                </Button>
                <Button 
                  variant={currentTool === 'text' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setCurrentTool('text')}
                >
                  <Type className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2 items-center">
                <div className="flex border rounded-md overflow-hidden">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 ${currentColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setCurrentColor(color)}
                    />
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">Size:</span>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearCanvas}
                >
                  Clear
                </Button>
              </div>
            </div>
            
            <div className="flex-1 bg-white border-t overflow-auto">
              <canvas 
                ref={canvasRef}
                className="w-full h-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Whiteboard;
